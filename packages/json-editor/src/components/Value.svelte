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
  export let service;
  export let valueTransition = undefined;
  export let state = service.machine.initialState;
  $: value = state.context.value;

  export const transitionPropType = () => service.send(valueTransition);
  export const transitionPrimitiveType = (ev) => service.send(ev.currentTarget.value);
  export const setPropertyValue = (ev) => service.send('SET_VALUE', {data: ev.currentTarget.value})
  export const setBooleanPropertyValue = (ev) => service.send('SET_VALUE', {data: ev.currentTarget.checked})
  export const sendPropertyName = id => (ev) => service.send('SEND_PROPERTY_NAME', {refId: id, data: ev.currentTarget.value});
  export const addInput = () => service.send('ADD_ACTOR')

  export const removeInput = (id) => {
    service.send('REMOVE_ACTOR', {data:{id}})
  }

  service.onTransition(s => state = s)
</script>

<select bind:value={valueTransition} on:change={transitionPropType}>
  <option value="" disabled selected={state.matches('unknown')}>choose a type</option>
  <option selected={state.matches('primitive')} value="SELECT_PRIMITIVE">primitive</option>
  <option selected={state.matches('array')} value="SELECT_ARRAY">array</option>
  <option selected={state.matches('object')} value="SELECT_OBJECT">object</option>
</select>

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
    <select  on:change={transitionPrimitiveType}>
      <option selected={state.matches('primitive.string')} value="SELECT_STRING">string</option>
      <option selected={state.matches('primitive.number')} value="SELECT_NUMBER">number</option>
      <option selected={state.matches('primitive.boolean')} value="SELECT_BOOLEAN">boolean</option>
      <option selected={state.matches('primitive.null')} value="SELECT_NULL">null</option>
      <option selected={state.matches('primitive.undefined')} value="SELECT_UNDEFINED">undefined</option>
    </select>

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
