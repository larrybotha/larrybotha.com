<script>
  export let service;
  let {state} = service;
  $: context = state.context;

  service.onTransition(s => (state = s));
</script>

<style>
  .child-object {
    padding-left: 1em;
  }
</style>

{#if state.matches('object')}
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

{#if state.matches('array')}
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

{#if state.matches('primitive')}
  <code>
    {#if state.matches('primitive.boolean')}
      {Boolean(context.value)}
    {:else if state.matches('primitive.string')}
      {context.value !== undefined ? `"${context.value}"` : context.value}
    {:else}{context.value}{/if}
  </code>
{/if}
