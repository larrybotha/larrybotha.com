<script>
  import {onMount} from 'svelte';

  export let title;
  export let seoTitle;
  export let seoDescription;

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
</svelte:head>

<div class="wrap">
  <h1>{title}</h1>

  <slot />
</div>
