var makeCustomEvent = (name, url, uniq = false, ccd) => {
  var findTemplateName = new RegExp(/(templateCustomEvent)/gm)
  var replaced = url.replace(findTemplateName, name)
  if (!document.getElementById(name)) {
    var pixel = document.createElement('img')
    pixel.id = uniq ? name : `${name}_${new Date().getTime()}`
    pixel.src = ccd ? replaced + '&ccd=' + ccd : replaced
    pixel.style.position = 'absolute'
    pixel.style.opacity = '0'
    pixel.style.display = 'none'
    pixel.setAttribute('hawkTime', `${new Date().getTime()}`)
    document.body.appendChild(pixel)
    console.log(`EVENT : ${name} ${new Date().toLocaleString()}`)
    return pixel
  }
}

var bodyBuilder = () => {
  var metaViewport = document.createElement('meta')
  metaViewport.setAttribute('name', 'viewport')
  metaViewport.setAttribute('content', 'width=device-width, initial-scale=1')

  var metaCharset = document.createElement('meta')
  metaCharset.setAttribute('http-equiv', 'Content-Type')
  metaCharset.setAttribute('charset', 'utf-8')

  var title = document.createElement('title')
  title.innerText = 'Hawk Creative'

  document.head.appendChild(title)
  document.head.appendChild(metaViewport)
  document.head.appendChild(metaCharset)

  document.documentElement.style.width = '100%'
  document.documentElement.style.height = '100%'
  document.documentElement.style.overflow = 'hidden'

  document.head.insertAdjacentHTML(
    'beforeend',
    `<style>
    html, body { width: 100%; height: 100%; }
    #root { position: absolute; z-index: 2; left: 0; top: 0; bottom: 0; right: 0; }
  </style>`,
  )

  if (config && config.colors && config.colors.background) {
    document.documentElement.style.setProperty('--color-background', config.colors.background)
  }

  if (config && config.colors && config.colors.loader) {
    document.documentElement.style.setProperty('--color-loader', config.colors.loader)
  }

  var globalStylesheet = document.createElement('link')
  globalStylesheet.setAttribute('rel', 'stylesheet')
  globalStylesheet.setAttribute('href', './build/global.css')
  document.head.appendChild(globalStylesheet)

  var bundleStylesheet = document.createElement('link')
  bundleStylesheet.setAttribute('rel', 'stylesheet')
  bundleStylesheet.setAttribute('href', './build/bundle.css')
  document.head.appendChild(bundleStylesheet)

  if (config && config.customEventMacro) {
    globalStylesheet.onerror = function () {
      makeCustomEvent('error_load_global_css', config.customEventMacro, true)
    }
    bundleStylesheet.onerror = function () {
      makeCustomEvent('error_load_bundle_css', config.customEventMacro, true)
    }
  }
}

bodyBuilder()
