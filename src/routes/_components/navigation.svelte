<script>
  import {onMount} from 'svelte';

  import Icon from 'src/components/icon.svelte';

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

<style>
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: '';
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
</style>

<nav class="gw">
  <div class="g g--auto">
    <ul>
      <li>
        <a class:selected={segment === undefined} href=".">home</a>
      </li>

      <li>
        <a rel="prefetch" class:selected={segment === 'blog'} href="blog">
          blog
        </a>
      </li>

      <li>
        <a rel="prefetch" class:selected={segment === 'notes'} href="notes">
          notes
        </a>
      </li>
    </ul>

  </div>

  <div class="g g--shrink-wrap">
    <button on:click={cycleTheme}>
      <Icon id="burger" />
      theme: {themes[themeId]}
    </button>
  </div>
</nav>
