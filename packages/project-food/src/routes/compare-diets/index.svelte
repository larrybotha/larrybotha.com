<style>
	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

  .color {
    display: inline-block;
    width: 1em;
    height: 1em;
  }

  .color[data-css-cats*=red]{ background-color: red;}
  .color[data-css-cats*=orange]{ background-color: orange;}
  .color[data-css-cats*=green]{ background-color: green;}

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid;
  }
</style>

<script context="module">
  import {DIET_CONTENT_TYPE, FOOD_GROUP_LIST_CONTENT_TYPE} from '../../constants/contentful'
  import {
    filterInIncludes,
    findInIncludes,
    getContentfulEntriesUrl,
    getIncludesByTypeId,
    getNormalizedFoodItems,
  } from '../../helpers/contentful'

	export async function preload({ params, query }) {
    const dietsUrl = getContentfulEntriesUrl({
      content_type: DIET_CONTENT_TYPE,
      include: 3,
    });
    const foodGroupsListUrl = getContentfulEntriesUrl({
      content_type: FOOD_GROUP_LIST_CONTENT_TYPE,
    });
    const tagsListUrl = getContentfulEntriesUrl({
      content_type: 'tagList',
    });
    const dietResponse = await this.fetch(dietsUrl)
    const dietData = await dietResponse.json();
    const tagListResponse = await this.fetch(tagsListUrl)
    const tagListData = await tagListResponse.json();
    const foodGroupsListResponse = await this.fetch(foodGroupsListUrl)
    const foodGroupsListData = await foodGroupsListResponse.json();
    const errorResponse = [dietResponse, foodGroupsListResponse, tagListResponse].find(res => res.status !== 200);

    if (!errorResponse) {
      const {items: rawDiets} = dietData;
      const {items: tagList} = tagListData;
      const {items: foodGroupLists} = foodGroupsListData;
      const {includes: incs} = dietData;
      const {Entry: includes} = incs
      const foodGroupList = foodGroupLists.find(Boolean);
      const diets = rawDiets.map(({fields, sys}) => ({...fields, id: sys.id}))
        .map(diet => ({
          ...diet,
          dietCategories: (diet.dietCategories || [])
            .map(cat => {
              const includedCat = findInIncludes(includes, cat.sys.id);

              return {...includedCat.fields, id: cat.sys.id};
            })
        }));
      const rawTags = tagList.find(Boolean) ? tagList.find(Boolean).fields.tags : [];
      const rawDietCategories = getIncludesByTypeId(includes, 'dietCategory')
      const foodItems = getNormalizedFoodItems(includes, rawDietCategories)
      const foodGroups = foodGroupList.fields.foodGroups
                          .map(fg => findInIncludes(includes, fg.sys.id))
                          .map(({fields, sys}) => ({...fields, id: sys.id}))
      const tags = rawTags.map(tag => findInIncludes(includes, tag.sys.id))
                    .map(({fields, sys}) => ({...fields, id: sys.id}))

      return {
        diets,
        foodGroups,
        foodItems,
        tags,
      };
		} else {
      this.error(errorResponse.status, dietData.message, foodGroupsListData.message, tagListData.message);
		}
  }
</script>

<script>
  export let diets = []
  export let foodItems = []
  export let tags = []
  export let foodGroups = []

  export const getFoodItemCatsByDiet = (foodItem, diet) => {
    const dietCats = foodItem.dietCategories.filter(cat => diet.dietCategories.filter(dc => dc.id === cat.id).length > 0);

    return dietCats;
  };

  let tagSlugsFilter = []
  let foodGroupSlugsFilter = []
  let dietCatSlugsFilter = []
  let dietSlugsFilter = []
  let textFilter = '';
  $: filteredDiets = dietSlugsFilter.length
    ? diets.filter(({slug}) => dietSlugsFilter.indexOf(slug) > -1)
    : diets;
  $: textFilterRegexp$ = new RegExp(textFilter, 'i')
  $: filteredItems$ = [...foodItems]
    .filter(item => textFilter ? textFilterRegexp$.test(item.title) : true)
    .filter(item => {
      return tagSlugsFilter.length
        ? item.tags.some(tag => tagSlugsFilter.indexOf(tag.slug) > -1)
        : true;
    })
    .filter(item => {
      return dietCatSlugsFilter.length
        ? item.dietCategories.some(dc => dietCatSlugsFilter.indexOf(dc.slug) > -1)
        : true;
    })
    .filter(item => {
      return foodGroupSlugsFilter.length
        ? foodGroupSlugsFilter.indexOf(item.foodGroup.slug) > -1
        : true;
    })
  $: diets$ = filteredDiets.map(diet => {
    const cats = (diet.dietCategories || []).filter(({slug}) => {
        return dietCatSlugsFilter.length
          ? dietCatSlugsFilter.indexOf(slug) > -1
          : true;
      })
      .map(cat => {
        const catItems = filteredItems$.filter(item => {
          return item.dietCategories.map(({slug}) => slug).indexOf(cat.slug) > -1;
        })
        const groups = foodGroups.map(group => ({
          ...group,
          items: catItems.filter(item => item.foodGroup.slug === group.slug)
        }));

        return { ...cat, groups }
      });

    return {...diet, categories: cats}
  })
</script>

<svelte:head>
	<title>Diet Comparison | The Picky Eater</title>
</svelte:head>

<h1>Diet Comparison</h1>

<p>
  <label for="text-filter">Filter by name</label> <br />

  <input id="text-filter" bind:value={textFilter} />
</p>

{#if diets.length > 1}
  <div>
    <h2>Diets</h2>

    {#each diets as diet}
      <hr>

      <h3>
        <label for={`diet-${diet.slug}`}>
          <input
            bind:group={dietSlugsFilter}
            value={diet.slug}
            data-slug={diet.slug}
            id={`diet-${diet.slug}`}
            name={diet.slug}
            type="checkbox"
          />

          {diet.title}
        </label>
      </h3>

      {#if diet.dietCategories.length}
        <div>
          <h4>Categories</h4>

          {#each diet.dietCategories as cat}
            <label for={`category-${cat.slug}`}>
              <input
                bind:group={dietCatSlugsFilter}
                value={cat.slug}
                data-slug={cat.slug}
                id={`category-${cat.slug}`}
                name={cat.slug}
                type="checkbox"
                />

              {cat.title}
            </label>
          {/each}
        </div>
      {/if}

    {/each}
  </div>
{/if}

{#if foodGroups.length > 1}
  <div>
    <h2>Food Groups</h2>

    {#each foodGroups as group}
      <label for={`food-group-${group.slug}`}>
        <input
          bind:group={foodGroupSlugsFilter}
          value={group.slug}
          id={`food-group-${group.slug}`}
          type="checkbox"
          name={group.slug}
        />

        {group.title}
      </label>
    {/each}
    <br />
    <br />
  </div>
{/if}

{#if tags.length > 1}
  <div>
    <h2>Attributes</h2>

    {#each tags as tag}
      <label for={`tag-${tag.slug}`}>
        <input
          bind:group={tagSlugsFilter}
          value={tag.slug}
          id={`tag-${tag.slug}`}
          type="checkbox"
          name={tag.slug}
        />

        {tag.title}
      </label>
    {/each}
    <br />
    <br />
  </div>
{/if}

<table>
  <thead>
    <tr>
      <th>Food</th>

      {#each diets$ as diet, i (diet.id)}
        <th>{diet.title}</th>
      {/each}
    </tr>
  </thead>

  {#each filteredItems$ as item, i (item.id)}
    <tr>
      <td>
        <div>
          <strong>
            {item.title}
          </strong>
        </div>

        {item.foodGroup.title}
      </td>

      {#each diets$ as diet, i (diet.id)}
        <td>
          {#each getFoodItemCatsByDiet(item, diet) as dietCat, i (dietCat.id)}
            <div>
              {dietCat.title}
            </div>
          {/each}
        </td>
      {/each}
    </tr>
  {/each}
</table>
