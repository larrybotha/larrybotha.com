<script>
  import Button from './Button.svelte';
  import Selector from './Selector.svelte';
  export let service;

  const handleClick = eventType => service.send(eventType);
</script>

<Selector>
  <Button on:click={() => handleClick('SELECT_PRIMITIVE')}>x</Button>
  <Button on:click={() => handleClick('SELECT_ARRAY')}>
    {@html '[ ]'}
  </Button>
  <Button on:click={() => handleClick('SELECT_OBJECT')}>
    {@html '{ }'}
  </Button>
</Selector>
