<script>
  import Image from '../hawk-components/Image.svelte'
  export let footer
</script>

{#if footer.preloadUrl || footer.url}
  <footer
    style="
  width: {footer?.width || '100'}%;
  height: {footer?.height || 'auto'}%;
  margin-top: {footer.top ?? '0'}%;
  margin-right: {footer.right ?? '0'}%;
  margin-bottom: {footer.bottom ?? '0'}%;
  margin-left: {footer.left ?? '0'}%;
  padding-top: {footer.paddingTop ?? '0'}%;
  padding-right: {footer.paddingRight ?? '0'}%;
  padding-bottom: {footer.paddingBottom ?? '0'}%;
  padding-left: {footer.paddingLeft ?? '0'}%;">
    <Image
      mediaUrl={footer.preloadUrl || footer.url}
      height="{footer.heightImg || '100'}%"
      width="{footer.widthImg || '100'}%" />
  </footer>
{/if}

<style>
  footer {
  }
</style>
