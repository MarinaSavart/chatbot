<!--
  @component
  Creates a wrapper and a container with responsive, fixed-ratio, or fixed size
  depending on the parent element size and the initial size given in params

  @property size - Initial size for the container
  @property resize - Resize method for the container
  @property wrapperBackgroundColor - Background color for the wrapper element
  @property containerBackgroundColor - Background color for the child container element
  @event on:resize - Return container size on resize event detail
  @event on:click - On click event on wrapper element
-->
<script>
  import { createEventDispatcher } from 'svelte'
  import HawkFooter from './HawkFooter.svelte'

  /**
   * Initial size for the container
   * @type {{width: number, height: number}}
   * @property {Object} size
   * @property {number} size.width
   * @property {number} size.height
   * @default null
   */
  export let size

  /**
   * Resize method for the container
   * @type {"fixed-ratio" | "fixed" | "responsive"}
   * @default fixed-ratio
   */
  export let resize = 'fixed-ratio'

  /**
   * Background color for the wrapper element
   * @type {string | null}
   * @property color
   * @default null
   */
  export let wrapperBackgroundColor = null

  /**
   * Background color for the container element
   * @type {string | null}
   * @property color
   * @default null
   */
  export let containerBackgroundColor = null

  /**
   * Hawk footer
   * @type {string | null}
   * @property color
   * @default null
   */
  export let hawkFooter = null

  let wrapperSize = {
    width: 0,
    height: 0,
  }

  let containerSize = {
    width: 0,
    height: 0,
  }

  let containerCssSize = {
    width: '100%',
    height: '100%',
  }

  let footerHeight = 0

  $: resizeCreative(wrapperSize)

  const dispatch = createEventDispatcher()

  /**
   * Handle click on wrapper
   */
  function onClick(event) {
    // Dispatch click event on wrapper element
    dispatch('click', event)
  }

  /**
   * Handle resize wrapper
   */
  function onResize(size) {
    // Dispatch resize event with size of container object
    dispatch('resize', size)
  }

  /**
   * Force resize wrapper
   */
  export function forceResize() {
    resizeCreative(wrapperSize)
  }

  function resizeCreative(wrapperSize) {
    if (!wrapperSize.width || !wrapperSize.height) return
    let newWidth, newHeight
    if (resize === 'fixed-ratio' && wrapperSize.width && wrapperSize.height && size?.width && size?.height) {
      const { width, height } = calculateSize(wrapperSize, size)
      newWidth = width
      newHeight = height
    } else if (resize === 'fixed' && size.width && size.height) {
      newWidth = size.width
      newHeight = size.height
    } else {
      newWidth = wrapperSize.width
      newHeight = wrapperSize.height
    }
    if (footerHeight > 0) newHeight -= footerHeight
    if (containerSize.width == newWidth && containerSize.height == newHeight) return
    containerSize = {
      width: newWidth,
      height: newHeight,
    }
    containerCssSize = {
      width: `${newWidth}px`,
      height: `${newHeight}px`,
    }
    onResize({ width: newWidth, height: newHeight })
  }

  function calculateSize(wrapperSize, size) {
    const wrapperRatio = wrapperSize.width / wrapperSize.height
    const containerRatio = size.width / size.height
    return wrapperRatio > containerRatio
      ? {
          width: Math.round(wrapperSize.height * containerRatio),
          height: wrapperSize.height,
        }
      : {
          width: wrapperSize.width,
          height: Math.round(wrapperSize.width / containerRatio),
        }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="wrapper"
  style="width: 100%; height: 100%;"
  style:background-color={wrapperBackgroundColor}
  bind:clientWidth={wrapperSize.width}
  bind:clientHeight={wrapperSize.height}
  on:click={onClick}>
  <div
    class="container"
    style:width={containerCssSize.width}
    style:height={containerCssSize.height}
    style:background-color={containerBackgroundColor}>
    <slot />
  </div>
  <HawkFooter {hawkFooter} bind:footerHeight width={containerCssSize.width} />
</div>

<style>
  .wrapper {
    margin: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .container {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
