<script>
  import Button from './Button.svelte';
  import * as props from './Button.svelte';
  debugger;
  import Selector from './Selector.svelte';
  export let service;
  export let state;

  const handleClick = eventType => service.send(eventType);
  $: getButtonContent = () => {
    switch (true) {
      case state.matches('primitive'):
        return 'x';
      case state.matches('object'):
        return '{ }';
      case state.matches('array'):
        return '[ ]';
      default:
        return;
    }
  };
</script>

<Selector buttonContent={getButtonContent()}>
  <Button on:click={() => handleClick('SELECT_PRIMITIVE')}>x</Button>
  <Button on:click={() => handleClick('SELECT_ARRAY')}>
    {@html '[ ]'}
  </Button>
  <Button on:click={() => handleClick('SELECT_OBJECT')}>
    {@html '{ }'}
  </Button>
</Selector>
