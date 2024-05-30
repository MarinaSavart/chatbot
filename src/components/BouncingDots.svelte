<script>
  export let color = 'red'
  export let size = '8px'
</script>

<div class="container" style="--color: {color}; --size: {size}">
  <div class="ball" />
  <div class="ball" />
  <div class="ball" />
</div>

<style>
  .container {
    display: flex;
    padding: calc(var(--size) * 0.75);
    height: 1.25em;
  }
  .ball {
    display: block;
    width: var(--size);
    height: var(--size);
    background: var(--color);
    border-radius: 50%;
    animation: bounce 0.8s infinite ease-in-out;
  }
  .ball:not(:first-child) {
    margin-left: calc(var(--size) * 0.6);
  }
  .ball:nth-child(2) {
    animation-delay: 0.2s;
  }
  .ball:nth-child(3) {
    animation-delay: 0.4s;
  }
  @keyframes bounce {
    0% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(0, calc(var(--size) * -0.5));
      opacity: 0.2;
    }
    40% {
      transform: translate(0, calc(var(--size) * 0.2));
    }
    50% {
      transform: translate(0, 0);
    }
  }
</style>
