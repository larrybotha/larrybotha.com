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

const getNormalizedFoodItems = (includes, cats) => {
  const foodItems = getIncludesByTypeId(includes, 'foodItem').sort((a, b) =>
    a.fields.title > b.fields.title ? 1 : -1,
  );

  return foodItems.map(item => {
    const {fields} = item;
    const dietCategories = cats
      .filter(cat => cat.fields.foodItems.find(fItem => fItem.sys.id === item.sys.id))
      .map(({fields, sys}) => ({...fields, id: sys.id}));
    const foodGroup = findInIncludes(includes, fields.foodGroup.sys.id);
    const tags = (fields.tags || [])
      .map(tag => findInIncludes(includes, tag.sys.id))
      .map(include => include.fields);

    return {
      ...fields,
      dietCategories,
      foodGroup: foodGroup.fields,
      id: item.sys.id,
      tags,
    };
  });
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

export {
  filterInIncludes,
  findInIncludes,
  getContentfulEntriesUrl,
  getIncludesByTypeId,
  getNormalizedFoodItems,
};
