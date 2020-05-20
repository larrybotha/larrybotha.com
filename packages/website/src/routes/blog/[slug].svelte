<script context="module">
  import {getContentfulEntriesUrl, findInIncludes} from '../../helpers/contentful';
  import Body from './Body.svx';

  export async function preload({params}) {
    const articlesRequestUrl = getContentfulEntriesUrl({
      content_type: 'article',
      'fields.slug': params.slug,
    });
    const res = await this.fetch(articlesRequestUrl);
    const data = await res.json();

    if (res.status === 200) {
      const {items, includes: incs} = data;
      const {Asset: includes} = incs;
      const article = items.map(({fields}) => {
        const bannerImage = fields.bannerImage
          ? findInIncludes(includes, fields.bannerImage.sys.id)
          : undefined;

        return {
          ...fields,
          bannerImage: bannerImage ? bannerImage.fields : undefined,
        };
      })[0];

      return {article};
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let article;
</script>

<style>
  img {
    max-width: 100%;
  }

  .content :global(h2) {
    font-size: 1.4em;
    font-weight: 500;
  }

  .content :global(pre) {
    background-color: #f9f9f9;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5em;
    border-radius: 2px;
    overflow-x: auto;
  }

  .content :global(pre) :global(code) {
    background-color: transparent;
    padding: 0;
  }

  .content :global(ul) {
    line-height: 1.5;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
  }
</style>

<svelte:head>
  <title>{article.title}</title>
</svelte:head>

{#if article.bannerImage}
  <img src={article.bannerImage.file.url} alt={article.bannerImage.file.fileName} />
{/if}

<h1>{article.title}</h1>

<span>{article.datePublished}</span>

<Body>
  <div class="content">
    {@html article.body}
  </div>
</Body>
