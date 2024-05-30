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
