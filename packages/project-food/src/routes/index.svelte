<style>
	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
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
  import {globals} from '../globals'
  import {DIET_CATEGORY_CONTENT_TYPE} from '../constants/contentful'

  const {spaceId, accessToken} = globals.contentful;

  const findInIncludes = (includes, id) => {
    return includes.find(include => include.sys.id === id);
  }

  const filterInIncludes = (includes, id) => {
    return includes.filter(include => include.sys.id === id);
  }

  const getIncludesByTypeId = (includes, id) => {
    return includes.filter(include => include.sys.contentType.sys.id === id);
  }

  const getNormalizedFoodItems = (includes, cats) => {
    const foodItems = getIncludesByTypeId(includes, 'foodItem');

    return foodItems.map(item => {
      const {fields} = item;
      const dietCategories = cats.filter(cat => cat.fields.foodItems.find(fItem => fItem.sys.id === item.sys.id))
        .map(({fields, sys}) => ({...fields, id: sys.id}))
      const foodGroup = findInIncludes(includes, fields.foodGroup.sys.id);
      const tags =  (fields.tags || []).map(tag => findInIncludes(includes, tag.sys.id))
                      .map(include => include.fields)

      return {
        ...fields,
        id: item.sys.id,
        dietCategories,
        foodGroup: foodGroup.fields,
        tags,
      }
    })
  }

	export async function preload({ params, query }) {
    const url = `https://cdn.contentful.com/spaces/${spaceId}/entries?content_type=${DIET_CATEGORY_CONTENT_TYPE}&access_token=${accessToken}&include=2`
    const res = await this.fetch(url)
    const data = await res.json();

		if (res.status === 200) {
      const {items: dietCats} = data;
      const {includes: incs} = data;
      const {Entry: includes} = incs
      const dietCategories = dietCats.map(({fields, sys}) => ({...fields, id: sys.id}))
      const foodItems = getNormalizedFoodItems(includes, dietCats)
      const foodGroups = getIncludesByTypeId(includes, 'foodGroup').map(({fields, sys}) => ({...fields, id: sys.id}))
      const tags = getIncludesByTypeId(includes, 'tag').map(({fields, sys}) => ({...fields, id: sys.id}))

      return {
        dietCategories,
        foodGroups,
        foodItems,
        tags,
      };
		} else {
			this.error(res.status, data.message);
		}
  }
</script>

<script>
  import { quintOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';
  import { flip } from 'svelte/animate';

  const [send, receive] = crossfade({
    duration: d => Math.sqrt(d * 200),

    fallback(node, params) {
      return {
        duration: 400,
        easing: quintOut,
        css: t => `
          opacity: ${t}
        `
      };
    }
  });

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
      return tagFilters.length ? item.tags.some(tag => tagFilters.indexOf(tag.slug) > -1) : true;
    })
    .filter(item => {
      return dietCategoryFilters.length ? item.dietCategories.some(dc => dietCategoryFilters.indexOf(dc.slug) > -1) : true;
    })
    .filter(item => {
      return foodGroupFilters.length ? foodGroupFilters.indexOf(item.foodGroup.slug) > -1  : true;
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
	<title>Banting Food List</title>
</svelte:head>

<h1>Banting food list</h1>

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
  <div
    in:receive="{{key: cat.id}}"
    out:send="{{key: cat.id}}"
  >
    <h2>{cat.title}</h2>

    {#each cat.groups as foodGroup, i (foodGroup.id)}
      <div>
        {#if foodGroup.items.length}
          <h3>{foodGroup.title}</h3>
        {/if}

        <ul>
          {#each foodGroup.items as item, i (item.id)}
            <li
              in:receive="{{key: item.id}}"
              out:send="{{key: item.id}}"
              animate:flip
              >
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
