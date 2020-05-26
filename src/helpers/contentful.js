import {globals} from '../globals';

const findInIncludes = (includes, id) => {
  return includes.find(include => include.sys.id === id);
};

const filterInIncludes = (includes, id) => {
  return includes.filter(include => include.sys.id === id);
};

const getIncludesByTypeId = (includes, id) => {
  return includes.filter(include => include.sys.contentType.sys.id === id);
};

const getContentfulEntriesUrl = (queryParams = {}) => {
  const {spaceId, accessToken} = globals.contentful;
  const query = {
    access_token: accessToken,
    ...queryParams,
  };
  const queryString = Object.keys(query)
    .map(k => `${k}=${query[k]}`)
    .join('&');

  return `https://cdn.contentful.com/spaces/${spaceId}/entries?${queryString}`;
};

export {filterInIncludes, findInIncludes, getContentfulEntriesUrl, getIncludesByTypeId};
