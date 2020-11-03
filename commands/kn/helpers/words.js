const fs = require('fs');
const { callbackify } = require('util');

const words = {
  defaultWords: (callback) => {
    const wordsFile = './kodenames_words';

    fs.readFile(wordsFile, 'utf8', function (error, data) {
      if (error) {
        throw error;
      }

      const words = data.split(/\r?\n/);

      callback(words);
    });
  },
};

module.exports = words;
