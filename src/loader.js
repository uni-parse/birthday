import { sleep, whilePending } from "./utilities"
export { loaderCtx, loading }

const loaderCtx = document.createElement('div')
loaderCtx.className = 'loaderCtx'

const loader = document.createElement('div')
loader.className = 'loader'
loaderCtx.append(loader)

const loaderTransitionDuration = 1000
loaderCtx.style.transition =
  `transform ${loaderTransitionDuration}ms`
loaderCtx.style.transform = 'scale(0)'


async function loading(promises, ctx) {
  await whilePending(
    promises,
    async () => {
      ctx.append(loaderCtx)
      await sleep(0)//💡fix: transition on append
      loaderCtx.style.transform = 'scale(1)'
      await sleep(loaderTransitionDuration)
    },
    async () => {
      loaderCtx.style.transform = 'scale(0)'
      await sleep(loaderTransitionDuration)
      loaderCtx.remove()
    }
  )
}