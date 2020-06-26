<script context="module">
  import {getArticles} from 'src/stores/articles';

  export async function preload() {
    /**
     * Generate sitemap only on server request, i.e. sapper export
     */
    if (typeof window === 'undefined') {
      await this.fetch('./sitemap.xml');
    }

    const {posts, notes} = await getArticles(this);

    return {posts, notes};
  }
</script>

<script>
  export let posts = [];
  export let notes = [];
</script>

<svelte:head>
  <title>Front end developer | React developer | Larry Botha</title>
</svelte:head>

<div class="island">
  <div class="wrap">
    <h2>Articles</h2>
    <ul>
      {#each posts as post, i}
        <li>
          <a href="/blog/{post.slug}">{post.title}</a>
        </li>
      {/each}
    </ul>
    <hr />

    <h2>Notes</h2>

    <ul>
      {#each notes as note, i}
        <li>
          <a href="/notes/{note.slug}">{note.title}</a>
        </li>
      {/each}
    </ul>
  </div>
</div>
