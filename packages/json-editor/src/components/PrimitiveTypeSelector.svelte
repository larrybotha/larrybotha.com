<script>
  import Button from './Button.svelte';
  import Selector from './Selector.svelte';
  export let service;
  export let state;
  let buttonProps = [
    {
      text: 'string',
      handler: () => handleClick('SELECT_STRING'),
    },
    {
      text: 'number',
      handler: () => handleClick('SELECT_NUMBER'),
    },
    {
      text: 'boolean',
      handler: () => handleClick('SELECT_BOOLEAN'),
    },
    {
      text: 'undefined',
      handler: () => handleClick('SELECT_UNDEFINED'),
    },
    {
      text: 'null',
      handler: () => handleClick('SELECT_NULL'),
    },
  ];

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

<Selector buttonContent={getButtonContent()} items={buttonProps} let:item>
  <Button on:click={item.handler}>{item.text}</Button>
</Selector>
