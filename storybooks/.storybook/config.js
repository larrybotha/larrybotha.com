import {configure} from '@storybook/react';

import {setDefaults as infoDefaults} from '@storybook/addon-info';

infoDefaults({header: false});

const req = require.context('../stories', true, /\.js$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
