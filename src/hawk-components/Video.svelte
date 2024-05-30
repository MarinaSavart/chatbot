<svelte:options accessors />

<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import * as H from '../hawk-modules'

  const dispatch = createEventDispatcher()

  const assets = {
    playBig: 'https://format.tabmo.io/assets/icon/play-button.svg',
    loading: 'https://format.tabmo.io/assets/icon/loaderRing.svg',
    closeButtonSVG: 'https://format.tabmo.io/assets/icon/closeButton.svg',
    appBkg: 'https://format.tabmo.io/assets/icon/appBkg.png',
    soundOn: 'https://format.tabmo.io/assets/icon/soundOn-2.svg',
    soundOff: 'https://format.tabmo.io/assets/icon/soundOff-2.svg',
    repload: 'https://format.tabmo.io/assets/icon/reload-2.svg',
    play: 'https://format.tabmo.io/assets/icon/play-2.svg',
    pause: 'https://format.tabmo.io/assets/icon/pause-2.svg',
    replay: 'https://format.tabmo.io/assets/icon/replay-2.svg',
  }

  export let mediaUrl
  export let trackerUrl = null
  export let enableEvents = null
  export let customEventName = null
  export let canPause = false
  export let canRestart = false
  export let loop = false
  export let soundControl = true
  export let fit = 'contain'
  export let autoplay = true
  export let poster = false
  export let customEvents = null
  export let className = ''

  export let time = null

  let videoElement, duration
  let muted = true
  let ended = false
  let paused = !autoplay || (!muted && autoplay)

  const videoEvents = [
    {
      name: 'start',
      time: 0.01,
      done: false,
    },
    {
      name: 'firstQuartile',
      time: 0.25,
      done: false,
    },
    {
      name: 'midpoint',
      time: 0.5,
      done: false,
    },
    {
      name: 'thirdQuartile',
      time: 0.75,
      done: false,
    },
    {
      name: 'complete',
      time: 0.99,
      done: false,
    },
  ]

  onMount(async () => {
    // force load for safari IOS
    videoElement.load()
  })

  $: timeUpdate(time)

  function timeUpdate(time) {
    if (ended) {
      dispatch('ended')
    }

    if (customEvents) {
      customEvents.forEach(event => {
        if (!event.done && time >= event.time) {
          event.done = true
          dispatch('customEvent', { name: event.name })
        }
      })
    }

    if (!enableEvents || !trackerUrl) return
    videoEvents.forEach(event => {
      if (!event.done && time >= duration * event.time) {
        event.done = true
        H.makeCustomEvent(setEventName(event.name), trackerUrl, true)
      }
    })
  }

  function setEventName(name) {
    return customEventName ? `${customEventName}_${name}` : name
  }

  export function pause() {
    videoElement.pause()
  }

  export function play() {
    videoElement.play()
  }

  export function restart() {
    videoElement.currentTime = 0
    videoElement.play()
  }

  export function rewind() {
    videoElement.pause()
    videoElement.currentTime = 0
  }

  export function playPause() {
    if ((ended && !loop && canRestart) || paused) {
      play()
      return
    }
    if (!canPause) return
    pause()
  }

  export function toggleSound() {
    muted = !muted
    if (enableEvents && trackerUrl) {
      H.makeCustomEvent(setEventName(muted ? 'mute' : 'unmute'), trackerUrl)
    }
  }
</script>

<div class="video-player {fit} {className}">
  <!-- svelte-ignore a11y-media-has-caption -->
  <video
    bind:this={videoElement}
    {autoplay}
    {loop}
    playsinline
    class="video"
    poster={poster || ''}
    bind:currentTime={time}
    bind:duration
    bind:muted
    bind:ended
    bind:paused>
    <source src={mediaUrl} />
  </video>

  {#if canRestart && ended && !loop}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click|stopPropagation={play} class="button button-play">
      <img src={assets.replay} alt="replay" />
    </div>
  {/if}

  {#if canPause && !ended}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click|stopPropagation={playPause} class="button button-play">
      {#if paused}
        <img src={assets.play} alt="play" />
      {:else}
        <img src={assets.pause} alt="pause" />
      {/if}
    </div>
  {/if}

  {#if (soundControl && !ended) || (soundControl && canRestart)}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click|stopPropagation={toggleSound} class="button button-sound">
      {#if muted}
        <img src={assets.soundOff} alt="soundOff" />
      {:else}
        <img src={assets.soundOn} alt="soundOn" />
      {/if}
    </div>
  {/if}
</div>

<style>
  .video-player {
    position: relative;
    /* opacity: 0;
      transition: opacity ease 200ms; */
  }
  .video-player.loaded {
    opacity: 1;
  }

  .video {
    display: block;
    max-width: 100%;
    max-height: 100%;
  }

  .stretch,
  .crop,
  .stretch .video,
  .crop .video {
    width: 100%;
    height: 100%;
  }

  .contain .video {
    object-fit: contain;
  }

  .stretch .video {
    object-fit: fill;
  }

  .crop .video {
    object-fit: cover;
  }

  .controls {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
  }

  .button {
    position: absolute;
    width: 36px;
    height: 36px;
    width: clamp(28px, min(12vw, 12vh), 36px);
    height: clamp(28px, min(12vw, 12vh), 36px);
    padding: 4px;
  }

  .button-play {
    left: 8px;
    bottom: 8px;
  }

  .button-sound {
    right: 8px;
    bottom: 8px;
  }
</style>
