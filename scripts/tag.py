
import json
import logging
import os

# Splunk versions
supported_versions = ['8.1', '8.2']
# Wazuh version
version = '4.4.0'
# App's revision number (previous rev + 1)
revision = '4400'
# Base branch
branch = ".".join(version.split('.')[:2])


def update_package_json(splunk_version: str) -> tuple:
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
    logging.info(f'Switching to branch {branch} and removing outdated tags...')
    os.system(f'git checkout {branch}')
    os.system('git fetch --prune --prune-tags')


def main():
    logging.info(f'Wazuh version is {version}. App revision is {revision}')
    for splunk in supported_versions:
        tag = f"v{version}-{splunk}"
        logging.info(f'Generating tag {tag}')
        update_package_json(splunk)
        os.system('make prebuild')
        os.system(f'git commit -am "Bump {tag}"')
        os.system(f'git tag -a {tag} -m "Wazuh {version} for Splunk {splunk}"')
        logging.info(f'Pushing tag {tag} to remote.')
        os.system(f'git push origin {tag}')
        # Undo latest commit
        os.system(f'git reset --hard origin/{branch}')


if __name__ == '__main__':
    logging.basicConfig(
        filename='output.log',
        level=logging.INFO,
        format='%(asctime)s %(message)s'
    )
    setup()
    main()
