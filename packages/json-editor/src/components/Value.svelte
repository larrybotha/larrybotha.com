<style>
  .value {
    display: inline-block;
    padding-left: 1em;
  }

  .value[data-state="object"]:before { content: "{" }
  .value[data-state="object"]:after { content: "}" }
  .value[data-state="array"]:before { content: "[" }
  .value[data-state="array"]:after { content: "]" }
</style>

<script>
  import ValueTypeSelector from './ValueTypeSelector.svelte'
  import PrimitiveTypeSelector from './PrimitiveTypeSelector.svelte'

  export let service;
  export let state = service.machine.initialState;
  $: value = state.context.value;

  const sendPropertyName = id => (ev) => service.send('SEND_PROPERTY_NAME', {refId: id, data: ev.currentTarget.value});
  const addInput = () => service.send('ADD_ACTOR');
  const removeInput = (id) => service.send('REMOVE_ACTOR', {data:{id}});
  const setPropertyValue = (ev) => service.send('SET_VALUE', {data: ev.currentTarget.value})
  const setBooleanPropertyValue = (ev) => service.send('SET_VALUE', {data: ev.currentTarget.checked})

  service.onTransition(s => state = s)
</script>

<ValueTypeSelector service={service} state={state} />

<div class="value" data-state={state.value}>
  {#if state.matches('object')}
    {#each state.context.values as value, i (value.ref.id)}
      <div key={value.ref.id}>
        <button on:click={() => removeInput(value.ref.id)}>-</button>
        <input
          on:change={sendPropertyName(value.ref.id)}
          placeholder="name"
          type="text"
          value={value.ref.state.context.name || ''}
        />: <svelte:self service={value.ref} />
      </div>
    {/each}
  {/if}

  {#if state.matches('array')}
    {#each state.context.values as value, i (value.ref.id)}
      <div key={value.ref.id}>
        <button on:click={() => removeInput(value.ref.id)}>-</button>
        <svelte:self service={value.ref} />
      </div>
    {/each}
  {/if}

  {#if state.matches('object') || state.matches('array')}
    <div>
      <button on:click={addInput}>+</button>
    </div>
  {/if}

  {#if state.matches('primitive')}
    <PrimitiveTypeSelector service={service} state={state} />

    {#if state.matches('primitive.string')}
      <input type="text" on:input={setPropertyValue} value={value ? value : ''} />
    {/if}

    {#if state.matches('primitive.number')}
      <input type="number" on:input={setPropertyValue} value={value ? value : ''} />
    {/if}

    {#if state.matches('primitive.boolean')}
      <input type="checkbox" on:change={setBooleanPropertyValue} checked={value} />
    {/if}

    {#if state.matches('primitive.null') || state.matches('primitive.undefined')}
      {JSON.stringify(value)}
    {/if}
  {/if}
</div>
