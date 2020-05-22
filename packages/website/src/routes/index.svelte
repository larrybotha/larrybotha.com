<script context="module">
  import {getContentfulEntriesUrl, findInIncludes} from '../helpers/contentful';

  export async function preload() {
    const articlesRequestUrl = getContentfulEntriesUrl({content_type: 'article'});
    const res = await this.fetch(articlesRequestUrl);
    const data = await res.json();

    if (res.status === 200) {
      const {items, includes: incs} = data;
      const {Asset: includes} = incs;
      const articles = items.map(({fields}) => {
        const bannerImage = fields.bannerImage
          ? findInIncludes(includes, fields.bannerImage.sys.id)
          : undefined;

        return {
          ...fields,
          bannerImage: bannerImage ? bannerImage.fields : undefined,
        };
      });

      return {articles};
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let articles = [];
</script>

<style lang="scss" global>
  @import '../scss/style.scss';
</style>

<svelte:head>
  <title>Front end developer | React developer | Larry Botha</title>
</svelte:head>

<h1>Larry Botha</h1>

<ul>
  {#each articles as article, i}
    <li>
      <a rel="prefetch" href="/blog/{article.slug}">{article.title}</a>
    </li>
  {/each}
</ul>
