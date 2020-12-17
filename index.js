const inquirer = require('inquirer');
const fs = require('fs');

let createReadmeTemplate = (product, blurb, description, screenshotPath, linuxInstall, windowInstall, useCase, github, githubFork) => {
    return `# ${product}
    > ${blurb}
        
    ${description}
    
    ## Table of Contents
    *[Installation](#Installlation)
    *[Usage-Example](#Usage-Example)
    *[Meta](#Meta)
    *[Contribution](#Contributing)
        
    ![](${screenshotPath})
        
    ## Installation
        
    Linux:
    >${linuxInstall}
        
    Windows:
    >${windowInstall}
        
    ## Usage-Example
        
    ${useCase}
        
    ## Meta
        
    Your Name – YourEmail@example.com
        
    [${github}]
        
    ## Contributing
        
    1.Fork it (<${githubFork}>)
    2.Create your feature branch (git checkout -b feature/fooBar)
    3.Commit your changes (git commit -am 'Add some fooBar')
    4.Push to the branch (git push origin feature/fooBar)
    5.Create a new Pull Request
    `
}

// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'product',
        message: "What's your product name?",
    },
    {
        type: 'input',
        name: 'blurb',
        message: "Insert a short blurb about what your product does:",
    },
    {
        type: 'input',
        name: 'description',
        message: "Insert a one to two paragraph statement about your product and what it does:",
    },
    {
        type: 'input',
        name: 'screenshotPath',
        message: "Insert a relative path for a screen shot of your product:",
    },
    {
        type: 'input',
        name: 'linuxInstall',
        message: "How do linux users install your product?",
    },
    {
        type: 'input',
        name: 'windowInstall',
        message: "How do windows users install your product?",
    },
    {
        type: 'input',
        name: 'useCase',
        message: "What are some examples of your product in use?",
    },
    {
        type: 'input',
        name: 'github',
        message: "Insert your github profile link:",
    },
    {
        type: 'input',
        name: 'githubFork',
        message: "Insert your products github repository link:",
    }
];

// function to write README file
function writeToFile(data) {
    fs.writeFile('README.md', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

// function to initialize program
function init() {
    inquirer.prompt(questions).then(answers => {
        const {product, blurb, description, screenshotPath, linuxInstall, windowInstall, useCase, github, githubFork} = answers;
        const template = createReadmeTemplate(product, blurb, description, screenshotPath, linuxInstall, windowInstall, useCase, github, githubFork);

        writeToFile(template);
    }).catch(error => {
        if(error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else when wrong
        }
    });

}

// function call to initialize program
init();
