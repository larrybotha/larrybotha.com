<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

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
</style>

<script context="module">
  import {globals} from '../globals'
  import {CONTENT_TYPE} from '../constants/contentful'

  const {spaceId, accessToken} = globals.contentful;

  /* const client = contentful.createClient({*/
  /*   space: 'iiyfp9eo2b2x',*/
  /*   accessToken: 'J-bMzk2MrDm-zAjjeOlru2s7PqBeYRwqnfSGTUi2RAU'*/
  /* })*/

	export async function preload({ params, query }) {
    const url = `https://cdn.contentful.com/spaces/${spaceId}/entries?content_type=${CONTENT_TYPE}&access_token=${accessToken}&include=1`
    const res = await this.fetch(url)
    const data = await res.json();

		if (res.status === 200) {
      const {includes: incs} = data;
      const {Entry: includes} = incs


      return {
        data,
        items: data.items.map(({fields})=> {
          return {
            ...fields,
            foodGroup: includes.find(entry => entry.sys.id === fields.foodGroup.sys.id).fields,
            colorGroup: includes.find(entry => entry.sys.id === fields.colorGroup.sys.id).fields,
            tags: (fields.tags || []).map(tag => includes.find(entry => entry.sys.id === tag.sys.id).fields),
          }
        })
      };
		} else {
			this.error(res.status, data.message);
		}
  }
</script>

<script>
  export let items = []
  export let data = {}
      console.log(data)
</script>

<svelte:head>
	<title>Banting Food List</title>
</svelte:head>

<h1>Banting food list</h1>

<ul>
	{#each items as item}
    <li>
      <h2>
        {item.title}
      </h2>

      <dl>
        <dt>food group:</dt>
        <dd>{item.foodGroup.title}</dd>

        <dt>colour:</dt>
        <dd>{item.colorGroup.title}</dd>

        <dt>tags:</dt>
        <dd>
          <ul>
            {#each item.tags as tag}
            <li>
              {tag.title}
            </li>
            {/each}
          </ul>
        </dd>
      </dl>
    </li>
	{/each}
</ul>
