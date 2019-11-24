const path = require('path');
const {runMigration} = require('contentful-migration/built/bin/cli');

const options = {
  accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  yes: true,
};

if (!process.argv[2]) {
  console.error('A migration file must be provided as command line argument\n');

  process.exit(1);
}

const runOneMigration = async () => {
  try {
    const filePath = path.resolve(process.argv[2]);

    await runMigration({...options, filePath});
  } catch (err) {
    console.error(err);
  }
};

runOneMigration();
