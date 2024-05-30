<script>
  export let isExpanded = false
  export let onClick
</script>

<div class="first-screen full" class:is-expanded={isExpanded} on:click={onClick}>First screen</div>

<style>
  .first-screen {
    display: block;
    background: darkgrey;
  }

  .is-expanded {
    display: none;
  }
</style>
