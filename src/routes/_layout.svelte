<script>
  import {onMount} from 'svelte';

  import SvgSprites from 'src/components/svg-sprites.svelte';
  import Nav from 'src/components/Nav.svelte';
  import Icon from 'src/components/icon.svelte'

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

<Nav {segment} />

<main>
<SvgSprites />

<button on:click={cycleTheme}>
  <Icon id="burger" />
theme: {themes[themeId]}</button>



  <slot />
</main>
