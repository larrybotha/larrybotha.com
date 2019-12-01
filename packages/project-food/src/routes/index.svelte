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
  import {globals} from '../globals'
  import {DIET_CONTENT_TYPE} from '../constants/contentful'

  const {spaceId, accessToken} = globals.contentful;

	export async function preload({params}) {
    const query = {
      content_type: DIET_CONTENT_TYPE,
      access_token: accessToken,
    };
    const queryString = Object.keys(query).map(k => `${k}=${query[k]}`).join('&');
    const url = `https://cdn.contentful.com/spaces/${spaceId}/entries?${queryString}`
    const res = await this.fetch(url)
    const data = await res.json();

		if (res.status === 200) {
      const {items: rawDiets} = data;
      const diets = rawDiets.map(({fields}) => fields)

      return {diets};
		} else {
			this.error(res.status, data.message);
		}
  }
</script>

<script>
  export let diets = []
</script>

<svelte:head>
	<title>The Picky Eater</title>
</svelte:head>

<h1>The Picky Eater</h1>

{#if diets.length }
  <ul>
    {#each diets as diet}
      <li>
        <a href={`/diets/${diet.slug}`} rel="prefetch">{diet.title}</a>
      </li>
    {/each}
    <li>
      <a href={`/compare-diets`} rel="prefetch">Compare diets</a>
    </li>
  </ul>
{:else}
  <p>Somehow... we don't have any diets. Is there no content? Has the world ended? Are you even real?</p>
{/if}
