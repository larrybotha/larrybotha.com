<script>
  export let title;
  export let seoTitle;
  export let seoDescription;

  const seoTitleSuffixed = [seoTitle, 'Larry Botha'].join(' | ');
</script>

<svelte:head>
  <title>{seoTitleSuffixed}</title>
  <meta name="description" content={seoDescription} />
</svelte:head>

<div class="wrap">
  <h1>{title}</h1>

  <slot />
</div>
