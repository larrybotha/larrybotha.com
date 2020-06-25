<script>
  import {onMount} from 'svelte';

  import SvgSprites from 'src/components/svg-sprites.svelte';
  import Navigation from './_components/navigation.svelte';

  export let segment;
</script>

<style lang="scss" global>
  @import '../scss/style.scss';
</style>

<Navigation {segment} />

<main>
  <SvgSprites />

  <slot />
</main>
