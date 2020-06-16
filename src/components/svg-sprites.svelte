<script>
  import {onMount} from 'svelte';

  let iconsSprite = '';

  onMount(async () => {
    const module = await import(
    '../../static/build/svg-sprites/icons.symbol.svg'
    );
    iconsSprite = module.default;
  });
</script>

<div style="position: absolute; z-index: -1;">
  {@html iconsSprite}
</div>
