<script>
  import Button from './Button.svelte';
  import Selector from './Selector.svelte';

  export let service;
  let {send} = service;

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

  const handleClick = eventType => send(eventType);

  $: getButtonContent = () => {
    switch (true) {
      case $service.matches('primitive.string'):
        return 'string';

      case $service.matches('primitive.number'):
        return 'number';

      case $service.matches('primitive.boolean'):
        return 'boolean';

      case $service.matches('primitive.null'):
        return 'null';

      case $service.matches('primitive.string'):
      default:
        return 'undefined';
    }
  };
</script>

<Selector buttonContent={getButtonContent()} items={buttonProps} let:item>
  <Button on:click={item.handler}>{item.text}</Button>
</Selector>
