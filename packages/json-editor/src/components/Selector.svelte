<script>
  import Button from './Button.svelte';
  export let buttonContent = '+';
  let isActive = false;

  const handleClick = ev => {
    ev.stopPropagation();

    isActive = !isActive;
  };
  const deactivateSelector = () => {
    isActive = false;
  };
  const closeSelector = () => {
    if (isActive) {
      isActive = false;
    }
  };
</script>

<style>
  .selector {
    position: relative;
    display: inline-block;
  }

  .selector__btn {
  }

  .selector__content {
    position: absolute;
    top: 100%;
    left: 100%;
    transform: translateY(-50%);
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
</style>

<svelte:body on:click={isActive ? closeSelector : () => {}} />

<div class="selector">
  <Button class="selector__btn" on:click={handleClick}>{buttonContent}</Button>

  <div class="selector__content" aria-hidden={!isActive}>
    <slot />
  </div>
</div>
