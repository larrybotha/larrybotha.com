<script>
  import {onMount} from 'svelte';

  import Nav from '../components/Nav.svelte';

  export let segment;

  let themeId = 0;
  const themes = ['auto', 'light', 'dark'];

  function cycleTheme() {
    themeId = (themeId + 1) % themes.length;
    localStorage.setItem('larrybotha-theme', themes[themeId]);
    setTheme();
  }

  function setTheme() {
    const theme = localStorage.getItem('larrybotha-theme');
    document.documentElement.setAttribute('data-css-theme', theme);
  }

  onMount(setTheme);
</script>

<style lang="scss" global>
  @import '../scss/style.scss';
</style>

<button on:click={cycleTheme}>theme: {themes[themeId]}</button>

<Nav {segment} />

<main>
  <slot />
</main>
