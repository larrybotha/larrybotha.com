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

  export async function preload({params}) {
    const dietsUrl = getContentfulEntriesUrl({
      content_type: DIET_CONTENT_TYPE,
      include: 3,
    });
    const foodGroupsListUrl = getContentfulEntriesUrl({
      content_type: FOOD_GROUP_LIST_CONTENT_TYPE,
    });
    const dietResponse = await this.fetch(dietsUrl)
    const dietData = await dietResponse.json();
    const foodGroupsListResponse = await this.fetch(foodGroupsListUrl)
    const foodGroupsListData = await foodGroupsListResponse.json();
    const errorResponse = [dietResponse, foodGroupsListResponse].find(res => res.status !== 200);

    if (!errorResponse) {
      const {items: diets} = dietData;
      const {items: foodGroupLists} = foodGroupsListData;
      const foodGroupList = foodGroupLists.find(Boolean);
      const otherDiets = diets.filter(({fields}) => fields.slug !== params.slug)
                          .map(({fields}) => fields)
      const rawPageDiet = diets.find(({fields}) => fields.slug === params.slug);
      const {includes: incs} = dietData;
      const {Entry: includes} = incs
      const rawDietCategories = getIncludesByTypeId(includes, 'dietCategory');
      const foodItems = getNormalizedFoodItems(includes, rawDietCategories);
      const dietCategories = rawPageDiet && rawPageDiet.fields.dietCategories
        ? rawPageDiet.fields.dietCategories
            .map((cat) => findInIncludes(includes, cat.sys.id))
            .map(({fields, sys}) => ({...fields, id: sys.id}))
        : [];
      const foodGroups = foodGroupList.fields.foodGroups
                          .map(fg => findInIncludes(includes, fg.sys.id))
                          .map(({fields, sys}) => ({...fields, id: sys.id}))
      const tags = getIncludesByTypeId(includes, 'tag').map(({fields, sys}) => ({...fields, id: sys.id}))
      const diet = rawPageDiet ? rawPageDiet.fields : undefined

      return {
        diet,
        otherDiets,
        dietCategories,
        foodGroups,
        foodItems,
        tags,
      };
    } else {
      this.error(errorResponse.status, dietData.message, foodGroupsListData.message);
    }
  }
</script>

<script>
  export let diet;
  export let otherDiets = [];
  export let foodItems = []
  export let tags = []
  export let foodGroups = []
  export let dietCategories = []

  let tagFilters = []
  let foodGroupFilters = []
  let dietCategoryFilters = []
  let textFilter = '';
  $: textFilterRegexp = new RegExp(textFilter, 'i')
  $: filteredItems = [...foodItems]
    .filter(item => textFilter ? textFilterRegexp.test(item.title) : true)
    .filter(item => {
      return tagFilters.length
        ? item.tags.some(tag => tagFilters.indexOf(tag.slug) > -1)
        : true;
    })
    .filter(item => {
      return dietCategoryFilters.length
        ? item.dietCategories.some(dc => dietCategoryFilters.indexOf(dc.slug) > -1)
        : true;
    })
    .filter(item => {
      return foodGroupFilters.length
        ? foodGroupFilters.indexOf(item.foodGroup.slug) > -1
        : true;
    })
  $: cats = dietCategories.map(cat => {
    const catItems = filteredItems.filter(item => {
      return item.dietCategories.map(({slug}) => slug).indexOf(cat.slug) > -1;
    })
    const groups = foodGroups.map(group => ({
      ...group,
      items: catItems.filter(item => item.foodGroup.slug === group.slug)
    }));

    return { ...cat, groups }
  })
</script>

<svelte:head>
  <title>{diet ? diet.title : '404 - diet not found'} | The Picky Eater</title>
</svelte:head>

{#if diet}
  <h1>{diet.title}</h1>

  <p>
    <label for="text-filter">Filter by name</label> <br />

    <input id="text-filter" bind:value={textFilter} />
  </p>


  {#if dietCategories.length > 1}
    <div>
      <h2>Categories</h2>

      {#each dietCategories as cat}
        <label for={`category-${cat.slug}`}>
          <input
            bind:group={dietCategoryFilters}
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

  {#if foodGroups.length > 1}
    <div>
      <h2>Food Groups</h2>

      {#each foodGroups as group}
        <label for={`food-group-${group.slug}`}>
          <input
          bind:group={foodGroupFilters}
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
          bind:group={tagFilters}
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

  {#each cats as cat, i (cat.id)}
    <div>
      <h2>{cat.title}</h2>

      {#each cat.groups as foodGroup, i (foodGroup.id)}
        <div>
          {#if foodGroup.items.length}
            <h3>{foodGroup.title}</h3>
          {/if}

          <ul>
            {#each foodGroup.items as item, i (item.id)}
              <li>
                <span class={`color`} data-css-cats={item.dietCategories.map(({slug}) => slug).join(' ')}>
                </span>
                {item.title}

                {#if item.tags.length}
                  <br />
                  <small>
                    {item.tags.map(({title}) => title).join(', ')} <br />
                  </small>
                {/if}
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  {/each}
{/if}

{#if !diet}
  We couldn't find this diet. Here are the diets we do have:

  <ul>
    {#each otherDiets as otherDiet}
      <li>
        <a href={`/diets/${otherDiet.slug}`} preload>{otherDiet.title}</a>
      </li>
    {/each}
  </ul>
{/if}

