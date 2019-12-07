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
  export const setPropertyValue = (ev) => service.send('SET_VALUE', {data: ev.currentTarget.value});
  export const sendPropertyName = id => (ev) => service.send('SEND_PROPERTY_NAME', {refId: id, data: ev.currentTarget.value});
  export const addInput = () => service.send('ADD_VALUE')

  export const removeInput = (id) => {
    service.send('REMOVE_VALUE', {data:{id}})
  }

  service.onTransition(s => state = s)
</script>

<select bind:value={valueTransition} on:change={transitionPropType}>
  <option value="" disabled selected={state.matches('unknown')}>choose a type</option>
  <option value="SELECT_PRIMITIVE">primitive</option>
  <option value="SELECT_ARRAY">array</option>
  <option value="SELECT_OBJECT">object</option>
</select>

<div class="value" data-state={state.value}>
  {#if state.matches('object')}
    {#each state.context.values as value, i (value.ref.id)}
      <div key={value.ref.id}>
        <button on:click={() => removeInput(value.ref.id)}>-</button>
        <input
          type="text"
          placeholder="name"
          on:change={sendPropertyName(value.ref.id)}
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
    <input type="text" on:change={setPropertyValue} value={value ? value : ''} />
  {/if}
</div>
