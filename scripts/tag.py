"""
Automatic tagging script for Wazuh Splunk app.

Fill the variables below with the desired values and run the script.

WARNING: This script will commit and push the tags to the remote repository,
deleting any unpushed changes.
"""
import json
import logging
import os

# ================================================ #
# Fill the variables below with the desired values #
# ================================================ #

# Splunk versions
supported_versions = ['8.1', '8.2']
# Wazuh version
version = '4.5.2'
# RC number(optional, set to 0 or None to disable)
rc_number = 1
# App's revision number (previous rev + 1)
revision = '4503'
# Debug mode
dry_run = False

# ================================================ #
# Constants and global variables                   #
# ================================================ #
BRANCH = version
LOG_FILE = 'output.log'
TAGS_FILE = 'tags.log'

# ================================================ #
# Functions                                        #
# ================================================ #

def require_confirmation():
    """Ask for confirmation before running the script."""
    print('WARNING! This script will commit and push the tags to the remote '
        + 'repository, deleting any unpushed changes.')
    confirmation = input('Do you want to continue? [y/N] ')

    if confirmation.lower() != 'y':
        logging.info('Aborting...')
        exit(0)


def update_package_json(splunk_version: str) -> tuple:
    """Update package.json with the new version and revision."""
    logging.info(f'Updating package.json with Splunk v{splunk_version}')
    data, success = {}, True

    # Read JSON and update keys.
    with open('package.json', 'r') as f:
        data, success = json.load(f), False

        # Update version, revision and splunk
        data['version'] = version
        data['revision'] = revision
        data['splunk'] = splunk_version

    with open('package.json', 'w') as f:
        json.dump(data, f, indent=2)

    return data, success


def setup():
    """Sync the repo."""
    logging.info(f'Switching to branch {BRANCH} and removing outdated tags...')
    os.system(f'git checkout {BRANCH}')
    os.system('git fetch --prune --prune-tags')


def main():
    """Main function."""
    logging.info(f'Wazuh version is {version}. App revision is {revision}')
    with open(TAGS_FILE, 'w') as f:
        for splunk in supported_versions:
            if rc_number:
                tag = f'v{version}-{splunk}-rc{rc_number}'
            else:
                tag = f"v{version}-{splunk}"

            logging.info(f'Generating tag {tag}')
            update_package_json(splunk)
            os.system('make prebuild')
            os.system(f'git commit -am "Bump {tag}"')
            os.system(f'git tag -a {tag} -m "Wazuh {version} for Splunk {splunk}"')
            if not dry_run:
                logging.info(f'Pushing tag {tag} to remote.')
                os.system(f'git push origin {tag}')

                # Undo latest commit
                os.system(f'git reset --hard HEAD~1')
                # os.system(f'git reset --hard origin/{BRANCH}')

            # Write tag to file (used later by the CI)
            f.write(f'{tag}\n')

# ================================================ #
# Main program                                     #
# ================================================ #

if __name__ == '__main__':
    logging.basicConfig(
        filename=LOG_FILE,
        level=logging.INFO,
        format='%(asctime)s %(message)s'
    )
    require_confirmation()
    setup()
    main()

    print(f'\nCOMPLETED. \nCheck {LOG_FILE} for more details.')
    print(f'Tags are stored in {TAGS_FILE}')
