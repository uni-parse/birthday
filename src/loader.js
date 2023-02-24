export { pendingLoader }
import { eventPromise, sleep, whilePending } from "./utilities"

const loaderCtx = document.createElement('div')
loaderCtx.className = 'loaderCtx'

const loader = document.createElement('div')
loader.className = 'loader'
loaderCtx.append(loader)

const transitionDuration = 1000
loaderCtx.style.transition = `all ${transitionDuration}ms`
loaderCtx.style.transform = 'scale(0)'


async function pendingLoader(promises, ctx) {
  await whilePending(
    promises,
    async () => {
      ctx.style.cursor = 'pointer'
      ctx.append(loaderCtx)
      await sleep(1) //💡fix: transition on append
      loaderCtx.style.transform = 'scale(1)'
      await sleep(transitionDuration)
      toPointListener(ctx)
    },
    async () => {
      loaderCtx.style.transform = 'scale(0)'
      await sleep(transitionDuration)
      loaderCtx.remove()
      ctx.style.cursor = ''
    }
  )
}

function toPointListener(ctx) {
  const { width, height } = loaderCtx.getBoundingClientRect()

  ctx.addEventListener('mousedown', async e => {
    handler(e)
    ctx.addEventListener('mousemove', handler)
    await eventPromise(ctx, 'mouseup')
    ctx.removeEventListener('mousemove', handler)
  })

  function handler(e) {
    loaderCtx.style.left = (e.clientX - width / 2) + 'px'
    loaderCtx.style.top = (e.clientY - height / 2) + 'px'
  }
}

