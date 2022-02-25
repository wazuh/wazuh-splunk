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

#--------------------------------------------------------------------#
# SOURCES AND PATHS
#--------------------------------------------------------------------#
APP_DIR = ./SplunkAppForWazuh
PACKAGE_NAME = SplunkAppForWazuh.tar.gz

inspect: build
	splunk-appinspect inspect $(PACKAGE_NAME) --mode precert --included-tags \
	cloud	--output-file jquery-audit.xml --data-format junitxml > app_inspect.log

build: clean prebuild
	tar -czf $(PACKAGE_NAME) $(APP_DIR)

clean:
	find . -type f -name '*.py[co]' -delete -o -type d -name __pycache__ -delete

prebuild:
	node scripts/generate-build-version

