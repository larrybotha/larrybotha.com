<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

  .flex-context {
    display: flex;
  }

  .flex-context__item {
    flex: 1;
  }
</style>

<script>
  import {interpret} from 'xstate'
  import {valueMachine} from '../machines/value';

  import Value from '../components/Value.svelte'
  import JsonOutput from '../components/JsonOutput.svelte'

  export const valueService = interpret(valueMachine);

  valueService.start()
</script>

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
