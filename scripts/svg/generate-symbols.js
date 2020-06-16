const fs = require('fs');
const {readdir, readFile, writeFile, mkdir} = require('fs').promises;
const {promisify} = require('util');
const path = require('path');
const SvgSpriter = require('svg-sprite');

const asyncReaddir = promisify(fs.readdir);
const asyncReadFile = promisify(fs.readFile);
const asyncWriteFile = promisify(fs.writeFile);
const asyncMkdir = promisify(fs.mkdir);

const log = (...args) => console.log(...args);

const generateSprite = async function generateSprite(iconsDir) {
  const spriter = new SvgSpriter({
    dest: path.resolve(__dirname, '../../static/build'),
    shape: {id: {generator: 'icon-%s'}},
    mode: {
      inline: true,
      symbol: {
        dest: path.resolve(__dirname, '../../static/build/svg-sprites'),
        sprite: 'icons.symbol.svg',
      },
    },
  });
  const svgIconsDir = path.resolve(__dirname, iconsDir);
  const iconFilenames = await readdir(svgIconsDir);

  await Promise.all(
    iconFilenames.map(async filename => {
      const svgPath = path.resolve(svgIconsDir, filename);
      const contents = await readFile(svgPath, {encoding: 'utf-8'});

      spriter.add(svgPath, null, contents);
    }),
  );

  return new Promise((resolve, reject) => {
    let results = [];

    spriter.compile(async (err, result) => {
      if (err) {
        console.error(err);
      }

      const modes = Object.keys(result);

      try {
        await Promise.all(
          modes.map(async mode => {
            const resources = Object.keys(result[mode]);

            await Promise.all(
              resources.map(async resource => {
                const {path: filepath, contents} = result[mode][resource];
                const dir = path.dirname(filepath);

                await mkdir(dir, {recursive: true});
                await writeFile(filepath, contents);

                results = results.concat(filepath);
              }),
            );
          }),
        );

        resolve(results);
      } catch (err) {
        reject(err);
      }
    });
  });
};

(async function() {
  try {
    const results = await Promise.all(
      ['../../src/img/svg-sprites/icons'].map(generateSprite),
    );

    log(`Generated the following sprites:`);
    log(JSON.stringify(...results, null, 2));
  } catch (err) {
    console.error('Failed to generate sprite:', err);
  }
})();
