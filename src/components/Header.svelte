<script>
  import Image from '../hawk-components/Image.svelte'
  export let header
</script>

{#if header.preloadUrl || header.url}
  <header
    style="
    width: {header.width || '100'}%;
    height: {header.height || 'auto'}%;
    margin-top: {header.top ?? '0'}%;
    margin-right: {header.right ?? '0'}%;
    margin-bottom: {header.bottom ?? '0'}%;
    margin-left: {header.left ?? '0'}%;
    padding-top: {header.paddingTop ?? '0'}%;
    padding-right: {header.paddingRight ?? '0'}%;
    padding-bottom: {header.paddingBottom ?? '0'}%;
    padding-left: {header.paddingLeft ?? '0'}%;">
    <Image
      mediaUrl={header.preloadUrl || header.url}
      height="{header.heightImg || '100'}%"
      width="{header.widthImg || '100'}%" />
  </header>
{/if}

<style>
  header {
    position: relative;
  }

  /* header::before {
    content: '';
    position: absolute;
    height: 6%;
    width: 100%;
    bottom: -6%;
    background: linear-gradient(#fff, transparent);
    z-index: 1;
  } */
</style>
