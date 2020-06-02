<script>
  import {onMount} from 'svelte';

  export let title;
  export let seoTitle;
  export let seoDescription;

  const seoTitleSuffixed = [seoTitle, 'Larry Botha'].join(' | ');

  // https://github.com/sveltejs/sapper/issues/904#issuecomment-540536561
  onMount(() => {
    document.querySelectorAll('a').forEach(a => {
      if (!a.hash || !document.querySelectorAll(a.hash).length) return;

      a.href = window.location + a.hash;
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
