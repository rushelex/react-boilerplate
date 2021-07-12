const DEFAULT_CONFIG_PATH = './config.default.json';

let configPath = DEFAULT_CONFIG_PATH;
const customPath = process.env.ENV_CONFIG_PATH;

if (customPath) {
  console.log(`** Using custom configuration located at "${customPath}" ** `);
  configPath = customPath;
}

// eslint-disable-next-line import/no-dynamic-require
module.exports = require(configPath);
