<script>
  import { createEventDispatcher } from 'svelte'

  export let resizeType = 'responsive' // fixed-ratio, fixed or responsive
  export let wrapperBackgroundColor = null
  export let containerBackgroundColor = null
  export let originalSize = {
    width: null,
    height: null,
  }

  let wrapperSize = {
    width: null,
    height: null,
  }
  let containerSize = {
    width: '100%',
    height: '100%',
  }

  $: resizeCreative(wrapperSize)

  $: console.log('wrapperSize', wrapperSize)

  const dispatch = createEventDispatcher()

  function onClick(event) {
    dispatch('click', event)
  }

  function resizeCreative(wrapperSize) {
    if (
      resizeType === 'fixed-ratio' &&
      wrapperSize.width &&
      wrapperSize.height &&
      originalSize.width &&
      originalSize.height
    ) {
      const { width, height } = calculateSize(wrapperSize, originalSize)
      containerSize = {
        width: `${width}px`,
        height: `${height}px`,
      }
      dispatch('resize', { width, height })
    } else if ((resizeType === 'fixed' || resizeType === 'fixed-ratio') && originalSize.width && originalSize.height) {
      containerSize = {
        width: `${originalSize.width}px`,
        height: `${originalSize.height}px`,
      }
      dispatch('resize', { width: originalSize.width, height: originalSize.height })
    } else {
      dispatch('resize', { ...wrapperSize })
    }
  }

  function calculateSize(wrapperSize, originalSize) {
    const creativeRatio = wrapperSize.width / wrapperSize.height
    const assetsRatio = originalSize.width / originalSize.height
    return creativeRatio > assetsRatio
      ? {
          width: Math.round(wrapperSize.height * assetsRatio),
          height: wrapperSize.height,
          x: Math.round(-(wrapperSize.height * assetsRatio - wrapperSize.width) / 2),
          y: 0,
        }
      : {
          width: wrapperSize.width,
          height: Math.round(wrapperSize.width / assetsRatio),
          x: 0,
          y: Math.round(-(wrapperSize.width / assetsRatio - wrapperSize.height) / 2),
        }
  }
</script>

<div
  class="wrapper"
  style="opacity: 0; width: 100%, height: 100%"
  style:background-color={wrapperBackgroundColor || ''}
  bind:clientWidth={wrapperSize.width}
  bind:clientHeight={wrapperSize.height}
  on:click={onClick}>
  <div
    class="container"
    style:width={containerSize.width}
    style:height={containerSize.height}
    style:background-color={containerBackgroundColor || ''}
    data-testid="container">
    <slot />
  </div>
</div>

<style>
  .wrapper {
    width: 100%;
    height: 100%;
    margin: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* When creative is loaded : */
    transition: ease-out 200ms;
    opacity: 1 !important;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    color: #000000;
  }

  .container {
    position: relative;
    overflow: hidden;
  }
</style>
