<script>
  import {spring} from 'svelte/motion';
  import {fade} from 'svelte/transition';

  import Button from './Button.svelte';
  export let buttonContent = '+';
  export let items = [];
  let itemCoords = spring(items.map(() => ({x: 0, y: 0})), {
    stiffness: 0.1,
    damping: 0.25,
  });
  let isActive = false;

  const setCoords = async () => {
    return await itemCoords.set(
      items.map((_, i) => {
        const {length} = items;
        const pos = Math.floor(i - length / 4);
        const angle = (pos * (Math.PI * 0.8)) / length;
        const radius = items.length * 12;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return {x, y};
      }),
    );
  };

  const resetCoords = async () => await itemCoords.set(items.map(() => ({x: 0, y: 0})));

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
    top: 0%;
    left: 0%;
    transform: translate3d(-50%, -50%, 0);
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
    position: absolute;
    left: 100%;
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
