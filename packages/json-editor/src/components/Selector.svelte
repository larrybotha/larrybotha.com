<script>
  let isActive = false;

  const handleClick = () => {
    isActive = !isActive;
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
  }

  .selector__content[aria-hidden='true'] {
    opacity: 0;
    height: 0;
  }

  .selector__content[aria-hidden='false'] {
    opacity: 1;
    height: auto;
  }
</style>

<div class="selector">
  <button class="selector__btn" on:click={handleClick}>+</button>

  <div class="selector__content" aria-hidden={!isActive}>
    <slot />
  </div>
</div>
