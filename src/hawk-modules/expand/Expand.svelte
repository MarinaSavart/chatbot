<script>
  import { onMount, createEventDispatcher } from 'svelte'

  import ButtonClose from './ButtonClose.svelte'

  export let isExpandMode = true
  export let isPreviewMode = false
  export let hasMraid = false

  let isExpandModeMraid = false
  let isExpanded = false

  const dispatch = createEventDispatcher()

  onMount(async () => {
    console.log('mount expand')
    if (isExpandMode && hasMraid) {
      activeMraidExpand()
    }
  })

  $: activeMraidExpand(hasMraid)

  function handleMakeCustomEvent(customEventName) {
    dispatch('makeCustomEvent', { customEventName })
  }

  function activeMraidExpand(hasMraid) {
    if (isExpandMode && !isExpandModeMraid && hasMraid && window.mraid) {
      isExpandModeMraid = true
      window.mraid.addEventListener('stateChange', state => {
        if (state === 'expanded') {
          isExpanded = true
          handleMakeCustomEvent('expandOpened')
        } else if (state === 'default') {
          isExpanded = false
          handleMakeCustomEvent('expandClosed')
        }
      })
    }
  }

  function handleExpand() {
    if (isExpandMode && hasMraid && window.mraid) {
      window.mraid.expand()
      dispatch('open')
    } else if (isExpandMode && isPreviewMode) {
      isExpanded = true
      dispatch('open')
      handleMakeCustomEvent('expandPreviewModeOpened')
    } else {
      handleMakeCustomEvent('redirectDegradedExpandMode')
      dispatch('redirect')
    }
  }

  function handleCloseExpandPreviewMode() {
    if (isPreviewMode) {
      isExpanded = false
      dispatch('close')
      handleMakeCustomEvent('expandPreviewModeClosed')
    }
  }
</script>

<!-- <div class="debug">
  debug : <br />
  isExpandMode : {isExpandMode} <br />
  isPreviewMode : {isPreviewMode} <br />
  hasMraid : {hasMraid} <br />
  isExpandModeMraid : {isExpandModeMraid} <br />
  isExpanded : {isExpanded} <br />
</div> -->

{#if !isExpanded}
  <div class="frame first-frame" class:is-visible={!isExpanded} on:click={handleExpand}>
    <slot name="firstFrame">
      <span class="missing">missing first frame</span>
    </slot>
  </div>
{:else}
  <div class="frame expand-frame" class:is-visible={isExpanded}>
    {#if isPreviewMode}
      <ButtonClose on:click={handleCloseExpandPreviewMode} />
    {/if}
    <slot name="expandFrame">
      <span class="missing">missing expand frame</span>
    </slot>
  </div>
{/if}

<style>
  .frame {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .first-frame {
    /* display: none; */
    background: transparent;
  }

  .expand-frame {
    /* display: none; */
    background: transparent;
  }

  /* .is-visible {
    display: block;
  } */

  .missing {
    border: 2px solid red;
  }

  .debug {
    position: absolute;
    z-index: 10;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 1rem;
    font-size: 0.8rem;
    opacity: 0.5;
  }
</style>
