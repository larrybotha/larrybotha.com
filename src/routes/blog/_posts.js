import {getArticles} from 'src/helpers/get-parsed-articles';

const getPosts = async () => await getArticles('src/routes/blog');

export {getPosts};
