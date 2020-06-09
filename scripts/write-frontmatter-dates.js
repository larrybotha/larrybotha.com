const {execSync} = require('child_process');
const {writeFile} = require('fs').promises;
const unified = require('unified');
const vfile = require('to-vfile');
const parse = require('remark-parse');
const stringify = require('remark-stringify');
const frontmatter = require('remark-frontmatter');
const find = require('unist-util-find');

const PUBLISH_BRANCH = 'noindex';

const files = process.argv.slice(2);
const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', {
  encoding: 'utf-8',
});
const date = new Date();

function addDatePublished() {
  return (ast, vfile) => {
    const yamlNode = find(ast, {type: 'yaml'});

    if (yamlNode) {
      const {value} = yamlNode;
      const field = 'datePublished';
      const hasPublishDate = value.indexOf(field) > -1;

      if (!hasPublishDate) {
        console.log(`setting datePublished: ${vfile.history[0]}`);

        yamlNode.value = value.concat(`\n${field}: ${date}`);
      }
    }
  };
}

function addDateUpdated() {
  return (ast, vfile) => {
    const yamlNode = find(ast, {type: 'yaml'});

    if (yamlNode) {
      const {value} = yamlNode;
      const field = 'dateUpdated';

      console.log(`setting dateUpdated: ${vfile.history[0]}`);

      yamlNode.value = value
        .split('\n')
        .filter(v => !v.startsWith(field))
        .concat(`${field}: ${date}`)
        .join('\n');
    }
  };
}

(async function() {
  if (
    files.length
    //&& currentBranch === PUBLISH_BRANCH
  ) {
    console.log('******************************************************');
    console.log('evaluating files to inject dates into\n');

    await Promise.all(
      files.map(file => {
        unified()
          .use(parse)
          .use(stringify)
          .use(frontmatter)
          .use(addDatePublished)
          .use(addDateUpdated)
          .process(vfile.readSync(file), async (err, resultFile) => {
            if (err) {
              return console.error(err);
            }

            await writeFile(file, resultFile.contents);
          });
      }),
    );
    console.log('******************************************************');
  }
})();
