const mraid = window.mraid

const setStateCreative = () => {
  const mraidVersion = mraid.getVersion()
  return mraidVersion
}

const isViewableCreative = async () => {
  if (mraid.isViewable()) {
    console.log('HAWK LOG : MRAID already isViewable')
    return setStateCreative()
  } else {
    return new Promise(function (resolve) {
      mraid.addEventListener('viewableChange', function ifViewable(viewable) {
        if (viewable) {
          console.log('HAWK LOG : MRAID now isViewable')
          mraid.removeEventListener('viewableChange', ifViewable)
          resolve(setStateCreative())
        }
      })
    })
  }
}

export async function mraidLoader() {
  if (mraid) {
    if (mraid.getState() === 'default') {
      console.log('HAWK LOG : MRAID state default')
      return await isViewableCreative()
    } else {
      console.log('HAWK LOG : MRAID state loading')
      return mraid.getState() === 'loading'
        ? new Promise(resolve =>
            mraid.addEventListener('ready', async () => {
              console.log('HAWK LOG : MRAID ready')
              resolve(await isViewableCreative())
            }),
          )
        : await isViewableCreative()
    }
  } else {
    return false
  }
}

export async function mraidPreloader(cb) {
  // console.log('mraidPreloader', window)
  if (mraid !== undefined) {
    return await mraidLoader()
  } else {
    cb()
    return false
  }
}
