const fs = require('node:fs');
const path = require('node:path');

const getCommandFiles = (commandsPath) => {
  return (
    fs
      .readdirSync(commandsPath, { withFileTypes: true })
      .reduce((files, file) => {
        if (file.isDirectory()) {
          return files.concat(
            fs
              .readdirSync(path.join(commandsPath, file.name), {
                withFileTypes: true
              })
              .map((f) => path.join(file.name, f.name))
          );
        } else {
          return files.concat(file.name);
        }
      }, [])
      // Filter out any non-JS files
      .filter((file) => file.endsWith('.js'))
  );
};

module.exports = { getCommandFiles };
