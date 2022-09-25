const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
      fs.writeFile('./dist/index.html', fileContent, err => {
        // error occurs -> reject  Promise and send  error to  Promise's .catch() method
        if (err) {
          reject(err);
          // exit function to ensure Promise doesn't also execute the resolve() function 
          return;
        }
  
        // no errors -> resolve Promise and send successful data to `.then()`.
        resolve({
          ok: true,
          message: 'File created:)'
        });
      });
    });
  };

  const copyFile = fileContent => {
    return new Promise((resolve, reject) => {
      fs.copyFile('./src/style.css', './dist/style.css', err => {
        // error occurs -> reject Promise and send error(s) to Promise's `.catch()` method
        if (err) {
          reject(err);
          // exit function to ensure Promise does not also execute resolve() function 
          return;
        }
  
        // no errors -> resolve Promise and send successful data to `.then()` method
        resolve({
          ok: true,
          message: 'File copied:)'
        });
      });
    });
  };

  module.exports = { writeFile, copyFile }