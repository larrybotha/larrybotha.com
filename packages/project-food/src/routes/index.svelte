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

  /* const client = contentful.createClient({*/
  /*   space: 'iiyfp9eo2b2x',*/
  /*   accessToken: 'J-bMzk2MrDm-zAjjeOlru2s7PqBeYRwqnfSGTUi2RAU'*/
  /* })*/

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
      const dietCategoryIds = cats.filter(cat => cat.fields.foodItems.find(fItem => fItem.sys.id === item.sys.id))
                                .map(cat => cat.fields.slug);
      const foodGroup = findInIncludes(includes, fields.foodGroup.sys.id);
      const tags =  (fields.tags || []).map(tag => findInIncludes(includes, tag.sys.id)).map(include => include.fields)

      return {
        ...fields,
        id: item.sys.id,
        dietCategoryIds,
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
      const dietCategories = dietCats.map(({fields, sys}) => ({...fields, id: sys.id}));
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
      const style = getComputedStyle(node);
      const transform = style.transform === 'none' ? '' : style.transform;

      return {
        duration: 600,
        easing: quintOut,
        css: t => `
          transform: ${transform} scale(${t});
          opacity: ${t}
        `
      };
    }
  });

  export let foodItems = []
  export let foodGroups = []
  export let dietCategories = []
  $: filteredItems = [...foodItems]
  $: cats = dietCategories.map(cat => {
    const catItems = filteredItems.filter(item => item.dietCategoryIds.indexOf(cat.slug) > -1);
    const groups = foodGroups
      /* .filter(group => catItems.some(item => item.foodGroup.slug === group.slug))*/
                    .map(group => ({
                      ...group,
                      items: catItems.filter(item => item.foodGroup.slug === group.slug)
                    }));

    return { ...cat, groups }
  })


  function handleInput(event) {
    const {value} = event.currentTarget;
    const regExp = new RegExp(value, 'i')

    filteredItems = value ? foodItems.filter(item => regExp.test(item.title)) : foodItems;
  }
</script>

<svelte:head>
	<title>Banting Food List</title>
</svelte:head>

<h1>Banting food list</h1>

<input on:input={handleInput} />

{#each cats as cat, i (cat.id)}
  <div
    in:receive="{{key: cat.id}}"
    out:send="{{key: cat.id}}"
    animate:flip
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
              <h2>
                <span class={`color`} data-css-cats={item.dietCategoryIds.join(' ')}>
                </span>
              {item.title}
              </h2>

              {#if item.tags.length}
                <p>
                  <small>
                    {item.tags.map(({title}) => title).join(', ')} <br />
                  </small>
                </p>
              {/if}
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
{/each}
