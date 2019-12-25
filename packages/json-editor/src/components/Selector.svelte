<script>
  import {spring} from 'svelte/motion';
  import {fade} from 'svelte/transition';

  import Button from './Button.svelte';

  export let buttonContent = '+';
  export let items = [];
  const {length: numItems} = items;
  const SCALAR = 12;

  function getBaseCoords(index, totalItems) {
    return {
      x: 0,
      y: SCALAR * (totalItems - 2 * index - 1),
    };
  }

  let itemCoords = spring(items.map((_, i, {length}) => getBaseCoords(i, length)), {
    stiffness: 0.1,
    damping: 0.25,
  });
  let isActive = false;

  async function setCoords() {
    return await itemCoords.set(
      items.map((_, i) => {
        const {length} = items;
        const pos = Math.floor(i - length / 4);
        const angle = pos * (Math.PI * 0.25);
        const radius = 18;
        const x = radius + radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return {x, y};
      }),
    );
  }

  async function resetCoords() {
    return await itemCoords.set(items.map((_, i, {length}) => getBaseCoords(i, length)));
  }

  const handleClick = async ev => {
    ev.stopPropagation();

    setCoords();
    isActive = !isActive;
  };
  const deactivateSelector = async () => {
    await resetCoords();
    isActive = false;
  };
  const closeSelector = async () => {
    if (isActive) {
      await resetCoords();
      isActive = false;
    }
  };
</script>

<style>
  .selector {
    position: relative;
    display: inline-block;
  }

  .selector__content {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate3d(0%, -50%, 0);
  }

  .selector__content[aria-hidden='true'] {
    opacity: 0;
    z-index: -5;
  }

  .selector__content[aria-hidden='false'] {
    height: auto;
    opacity: 1;
    z-index: 5;
  }

  .selector__item {
    display: inline-block;
  }
</style>

<svelte:body on:click={isActive ? closeSelector : () => {}} />

<div class="selector">
  <Button class="selector__btn" on:click={isActive ? deactivateSelector : handleClick}>
    {buttonContent}
  </Button>

  {#if isActive}
    <div class="selector__content" aria-hidden={!isActive} in:fade out:fade>
      {#each items as item, i}
        <span
          class="selector__item"
          key={i}
          style="transform: translate3d( {$itemCoords[i].x}px, {$itemCoords[i].y}px, 0);">
          <slot {item} />
        </span>
      {/each}
    </div>
  {/if}
</div>
