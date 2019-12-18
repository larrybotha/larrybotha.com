<script>
  export let className;
  export const classModifiers = {
    round: 'btn--round',
  };
</script>

<style>
  .btn {
    background-image: none; /* remove gradient from FF on mobile */
    background-color: #aaa;
    border: 0;
    border-radius: 2em;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    height: auto; /* ensure heights set on inputs do not affect submit .btns */
    line-height: normal; /* let's make all browsers match FF's !important */
    margin: 0;
    padding: 0.25em 0.5em;
    position: relative;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    width: auto;
    transition: all 0.15s ease-in-out;
  }

  .btn:hover {
    background-color: #666;
  }

  .btn:active {
    background-color: #aaa;
  }

  .btn:active,
  .btn:focus {
    outline: none;
  }

  .btn--round {
    border-radius: 50%;
  }
</style>

<button class={`btn ${className}`} on:click>
  <slot />
</button>
