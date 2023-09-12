const fs = require(`fs`);

exports.deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      throw err;
    }
  });
};


exports.updateFile = (filePath, newFilePath) => {
  fs.writeFile(filePath, newFilePath, (err) => {
    if (err) {
      throw err;
    }
  });
};
