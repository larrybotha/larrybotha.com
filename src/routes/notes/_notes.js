import {getArticles} from 'src/helpers/get-parsed-articles';

const getNotes = async () => await getArticles('src/routes/notes');

export {getNotes};
