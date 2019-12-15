<style>
  button {
    background-image: none; /* remove gradient from FF on mobile */
    background-color: #333;
    border: 0;
    border-radius: 2em;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    height: auto; /* ensure heights set on inputs do not affect submit buttons */
    line-height: normal; /* let's make all browsers match FF's !important */
    margin: 0;
    padding: 0.25em 0.5em;
    position: relative;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    width: auto;
  }

  button:active,
  button:focus {
    outline: none;
  }
</style>

<button on:click>
  <slot />
</button>
