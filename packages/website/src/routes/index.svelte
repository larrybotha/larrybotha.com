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

<style>
  h1,
  figure,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  figure {
    margin: 0 0 1em 0;
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
