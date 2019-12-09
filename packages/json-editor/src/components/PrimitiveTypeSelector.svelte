<script>
  export let service;
  export let state = service.machine.initialState;

  const transitionPrimitiveType = (ev) => service.send(ev.currentTarget.value);
</script>

<select on:change={transitionPrimitiveType}>
  <option selected={state.matches('primitive.string')} value="SELECT_STRING">string</option>
  <option selected={state.matches('primitive.number')} value="SELECT_NUMBER">number</option>
  <option selected={state.matches('primitive.boolean')} value="SELECT_BOOLEAN">boolean</option>
  <option selected={state.matches('primitive.null')} value="SELECT_NULL">null</option>
  <option selected={state.matches('primitive.undefined')} value="SELECT_UNDEFINED">undefined</option>
</select>
