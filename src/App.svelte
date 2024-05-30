<script>
  import { onMount, afterUpdate } from 'svelte'
  import * as H from './hawk-modules'
  import Expand from './hawk-modules/expand/Expand.svelte'
  import ResponsiveWrapper from './hawk-components/ResponsiveWrapper.svelte'
  import Chatbot from './components/Chatbot.svelte'
  import Image from './hawk-components/Image.svelte'

  export let creative = config

  // Creative status
  let isRedirectAllowed = true
  let isCreativePreloaded = false
  let isCreativeStarted = false
  let hasMraid = null
  let isExpanded = false


  const assets = {}
  let font
  let creativeSize = creative.creativeSize
  let fontSize = 15

  onMount(async () => {
    await preloadAssets()
    if (creative.fonts) await preloadCustomFont()
    isCreativePreloaded = true
    initCreative()
    hasMraid = await H.mraidPreloader(_ => {
      H.makeCustomEvent('mraidPreloaderError', config.customEventMacro, true)
    })

  })

  async function preloadCustomFont() {
    for (const [key, value] of Object.entries(creative.fonts)) {
      font = new FontFace(
        key,
        `
          url(${creative.assetsFolder + value.url}) format('${value.format}')
        `,
      )
      await font.load()
      document.fonts.add(font)
    }
  }


  async function preloadAssets() {
    for (const [key, value] of Object.entries(creative.assets)) {
      assets[key] = { url: creative.assetsFolder + value }
    }
    if (creative.header?.url) assets.header = creative.header
    if (creative.footer?.url) assets.footer = creative.footer

    for (const [key, value] of Object.entries(creative.quiz.choices)) {
      // console.log(value.urlImage);
      if (value.urlImage) assets[key] = { url: value.urlImage }
      // console.log(key);
    }
    await H.mediasLoader(Object.values(assets))
  }

  function initCreative() {
    H.makeCustomEvent('creative-init', creative.customEventMacro, true)
    document.querySelector('#root').classList.add('loaded')
  }

  // Wait dom update after initCreative()
  afterUpdate(() => {
    if (isCreativeStarted || !isCreativePreloaded) return
    isCreativeStarted = true
    H.makeCustomEvent('creative-start', creative.customEventMacro, true)
  })

  function handleResize(e) {
    creativeSize = e.detail
    fontSize = e.detail.width / 23.4375 // for 16px with 375 screen
  }

  // Clicks and redirects
  function handleRedirect() {
    if (isRedirectAllowed) {
      isRedirectAllowed = false
      H.makeCustomEvent('click-redirect', creative.customEventMacro, true)
      window.open(creative.redirect, '_blank')
    }
  }
  function handleFakeHawkClick() {
    if (isRedirectAllowed) {
      isRedirectAllowed = false
      fetch(creative.hawkClick, {
        method: 'GET',
        headers: new Headers(),
        mode: 'no-cors',
        cache: 'default',
      })
    }
  }
  function handleCustomRedirect(event) {
    // handleFakeHawkClick()
    H.makeCustomEvent(`click-custom-redirect-${event.detail.nameForEvent}`, creative.customEventMacro, true)
    window.open(event.detail.url, '_blank')
  }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main
  class="creative center"
  class:is-loaded={isCreativeStarted}
  style="width: 100%; height: 100%; background-color: {creative.colors?.background || ''}; opacity: 0;"
  style:font-size="{fontSize}px">

  {#if creative.chatbotSize}
    <Expand
    isPreviewMode={creative.previewMode}
    {hasMraid}
    on:open={_ => (isExpanded = true)}
    on:close={_ => (isExpanded = false)}
    on:makeCustomEvent={event => {
      H.makeCustomEvent(event.detail.customEventName, creative.customEventMacro)
    }}>
      <div slot="firstFrame" class="first-frame-content">
        <ResponsiveWrapper
          size={creative.creativeSize}
          containerBackgroundColor={creative.colors?.backgroundContent || ''}
          resize={'fixed-ratio'}
          on:resize={handleResize}>
          <!-- <img src="{assets.preloadImg?.preloadUrl || assets.preloadImg?.url}" height="100%" width="100%" alt="" /> -->
          <Image mediaUrl={assets.preloadImg?.preloadUrl || assets.preloadImg?.url} height="{creative.creativeSize.height}px" width="{creative.creativeSize.width}px" />
        </ResponsiveWrapper>
      </div>

      <div slot="expandFrame" class="expand-content">
        <ResponsiveWrapper
          size={creative.chatbotSize}
          containerBackgroundColor={creative.colors?.backgroundContent || ''}
          resize={'fixed-ratio'}
          on:resize={handleResize}>
            <!-- Required to wait and use preloaded assets -->
            {#if isCreativePreloaded}
              <Chatbot {creative} {assets} on:redirectionfiche={handleCustomRedirect} on:clickHawk={handleFakeHawkClick} />
            {/if}
        </ResponsiveWrapper>
      </div>
    </Expand>
  {:else}
    <ResponsiveWrapper
      size={creative.creativeSize}
      containerBackgroundColor={creative.colors?.backgroundContent || ''}
      resize={'fixed-ratio'}
      hawkFooter={creative.hawkFooter}
      on:resize={handleResize}>
      <!-- Required to wait and use preloaded assets -->
      {#if isCreativePreloaded}
        <Chatbot {creative} {assets} on:redirectionfiche={handleCustomRedirect} on:clickHawk={handleFakeHawkClick} />
      {/if}
    </ResponsiveWrapper>
  {/if}
</main>

<style>
  :global(.center) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  :global(.full) {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .creative {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    /* When creative is loaded : */
    transition: opacity ease-out 200ms;
    /* font-family: 'custom', sans-serif; */
  }

  .creative.is-loaded {
    opacity: 1 !important;
  }

  .expand-content {
    width: 100%;
    height: 100%;
    /* border: 2px solid green; */
  }

</style>
