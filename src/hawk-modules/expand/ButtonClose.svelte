<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  function handleClick() {
    dispatch('click')
  }
</script>

<div class="button-close" on:click={handleClick} />

<style>
  .button-close {
    position: absolute;
    z-index: 1000;
    right: 5px;
    top: 5px;
    width: 20px;
    height: 20px;
  }

  .button-close:before,
  .button-close:after {
    position: absolute;
    left: 10px;
    content: ' ';
    height: 20px;
    width: 2px;
    background-color: #000;
  }
  .button-close:before {
    transform: rotate(45deg);
  }
  .button-close:after {
    transform: rotate(-45deg);
  }
</style>
