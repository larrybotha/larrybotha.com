<script context="module">
  import {getPosts} from 'src/stores/posts';

  export async function preload() {
    /**
     * Generate sitemap only on server request, i.e. export
     */
    if (typeof window === 'undefined') {
      await this.fetch('./sitemap.xml');
    }

    const posts = await getPosts(this);

    return {posts};
  }
</script>

<script>
  export let posts = [];
</script>

<style lang="scss" global>
  @import '../scss/style.scss';
</style>

<svelte:head>
  <title>Front end developer | React developer | Larry Botha</title>
</svelte:head>

<h1>Larry Botha</h1>

<ul>
  {#each posts as post, i}
    <li>
      <a href="/blog/{post.slug}">{post.title}</a>
    </li>
  {/each}
</ul>
