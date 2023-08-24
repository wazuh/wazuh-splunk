###############################################################################
#
# Wazuh App for Splunk
# ---------------------------------------------
# 
# Portions Copyright (C) 2015-2022, Wazuh Inc.
# Based on work Copyright (C) 2003 - 2013 Trend Micro, Inc.
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License (version 2) as
# published by the FSF - Free Software Foundation.
# ---------------------------------------------
#
##############################################################################

# Bold font and white color for the console.
Color_Off='\033[0m
BWhite=\033[1;37m

#--------------------------------------------------------------------#
# SOURCES AND PATHS
#--------------------------------------------------------------------#
APP_DIR = SplunkAppForWazuh
PACKAGE_NAME = SplunkAppForWazuh.tar.gz
APP_INSPECT_FLAGS = --mode precert \
	--included-tags cloud          \
	--log-file app_inspect.log     \
	--data-format junitxml         \
	--output-file results.xml

# Run the splunk-appinspect tool with the default tests for Splunk Cloud.
inspect: build
	splunk-appinspect inspect $(PACKAGE_NAME) $(APP_INSPECT_FLAGS)

# Build App's package locally.
build: clean prebuild
	@echo "$(BWhite)- Building local package $(PACKAGE_NAME) ...$(Color_Off)"
	@tar -czf $(PACKAGE_NAME) $(APP_DIR)

# Clean compiled Python files and cache folders. Run with SUDO.
clean:
	@echo "$(BWhite)- Removing compiled & cached Python files ...$(Color_Off)"
	@find . -type f -name '*.py[co]' -delete -o -type d -name __pycache__ -delete

# Run the prebuild script.
# Update the Wazuh version, the Splunk version and the App's revision number 
# in the package.json before running this script.
prebuild:
	@echo "$(BWhite)- Updating project's versions ...$(Color_Off)"
	@node scripts/generate-build-version

# Update the API info. The Wazuh API must be running and reachable locally.
api-info:
	@echo "$(BWhite)- Updating the WAZUH API endpoints local registry ...$(Color_Off)"
	@WAZUH_API_URL=https://0.0.0.0:55000 npm run generate:api-info

# Run ESLint
lint: clean
	@echo "$(BWhite)- Running ESLint ...$(Color_Off)"
	@npx eslint . --ext .js -c .eslintrc.json

# Run Prettier
pretty: clean
	@echo "$(BWhite)- Running Prettier ...$(Color_Off)"
	@npx prettier --config .prettierrc --write \
	SplunkAppForWazuh/**/*.js \
	SplunkAppForWazuh/**/*.html \
	SplunkAppForWazuh/**/*.css \
	!SplunkAppForWazuh/appserver/static/js/libs/** \
	!SplunkAppForWazuh/appserver/static/js/utils/codemirror/**