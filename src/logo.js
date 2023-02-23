export { pendingLogo }

import { sleep, spanLetters, eventPromise } from "./utilities"

const logo = document.createElement('h1')
logo.className = 'logo'
logo.innerHTML = spanLetters('›_~')

const transitionDuration = 500
logo.style.transition = `transform ${transitionDuration}ms`
logo.style.transform = 'scale(0)'


async function pendingLogo(ctx) {
  //  shows up
  ctx.append(logo)
  await sleep(0)//💡fix: transition on append
  logo.style.transform = 'scale(1)'
  await sleep(transitionDuration - 150)
  logo.classList.add('animated') //⚠️transforrm: rotate scale
  await sleep(150)

  //  click event
  await eventPromise(ctx, 'click')

  //  hide out
  logo.classList.remove('animated')
  await sleep(0)// 💡fix: transition
  logo.style.transform = 'scale(0)'
  await sleep(transitionDuration)
  logo.remove()
}