<script context="module">
  import {getArticles} from 'src/stores/articles';

  export async function preload() {
    const {notes} = await getArticles(this);

    return {notes};
  }
</script>

<script>
  export let notes;
</script>

<svelte:head>
  <title>Notes | Larry Botha</title>
  <meta name="description" content="Larry Botha's blog" />
</svelte:head>

<h1>Recent notes</h1>

<ul>
  {#each notes as note}
    <li>
      <a href="notes/{note.slug}">{note.title}</a>
    </li>
  {/each}
</ul>
