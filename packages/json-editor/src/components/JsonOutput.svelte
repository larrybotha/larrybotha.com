<script>
  export let service;
  let state = service.state;

  service.onTransition(s => (state = s));
</script>

<style>

</style>

<pre>{JSON.stringify(json, null, 2)}</pre>
