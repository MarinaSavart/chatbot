import App from './App.svelte'

const buildCreative = () => {
  if (window.buildHawkLogs) window.buildHawkLogs()
  console.log('buildCreative')
  const root = document.createElement('div')
  root.id = 'root'
  document.body.appendChild(root)

  new App({
    target: root,
  })
}

if (document && (document.readyState == 'complete' || document.readyState == 'interactive')) {
  buildCreative()
} else if (document) {
  document.addEventListener('DOMContentLoaded', buildCreative)
} else {
  window.addEventListener('load', buildCreative)
}
