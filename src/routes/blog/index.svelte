<script context="module">
  import {getArticles} from 'src/stores/articles';

  export async function preload() {
    const {posts} = await getArticles(this);

    return {posts};
  }
</script>

<script>
  export let posts;
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<svelte:head>
  <title>Blog | Larry Botha</title>
  <meta name="description" content="Larry Botha's blog" />
</svelte:head>

<h1>Recent posts</h1>

<ul>
  {#each posts as post}
    <li>
      <a href="blog/{post.slug}">{post.title}</a>
    </li>
  {/each}
</ul>
