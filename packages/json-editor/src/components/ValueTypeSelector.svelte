<script>
  export let service;
  export let state = service.machine.initialState;

  let valueTransition;
  const transitionType = () => service.send(valueTransition);
</script>

<select bind:value={valueTransition} on:change={transitionType}>
  <option value="" disabled selected={state.matches('unknown')}>choose a type</option>
  <option selected={state.matches('primitive')} value="SELECT_PRIMITIVE">x</option>
  <option selected={state.matches('array')} value="SELECT_ARRAY">
    {@html '[  ]'}
  </option>
  <option selected={state.matches('object')} value="SELECT_OBJECT">
    {@html '{  }'}
  </option>
</select>
