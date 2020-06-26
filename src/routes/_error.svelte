<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === 'development';
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<div class="wrap">
  <div class="island u-text--center">
    {#if status === 404}
      <h1>Page not found</h1>

      <p>Doh! Somehow you've ended up on a page that doesn't exist!</p>
    {:else}
      <h1>{status}</h1>

      <p>{error.message}</p>
    {/if}

    {#if dev && error.stack}
      <pre>{error.stack}</pre>
    {/if}
  </div>
</div>
