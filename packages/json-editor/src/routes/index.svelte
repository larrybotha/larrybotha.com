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
</style>

<script>
  import {interpret} from 'xstate'
  import {valueMachine} from '../machines/value';

  import Value from '../components/Value.svelte'

  export const valueService = interpret(valueMachine);

  valueService.start()
</script>

<svelte:head>
	<title>Json editor</title>
</svelte:head>

<Value service={valueService} />
