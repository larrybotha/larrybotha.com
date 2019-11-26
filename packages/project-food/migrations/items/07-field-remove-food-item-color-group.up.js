const migrationFn = async (migration, {makeRequest}) => {
  const foodItemName = 'foodItem';
  const foodItemContentType = await makeRequest({
    method: 'GET',
    url: `/content_types?sys.id[in]=${foodItemName}`,
  });

  if (foodItemContentType.items.length === 0) {
    const foodItem = migration.editContentType(foodItemName);

    foodItem.deleteField('colorGroup');
  }
};

module.exports = migrationFn;
