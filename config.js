const fs = require('fs');
const fileName = '../../package.json';

if (!fs.existsSync(fileName)) 
  fs.writeFileSync(fileName, '{}');

const config = require(fileName);
config.scripts = config.scripts || {};
config.scripts.generateREADME = "npm explore basic-readme-generator -- npm start";

fs.writeFileSync(fileName, JSON.stringify(config, null, 2));