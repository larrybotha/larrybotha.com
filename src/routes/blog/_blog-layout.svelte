<script context="module">
  export async function preload(page, session) {
    debugger;
  }
</script>

<script>
  export let title;
</script>

<div class="wrap">
  <h1>{title}</h1>

  <slot />
</div>
