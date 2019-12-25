<script>
  import {interpret} from 'xstate';
  import {valueMachine} from '../machines/value';

  import Value from '../components/Value.svelte';
  import JsonOutput from '../components/JsonOutput.svelte';

  export const valueService = interpret(valueMachine);

  valueService.start();
</script>

<style>
  .flex-context {
    display: flex;
    padding-top: 6em;
  }

  .flex-context__item {
    flex: 1;
  }
</style>

<svelt:options immutable={true} />

<svelte:head>
  <title>Json editor</title>
</svelte:head>

<div class="flex-context">
  <div class="flex-context__item">
    <Value service={valueService} />
  </div>

  <div class="flex-context__item">
    <JsonOutput service={valueService} />
  </div>
</div>
