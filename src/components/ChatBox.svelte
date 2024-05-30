<script>
  import { onMount, createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  import gsap from 'gsap'
  import BouncingDots from './BouncingDots.svelte'

  export let question
  export let creative

  // console.log(creative);

  let dots = creative.dots
  let questionStyle = creative.question
  let textStyle = creative.text
  let responseStyle = creative.response
  let reponseSelected = creative.reponseSelected
  // console.log(reponseSelected);

  let dotSize = dots?.dotSize ?? 6
  let themEl = null
  let responsesEl = null

  function handleClick(question, response, event) {
    dispatch('respond', { question, response })
    const box = event.target
    const boxes = responsesEl.querySelectorAll('.box')
    const unselectedBoxes = [...boxes].filter(box => box !== event.target)
    gsap.to(unselectedBoxes, { autoAlpha: 0, duration: 0.15 })
    gsap.to(
      box,
      {
        y: `-${box.offsetTop}`,
        duration: 0.35,
        ease: 'power2.inOut',
        onComplete: function () {
          box.style.transform = 'none'
          unselectedBoxes.forEach(box => (box.style.display = 'none'))
          dispatch('next', { response })
        },
      },
      '>',
    )
  }

  onMount(() => {
    gsap.to(themEl, { autoAlpha: 1, y: 0, duration: 0.5 })
    gsap.to(themEl.querySelector('.dots'), { autoAlpha: 0, duration: 0.2, delay: 0.6 }, '>')
    // gsap.to(themEl.querySelector('.dots'), { autoAlpha: 0, duration: 0.2, delay: 600000 }, '>')
    gsap.to(
      themEl.querySelector('.background'),
      {
        width: '100%',
        height: '100%',
        duration: 0.4,
        ease: 'power3.inOut',
        onComplete: function () {
          dispatch('update-scroll')
        },
      },
      '>',
    )
    gsap.to(themEl.querySelector('.text'), { autoAlpha: 1, duration: 0.2 }, '-=0.1')
    gsap.to(
      responsesEl.querySelectorAll('.box'),
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.075,
        delay: 0.5,
      },
      '-=0.1',
    )

    gsap.to('.selected', {
      color: reponseSelected?.color ?? '#fff',
      borderColor: reponseSelected?.borderColor ?? '#b9b9b9',
      backgroundColor: reponseSelected?.backgroundColor ?? '#b9b9b9',
      duration: 0.2,
    })
  })
</script>

<div
  class="box question"
  bind:this={themEl}
  class:as-response={question.hasResponse}
  style="--dot-size: {dotSize}px; max-width: 65%;">
  <div class="dots">
    <BouncingDots color={dots?.dotColor ?? '#fff'} size={`${dotSize}px`} />
  </div>
  <div
    class="text"
    style="
    font-family: 'text', 'question', sans-serif;
    color: {questionStyle?.color ?? '#fff'};
    font-weight: {textStyle?.fontWeight ?? '100'};
    font-size: {textStyle?.fontSize ?? '0.85'}em;
    padding-top: {questionStyle?.paddingTop ?? '3'}%;
    padding-bottom: {questionStyle?.paddingBottom ?? '3'}%;
    padding-right: {questionStyle?.paddingRight ?? '6'}%;
    padding-left: {questionStyle?.paddingLeft ?? '6'}%;">
    {question.question}
  </div>
  <div
    class="background"
    style="
    border-bottom-left-radius: {questionStyle?.borderRadiusBottomLeft ?? '0'}px;
    border-bottom-right-radius: {questionStyle?.borderRadiusBottomRight ?? '19'}px;
    border-top-left-radius: {questionStyle?.borderRadiusTopLeft ?? '19'}px;
    border-top-right-radius: {questionStyle?.borderRadiusTopRight ?? '19'}px;
    background-color: {questionStyle?.backgroundColor ?? '#024d82'};" />
</div>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="container-response" bind:this={responsesEl} class:as-response={question.hasResponse}>
  {#each question.responses as response}
    <div
      class="box response"
      class:selected={response.isSelected}
      on:click={event => handleClick(question, response, event)}
      style="
      font-family: 'text', 'response', sans-serif;
      font-weight: {textStyle?.fontWeight ?? '100'};
      font-size: {textStyle?.fontSize ?? '0.85'}em;
      padding-top: {responseStyle?.paddingTop ?? '2'}%;
      padding-bottom: {responseStyle?.paddingBottom ?? '2'}%;
      padding-right: {responseStyle?.paddingRight ?? '4'}%;
      padding-left: {responseStyle?.paddingLeft ?? '4'}%;
      border-bottom-left-radius: {responseStyle?.borderRadiusBottomLeft ?? '19'}px;
      border-bottom-right-radius: {responseStyle?.borderRadiusBottomRight ?? '0'}px;
      border-top-left-radius: {responseStyle?.borderRadiusTopLeft ?? '19'}px;
      border-top-right-radius: {responseStyle?.borderRadiusTopRight ?? '19'}px;
      color: {responseStyle?.color ?? '#024d82'};
      background-color: {responseStyle?.backgroundColor ?? '#fff'};
      border: 1px solid {responseStyle?.borderColor ?? '#024d82'};">
      {response.name}
    </div>
  {/each}
</div>

<style>
  .box {
    display: block;
    position: relative;
    z-index: 2;
    font-family: helvetica;
    line-height: 1.25em;
    transform: translateY(-1em);
  }

  /* Them */

  .question {
    border-top-left-radius: 0px;
    align-self: flex-start;
    /* max-width: 65%; */
    background: none;
    margin-bottom: 1em;
  }

  .question .background {
    position: absolute;
    z-index: -1;
    inset: 0;
    /* border-radius: 19px;
    border-bottom-left-radius: 0px; 
    background-color: #024d82; */
    width: calc(var(--dot-size) * 9);
    height: calc(1.25em + 1em);
  }

  .dots {
    padding: 0.7em 0.5em;
  }

  .text {
    display: inline-block;
    opacity: 0;
    /* color: #fff;
    font-weight: 100;
    font-size: 0.85em;
    padding: 0.7em 0.75em; */
  }

  .dots {
    position: absolute;
  }

  /* Responses */

  .container-response {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 0.5em;
  }

  .container-response.as-response {
    pointer-events: none;
  }

  .response {
    /* font-weight: 100;
    font-size: 0.85em;
    color: #024d82;
    padding: 0.5em 0.75em;
    border-radius: 19px;
    border-bottom-right-radius: 0px;
    background-color: rgb(255, 255, 255);
    border: 1px solid #024d82; */

    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    opacity: 0;
    max-width: 65%;
    margin-bottom: 0.5em;
  }

  /* .as-response .response{
    transition: all linear 250ms 250ms;
    background-color: #b9b9b9;
    opacity: 0.7 !important;
  } */
  /* .selected {
    transition: backgroundColor linear 250ms 250ms;
    background-color: #b9b9b9;
    color: #fff;
    border-color: #b9b9b9;
  } */
</style>
