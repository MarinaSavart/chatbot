<script>
  import ButtonClosePreviewMode from './ButtonClosePreviewMode.svelte'

  export let isExpanded
  export let isPreviewMode
  export let closeExpandPreviewMode
</script>

<div class="expand full" class:is-expanded={isExpanded}>
  {#if isPreviewMode}
    <ButtonClosePreviewMode {closeExpandPreviewMode} />
  {/if}

  Expand screen
</div>

<style>
  .expand {
    display: none;
    background: lightgrey;
  }

  .is-expanded {
    display: block;
  }
</style>
