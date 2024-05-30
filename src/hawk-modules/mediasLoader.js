const mediaLoader = media => {
  return new Promise((resolve, reject) => {
    fetch(media.url, {
      mode: 'cors',
    })
      .then(response => {
        if (response.status === 200) {
          response.blob().then(blob => {
            media.preloadUrl = URL.createObjectURL(blob)
            resolve(media)
          })
        }
      })
      .catch(err => reject(err))
  })
}

export const mediasLoader = async (arr, callback) => {
  return await Promise.all(arr.map(media => mediaLoader(media)))
    .then(() => {
      if (callback) callback()
    })
    .catch(err => console.error('Error preload medias', err))
}
