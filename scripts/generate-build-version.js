const fs = require('fs');
const packageJson = require('../package.json');
const { version, revision } = packageJson;

const jsonData = {
  version,
  revision,
};

const jsonContent = JSON.stringify(jsonData, null, 2);


fs.readFile('./SplunkAppForWazuh/appserver/static/js/services/app-version/appVersionService.js', 'utf8', function(err,data){
  if(err){
    console.log('An error occurred while read file');
    return console.log(err);
  }

  // file content
  let appVersionServiceFile = data;
  // new metadata version and revision
  let newMetadata = 'const metadataApp = ' + jsonContent + '\n\n';
  // get content without const version and revision
  let definePos = data.indexOf('define(');
  let fileWithOutMeta = appVersionServiceFile.substring(definePos, appVersionServiceFile.length);
  // added new version and revision in file content
  let updateFileContent = newMetadata + fileWithOutMeta;

  // write meta json with last version
  fs.writeFile('./SplunkAppForWazuh/appserver/static/js/services/app-version/appVersionService.js', updateFileContent, 'utf8', function (err) {
    if (err) {
      console.log('An error occurred while writing data in file');
      return console.log(err);
    }

    console.log('app meta has been saved with latest version number');
  });
  
});


//replaces package.conf with last
fs.readFile('./SplunkAppForWazuh/default/package.conf', 'utf-8', function (err, data) {
  if (err) {
    console.log(err);
    return;
  }

  var confLines = data.split('\n');
  let currentSection = '';

  // replace version and revision inside [app] delimitation
  confLines.forEach( (item,index) => {
    
    if(item.match(/\[[^\]]*]/g)){
      currentSection = item;
    }else{
      if(currentSection === '[app]'){
        if(item.includes('version')) confLines[index] = 'version = ' + jsonData.version;
        if(item.includes('revision')) confLines[index] = 'revision = ' + jsonData.revision;
      }
    }

  });

  let packageConf = confLines.join("\n");
  
  // write in package.conf
  fs.writeFile('./SplunkAppForWazuh/default/package.conf', packageConf, 'utf8', function (err) {
    if (err) {
      console.log('An error occurred while writing JSON Object to package.conf');
      return console.log(err);
    }

    console.log('package.conf file has been saved with latest version number');
  });
});
