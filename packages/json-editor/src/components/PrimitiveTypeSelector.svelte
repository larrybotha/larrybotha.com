<script>
  import Button from './Button.svelte';
  import Selector from './Selector.svelte';
  export let service;

  const handleClick = eventType => service.send(eventType);
</script>

<Selector>
  <Button on:click={() => handleClick('SELECT_STRING')}>abc</Button>
  <Button on:click={() => handleClick('SELECT_NUMBER')}>123</Button>
  <Button on:click={() => handleClick('SELECT_BOOLEAN')}>boolean</Button>
  <Button on:click={() => handleClick('SELECT_NULL')}>null</Button>
  <Button on:click={() => handleClick('SELECT_UNDEFINED')}>undefined</Button>
</Selector>
