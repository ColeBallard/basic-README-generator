const PROMPTS = require('./prompts.json');

function createFile(data) {
  let markdownSections = {
    title: `# ${data.title}`
  };

  markdownSections.tableOfContents = 
`- [Description](#description)
`;

  if (data.screenshot != 'none')
    markdownSections.screenshot = 
`
---

![project screenshot](${data.screenshot})

---
`;

  if (data.installation != 'none') {
    markdownSections.installation = 
`## Installation
${data.installation}`;
    markdownSections.tableOfContents += 
`- [Installation](#installation)
`;
  }
    

  if (data.usage != 'none') {
    markdownSections.usage = 
`## Usage
${data.usage}`;
    markdownSections.tableOfContents += 
`- [Usage](#usage)
`;
  }
    

  if (data.contribution != 'none') {
    markdownSections.contribution = 
`## Contribution Guidelines
${data.contribution}`;
    markdownSections.tableOfContents += 
`- [Contribution Guidelines](#contribution-guidelines)
`;
  }
    

  if (data.test != 'none') {
    markdownSections.test = 
`## Testing
${data.test}`;
    markdownSections.tableOfContents += 
`- [Testing](#testing)
`;
  }

  markdownSections.contact = 
`## Contact
- [${data.username}](https://github.com/${data.username})
- [${data.email}](mailto:${data.email})`;
  markdownSections.tableOfContents += 
  `- [Contact](#contact)`;
    

  if (data.license != 'none') {
    switch (data.license) {
      case 'MIT':
        markdownSections.license = 
        `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
        break;
      case 'GNU GPL v3.0':
        markdownSections.license = 
        `[![License: FDL 1.3](https://img.shields.io/badge/License-FDL%20v1.3-blue.svg)](https://www.gnu.org/licenses/fdl-1.3)`;
        break;
      case 'Apache Lic. v3.0':
        markdownSections.license = 
        `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
        break;
      case 'Mozilla Public Lic. v2.0':
        markdownSections.license = 
        `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`;
        break;
      default:
        console.log('license string/badge error');
        break;
    }
  }

  const MARKDOWN = 
`${markdownSections.license ? markdownSections.license : ''}
# ${data.title} 
## Table of Contents
${markdownSections.tableOfContents} 
## Description
${data.description}
${markdownSections.screenshot ? markdownSections.screenshot : ''}
${markdownSections.installation ? markdownSections.installation : ''}
${markdownSections.contribution ? markdownSections.contribution : ''}
${markdownSections.test ? markdownSections.test : ''}
${markdownSections.contact ? markdownSections.contact : ''}`;

  let fs = require('fs');

  if (!fs.existsSync('../../generated-README')){
      fs.mkdirSync('../../generated-README');
  }

  fs.writeFile('../../generated-README/README.md', MARKDOWN, function (err) {
    if (err) throw err;
    console.log('README created in generated-README folder.');
  });
}

(function init() {
  let inquirer = require('inquirer');
  inquirer
  .prompt(PROMPTS)
  .then(answers => {
    createFile(answers);
  })
  .catch(error => {
    if(error.isTtyError) {
      console.log('Prompt couldn\'t be rendered in the current environment');
    } else {
      console.log('Something else went wrong');
    }
  });
})();
