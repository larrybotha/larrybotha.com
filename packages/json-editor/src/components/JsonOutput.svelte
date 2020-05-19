<script>
  export let service;

  $: context = $service.context;
</script>

<style>
  .child-object {
    padding-left: 1em;
  }
</style>

{#if $service.matches('object')}
  <code>
    {@html '{'}
  </code>

  {#each context.values as {ref}, i (ref.id)}
    <div class="child-object">
      <code>"{ref.state.context.key || ''}":</code>
      <svelte:self service={ref} />
      {i < context.values.length - 1 ? ',' : ''}
    </div>
  {/each}

  <code>
    {@html '}'}
  </code>
{/if}

{#if $service.matches('array')}
  <code>
    {@html '['}
  </code>

  {#each context.values as value, i (value.ref.id)}
    <div class="child-object">
      <svelte:self service={value.ref} />
      {i < context.values.length - 1 ? ',' : ''}
    </div>
  {/each}

  <code>
    {@html ']'}
  </code>
{/if}

{#if $service.matches('primitive')}
  <code>
    {#if $service.matches('primitive.boolean')}
      {Boolean(context.value)}
    {:else if $service.matches('primitive.string')}
      {context.value !== undefined ? `"${context.value}"` : context.value}
    {:else}{context.value}{/if}
  </code>
{/if}
