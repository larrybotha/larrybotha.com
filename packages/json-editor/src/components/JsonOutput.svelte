<style>
</style>

<script>
  export let service;
  let state = service.state;

  service.onTransition(s => state = s)
</script>

<pre>
{JSON.stringify(json, null, 2)}
</pre>
