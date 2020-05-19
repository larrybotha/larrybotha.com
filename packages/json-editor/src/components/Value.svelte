<script>
  import Button from './Button.svelte';
  import ValueTypeSelector from './ValueTypeSelector.svelte';
  import PrimitiveTypeSelector from './PrimitiveTypeSelector.svelte';

  export let service;

  let inputEl;

  const {send} = service;

  const sendPropertyKey = id => ev =>
    send('SEND_PROPERTY_KEY', {refId: id, data: ev.currentTarget.value});

  const setPropertyValue = ev => send('SET_VALUE', {data: ev.currentTarget.value});
  const setBooleanPropertyValue = ev => send('SET_VALUE', {data: ev.currentTarget.checked});

  const addInput = () => send('ADD_VALUE');
  const removeInput = id => send('REMOVE_VALUE', {data: {id}});
</script>

<style>
  .value {
    display: inline-block;
    vertical-align: top;
  }

  .value[data-state='object']:before {
    content: '{';
  }
  .value[data-state='object']:after {
    content: '}';
  }
  .value[data-state='array']:before {
    content: '[';
  }
  .value[data-state='array']:after {
    content: ']';
  }

  .value__item {
    vertical-align: top;
    padding-left: 1em;
  }
</style>

<ValueTypeSelector {service} />

<div class="value" data-state={$service.value}>
  {#if $service.matches('object')}
    {#each $service.context.values as value, i (value.ref.id)}
      <div class="value__item" key={value.ref.id}>
        <Button on:click={() => removeInput(value.ref.id)}>-</Button>

        <input
          on:input={sendPropertyKey(value.ref.id)}
          placeholder="key"
          type="text"
          value={value.ref.state.context.key || ''} />
        :
        <svelte:self service={value.ref} />
      </div>
    {/each}
  {/if}

  {#if $service.matches('array')}
    {#each $service.context.values as value, i (value.ref.id)}
      <div class="value__item" key={value.ref.id}>
        <Button on:click={() => removeInput(value.ref.id)}>-</Button>
        <svelte:self service={value.ref} />
      </div>
    {/each}
  {/if}

  {#if $service.matches('object') || $service.matches('array')}
    <div>
      <Button on:click={addInput}>+</Button>
    </div>
  {/if}

  {#if $service.matches('primitive')}
    <PrimitiveTypeSelector {service} />

    {#if $service.matches('primitive.string')}
      <input
        this={inputEl}
        on:input={setPropertyValue}
        type="text"
        value={$service.context.value} />
    {/if}

    {#if $service.matches('primitive.number')}
      <input
        this={inputEl}
        on:input={setPropertyValue}
        type="number"
        value={$service.context.value} />
    {/if}

    {#if $service.matches('primitive.boolean')}
      <input
        this={inputEl}
        type="checkbox"
        on:change={setBooleanPropertyValue}
        checked={$service.context.value} />
    {/if}
  {/if}
</div>
