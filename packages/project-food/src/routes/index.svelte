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
</style>

<script context="module">
  import {getContentfulEntriesUrl, findInIncludes} from '../helpers/contentful'

	export async function preload({params}) {
    const dietListUrl = getContentfulEntriesUrl({content_type: 'dietList'});
    const res = await this.fetch(dietListUrl)
    const data = await res.json();

		if (res.status === 200) {
      const {items, includes: incs} = data;
      const {Entry: includes} = incs;
      const dietList = items.length ? items[0] : undefined;
      const diets = dietList
        ? dietList.fields.diets.map(diet => findInIncludes(includes, diet.sys.id))
            .map(({fields}) => fields)
        : []

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
