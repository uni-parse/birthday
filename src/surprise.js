export { showSurprise }

import { sleep } from "./utilities"
import { audios } from "./assets"
import { spanLetters } from "./utilities"

const surpriceCtx = document.createElement('div')
surpriceCtx.id = 'surprise'

const h1s = [1, 2].map(() => document.createElement('h1'))
surpriceCtx.append(...h1s)

h1s[0].innerHTML = spanLetters('Happy Birthday')
h1s[1].innerHTML = spanLetters('Mechid')
h1s[0].dataset.content = '🎊'
h1s[1].dataset.contentBefore = '🎉'
h1s[1].dataset.contentAfter = '🥳'

const transitionDuration = 500
for (const h1 of h1s) {
  h1.style.transition = `transform ${transitionDuration}ms`
  h1.style.transform = 'scale(0)'
}


async function showSurprise(ctx) {
  //  stop intro.mp3
  audios.intro.pause()
  audios.intro.currentTime = 0
  delete audios.intro
  delete audios.click

  ctx.append(surpriceCtx)
  await sleep(transitionDuration) //⚠️ 💡fix: transition ??

  //  play boom.wav birthday.mp3
  audios.birthday.play()
  audios.boom.play()
    .addEventListener('ended',
      () => delete audios.boom, { once: true })

  //  party confetti expload & shows up
  party.confetti(h1s[1], {
    count: party.variation.range(34, 35)
  })

  //  birthday shows up
  for (const h1 of h1s) {
    h1.style.willChange = 'transform, opacity, text-shadow'
    h1.style.transform = 'scale(1)'
  }
  await sleep(transitionDuration - 150) //sync transition with animation
  for (const h1 of h1s) h1.classList.add('animated')
  await sleep(150)

  //  event click: show party sparkles & play fireworks.wav
  ctx.addEventListener('click', e => {
    audios.fireworks.play()
    party.sparkles(e, {
      count: party.variation.range(3, 7),
      size: party.variation.range(0.8, 1.2),
    })
  }, { once: false })
}