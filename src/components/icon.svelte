<script>
  let klass = '';
  /**
   * allow class to be set using `class="class-name"` instead of `klass="class-name"`
   */
  export {klass as class};

  export let baseClass = 'icon';
  export let classInner = `${baseClass}__inner`;
  export let id;
</script>

<i class="{baseClass} {klass}" {...$$restProps}>
  <i class={classInner}>
    <svg role="img">
      <title>{id.replace(/-/g, ' ')} icon</title>

      <use href={`#icon-${id}`} />
    </svg>
  </i>
</i>
