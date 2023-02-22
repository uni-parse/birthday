export { loading }
import { sleep, whilePending } from "./utilities"

const loaderCtx = document.createElement('div')
loaderCtx.className = 'loaderCtx'

const loader = document.createElement('div')
loader.className = 'loader'
loaderCtx.append(loader)

const transitionDuration = 1000
loaderCtx.style.transition = `all ${transitionDuration}ms`
loaderCtx.style.transform = 'scale(0)'


async function loading(promises, ctx) {
  await whilePending(
    promises,
    async () => {
      ctx.style.position = 'relative'
      ctx.style.cursor = 'progress'
      ctx.append(loaderCtx)
      await sleep(0)//💡fix: transition on append
      toPointListener(ctx)
      loaderCtx.style.transform = 'scale(1)'
      await sleep(transitionDuration)
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
  ctx.addEventListener('click', e => {
    loaderCtx.style.left = (e.clientX - width / 2) + 'px'
    loaderCtx.style.top = (e.clientY - height / 2) + 'px'
  })
}