<script context="module">
  import {getArticles} from 'src/stores/articles';

  import ArticleList from 'src/components/layout/article-list.svelte';

  export async function preload() {
    const {posts} = await getArticles(this);

    return {posts};
  }
</script>

<script>
  export let posts;
</script>

<svelte:head>
  <title>Blog | Larry Botha</title>
  <meta name="description" content="Larry Botha's blog" />
</svelte:head>

<ArticleList>
  <h1>Recent posts</h1>

  <ul>
    {#each posts as post}
      <li>
        <a href="blog/{post.slug}">{post.title}</a>
      </li>
    {/each}
  </ul>
</ArticleList>
