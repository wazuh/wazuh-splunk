const fs = require('fs')
const packageJson = require('../package.json')
const { version, revision, splunk } = packageJson

// ------------------------------------------------------------------------- //
//  Removes any indentation.
//  src: https://stackoverflow.com/questions/25924057/multiline-strings-that-dont-break-indentation
// ------------------------------------------------------------------------- //
function dedent(aString) {
  return aString.replace(/  +/g, '')
}

// ------------------------------------------------------------------------- //
//  Writes the given data to the specified file.
//  Overwrites file if it exists.
// ------------------------------------------------------------------------- //
function writeFile(file, data, applyDedent = false, encoding = 'utf8') {
  if (applyDedent) {
    data = dedent(data);
  }

  fs.writeFile(file, data, encoding, function (err) {
    if (err) {
      console.log(`An error occurred while writing JSON Object to ${file}`)
      return console.log(err)
    }

    console.log(`${file} file has been saved with latest version number`)
  })
}

// ------------------------------------------------------------------------- //
//  Update appVersionService.js with latest Wazuh version and revision number.
// ------------------------------------------------------------------------- //
function updateAppVersionServiceFile() {
  const FILE = './SplunkAppForWazuh/appserver/static/js/services/app-version/appVersionService.js'
  const JSON_CONTENT = JSON.stringify({version, revision}, null, 2)

  // Read the file and strip the metadata out.
  fs.readFile(FILE, 'utf8', function(error, data) {
    // Abort on error.
    if (error) {
      console.log('An error occurred while read file')
      return console.log(error)
    }

    // Generate the new metadataApp object.
    let metadata = 'const metadataApp = ' + JSON_CONTENT + '\n\n'
    // Get the merging point position.
    let definePos = data.indexOf('define(')
    // Get the remaining file content.
    let fileWithoutMeta = data.substring(
      definePos,
      data.length
    )
    // Merge both file contents together.
    let updatedFileContent = metadata + fileWithoutMeta

    // Update file. Writes to disk.
    writeFile(FILE, updatedFileContent)
  })
}

// ------------------------------------------------------------------------- //
//  Update package.conf with latest supported Splunk minor version.
// ------------------------------------------------------------------------- //
function updatePackageConfFile() {
  const FILE = './SplunkAppForWazuh/default/package.conf'

  let template = `\
    [splunk]
    version = ${splunk}
  `

  // Update file. Writes to disk.
  writeFile(FILE, template, true)
}

// ------------------------------------------------------------------------- //
//  Update app.conf with latest Wazuh version and App's revision number.
// ------------------------------------------------------------------------- //
function updateAppConfFile() {
  const FILE = './SplunkAppForWazuh/default/app.conf'

  let template = `\
    [ui]
    is_visible = 1
    label = Wazuh

    [launcher]
    version = ${version}
    author = info@wazuh.com
    description = Wazuh helps you to gain deeper security visibility into your infrastructure by monitoring hosts at an operating system and application level.

    [package]
    id = SplunkAppForWazuh
    check_for_updates = 1

    [install]
    build = ${revision}

    [triggers]
    reload.package = simple
    reload.config = simple
  `

  // Update file. Writes to disk.
  writeFile(FILE, template, true)
}

// ------------------------------------------------------------------------- //
//  Main
// ------------------------------------------------------------------------- //
updatePackageConfFile()
updateAppConfFile()
updateAppVersionServiceFile()
