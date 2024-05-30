<script>
  export let mediaUrl
  export let fit = 'contain'
  export let width = '100%'
  export let height = '100%'
  export let className = ''
</script>

<img src={mediaUrl} style:width style:height alt="" class="img {fit} {className}" />

<style>
  .img {
    display: block;
  }

  .stretch {
    object-fit: fill;
  }

  .contain {
    object-fit: contain;
  }

  .crop {
    object-fit: cover;
  }
</style>
