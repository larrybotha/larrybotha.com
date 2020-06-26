<script>
  import {onMount} from 'svelte';

  import FormattedDate from 'src/components/formatted-date.svelte';

  export let title;
  export let slug;
  export let seoTitle;
  export let seoDescription;
  export let ogImage;
  export let datePublished;
  export let dateUpdated;

  const seoTitleSuffixed = [seoTitle, 'Larry Botha'].join(' | ');

  // https://github.com/sveltejs/sapper/issues/904#issuecomment-540536561
  onMount(() => {
    document.querySelectorAll('a').forEach(el => {
      const {hash} = el;

      if (!hash || !document.querySelectorAll(hash).length) return;

      const {origin, pathname} = window.location;

      el.href = [origin, pathname, hash].join('');
    });
  });
</script>

<svelte:head>
  <title>{seoTitleSuffixed}</title>
  <meta name="description" content={seoDescription} />

  <link rel="canonical" href="https://larrybotha.com/blog/{slug}" />

  <meta property="og:title" content={seoTitle} />
  <meta property="og:description" content={seoDescription} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://larrybotha.com/blog/{slug}" />

  {#if ogImage}
    <meta
      property="og:image"
      content="https://larrybotha.com/assets/{ogImage}" />
  {/if}
</svelte:head>

<div class="island--small">
  <div class="wrap">
    <h1>{title}</h1>

    {#if datePublished}
      <div>
        published:
        <FormattedDate date={datePublished} />
      </div>
    {/if}

    {#if dateUpdated && dateUpdated !== datePublished}
      <div>
        updated:
        <FormattedDate date={dateUpdated} />
      </div>
    {/if}

    <slot />
  </div>
</div>
