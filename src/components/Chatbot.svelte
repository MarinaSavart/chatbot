<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import * as H from '../hawk-modules'
  import ChatBox from './ChatBox.svelte'
  import Footer from './Footer.svelte'
  import Header from './Header.svelte'
  import Image from '../hawk-components/Image.svelte'
  import { fade } from 'svelte/transition'

  export let creative
  export let assets

  let header = creative?.header || false
  let footer = creative?.footer || false

  const dispatch = createEventDispatcher()

  let data = creative.quiz

  let backgroundChatbot = assets.backgroundChatbot?.url
    ? `url(${assets.backgroundChatbot?.preloadUrl || assets.backgroundChatbot?.url})`
    : creative.colors?.backgroundContainerChatbot || ''

  let imgUrl = ''
  let imgFinal = false
  let choices = data.choices
  let arrayData = []

  const scroll = {
    containerHeight: null,
    contentHeight: null,
    contentTop: 0,
  }

  onMount(() => {
    setTimeout(() => {
      const { firstquestion, children } = data.initial
      buildNextQuestion(firstquestion, children)
    }, 500)
  })

  function buildNextQuestion(question, children) {
    let childrensData = []

    children.forEach(category => {
      for (const property in choices) {
        if (property === category) {
          childrensData = [...childrensData, choices[category]]
        }
      }
    })
    const newChildren = {
      question,
      responses: [...childrensData],
    }
    arrayData = [...arrayData, newChildren]
  }

  function handleResponse(event) {
    dispatch('clickHawk')
    const { question, response } = event.detail
    response.isSelected = true
    question.hasResponse = true
    arrayData = [...arrayData]
  }

  function handleNextQuestion(event) {
    const { response } = event.detail
    if (response.nextQuestion && response.children) {
      // console.log('GO to next question')
      if (response.urlImage) {
        imgFinal = true
        imgUrl = assets[response.event]
      }

      H.makeCustomEvent(`response-${response.event}`, creative.customEventMacro, true)
      buildNextQuestion(response.nextQuestion, response.children)
    } else {
      // console.log('END and redirect')
      H.makeCustomEvent(`result-${response.event}`, creative.customEventMacro, true)
      dispatch('redirectionfiche', {
        url: response.redirect,
        nameForEvent: response.event,
      })
    }
  }

  function handleUpdateScroll() {
    const newScroll = scroll.contentHeight - scroll.containerHeight
    if (newScroll > 0 && newScroll > scroll.contentTop) scroll.contentTop = newScroll
  }
</script>

<div class="chatbot" style="background: {backgroundChatbot};">
  <Header {header} />

  {#if imgFinal}
    <div class="imgFinal" in:fade={{ delay: 800 }}>
      <Image mediaUrl={imgUrl.preloadUrl || imgUrl.url} height="auto" width="{header.widthImg || '100'}%" />
    </div>
  {/if}

  <div
    class="container-chatbot"
    style="
    background: {creative.colors?.backgroundContainerChatbot || ''};
    width: {creative.chatbot?.width ?? 'auto'}%;
    height: {creative.chatbot?.height ?? '56'}%;
    margin-top: {creative.chatbot?.top ?? '0'}%;
    margin-right: {creative.chatbot?.right ?? '0'}%;
    margin-bottom: {creative.chatbot?.bottom ?? '0'}%;
    margin-left: {creative.chatbot?.left ?? '0'}%;
    padding-top: {creative.chatbot?.paddingTop ?? '4'}%;
    padding-right: {creative.chatbot?.paddingRight ?? '4'}%;
    padding-bottom: {creative.chatbot?.paddingBottom ?? ''}%;
    padding-left: {creative.chatbot?.paddingLeft ?? '4'}%;">
    <div class="scroll-chatbot" bind:clientHeight={scroll.containerHeight}>
      <div
        class="content-chatbot"
        bind:offsetHeight={scroll.contentHeight}
        style="transform: translateY(-{scroll.contentTop}px);">
        {#each arrayData as question}
          <ChatBox
            {creative}
            {question}
            on:respond={handleResponse}
            on:next={handleNextQuestion}
            on:update-scroll={handleUpdateScroll} />
        {/each}
      </div>
    </div>
  </div>

  <Footer {footer} />
</div>

<style>
  .chatbot {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .container-chatbot {
    flex-grow: 1;
    overflow: hidden;
    position: relative;
  }

  .scroll-chatbot {
    height: 100%;
  }

  .content-chatbot {
    display: flex;
    flex-direction: column;
    transition: transform 0.75s ease-in-out;
  }

  .imgFinal {
    position: absolute;
    z-index: 1000;
    top: 0%;
    left: 0%;
    transform: translate(0%, 0%);
  }

  /* .imgFinal::before {
    content: '';
    position: absolute;
    height: 6%;
    width: 100%;
    bottom: -6%;
    background: linear-gradient(#fff, transparent);
  } */
</style>
