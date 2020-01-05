const path = require('path');
const {runMigration} = require('contentful-migration/built/bin/cli');

const options = {
  accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  yes: true,
};

const getMigrationOptions = (fileName, options) => ({
  ...options,
  filePath: path.join(__dirname, 'items', fileName),
});

const migrations = async () => {
  try {
    // await runMigration(getMigrationOptions('path-to-file.js', options));
  } catch (err) {
    console.error(err);
  }
};

migrations();
