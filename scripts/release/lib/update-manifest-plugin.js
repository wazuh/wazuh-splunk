const logger = require('./logger');
const { execSync } = require('child_process');

function updatePluginManifest() {
  function execSystem(command) {
    logger.info(`Run command: ${command}`);
    execSync(command);
  }
  execSystem('node scripts/generate-build-version');
}

module.exports = {
  updatePluginManifest: updatePluginManifest,
};
