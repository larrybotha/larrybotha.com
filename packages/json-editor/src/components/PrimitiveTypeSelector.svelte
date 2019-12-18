<script>
  import Button from './Button.svelte';
  import Selector from './Selector.svelte';
  export let service;
  export let state;

  const handleClick = eventType => service.send(eventType);
  $: getButtonContent = () => {
    switch (true) {
      case state.matches('primitive.string'):
        return 'string';
      case state.matches('primitive.number'):
        return 'number';
      case state.matches('primitive.boolean'):
        return 'boolean';
      case state.matches('primitive.null'):
        return 'null';
      case state.matches('primitive.string'):
        return 'undefined';
      default:
        return;
    }
  };
</script>

<Selector buttonContent={getButtonContent()}>
  <Button on:click={() => handleClick('SELECT_STRING')}>string</Button>
  <Button on:click={() => handleClick('SELECT_NUMBER')}>number</Button>
  <Button on:click={() => handleClick('SELECT_BOOLEAN')}>boolean</Button>
  <Button on:click={() => handleClick('SELECT_NULL')}>null</Button>
  <Button on:click={() => handleClick('SELECT_UNDEFINED')}>undefined</Button>
</Selector>
