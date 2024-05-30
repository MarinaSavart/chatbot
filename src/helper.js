/**
 * Builds a custom event
 * @param name The name of the custom event
 * @param url The target URL of the event tracker for that event
 * @param uniq Do not trigger more that once
 * @param ccd CreativeCustomData - event metadata to send along
 */
export const makeCustomEvent = (name, url, uniq = false, ccd) => {
  const findTemplateName = new RegExp(/(templateCustomEvent)/gm)
  const replaced = url.replace(findTemplateName, name)
  if (!document.getElementById(name)) {
    const pixel = document.createElement('img')
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

/**
 * Camelize string
 * @param {string} str string to camelize
 * @returns {string}
 */
export const camelize = str => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase()
    })
    .replace(/\s+/g, '')
}

/**
 * Calculate creative container size depend on assets ratio
 * @param {SizesObject} creativeSize real size of creative
 * @param {SizesObject} assetsSize size fixed for assets
 * @returns {SizesObject}
 */
export const calculateRootSize = (creativeSize, assetsSize) => {
  const creativeRatio = creativeSize.width / creativeSize.height
  const assetsRatio = assetsSize.width / assetsSize.height
  return creativeRatio > assetsRatio
    ? {
        width: Math.round(creativeSize.height * assetsRatio),
        height: creativeSize.height,
        x: Math.round(-(creativeSize.height * assetsRatio - creativeSize.width) / 2),
        y: 0,
      }
    : {
        width: creativeSize.width,
        height: Math.round(creativeSize.width / assetsRatio),
        x: 0,
        y: Math.round(-(creativeSize.width / assetsRatio - creativeSize.height) / 2),
      }
}
