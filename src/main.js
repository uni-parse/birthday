import './sass/main.scss'
import { attachMedias, showMedias } from './mediaIcons'
import { audios, startsFetchingIntro, startsFetchingSurprise } from './assets'
import { dialog } from './dialog'
import { dialogListener } from './dialog_listener'

const main = document.createElement('main')
document.body.append(main)

const stars = [], star = document.createElement('div')
for (let i = 1; i <= 3; i++) {
  const star_clone = star.cloneNode()
  star_clone.id = `stars${i}`
  stars.push(star_clone)
}
main.append(...stars)




const h1 = document.createElement('h1')
const h1s = [h1, h1.cloneNode()]

const surprise = document.createElement('div')
surprise.id = 'surprise'
surprise.append(...h1s)

main.append(surprise)





const introPromises = startsFetchingIntro()

await sleep(500)//wait for audio buffer|decode even if cached
let loading
await whilePending(introPromises, () => {
  h1s[1].innerHTML = spanLetters('loading…')
  loading = true
})

h1s[1].style.transform = 'scale(0)'
if (loading) await sleep(500) //animation duration
h1s[1].innerText = ''


main.append(dialog)
dialog.style.transform = 'scale(0)'
dialog.showModal()
dialog.style.transform = 'scale(1)'
dialogListener()






const surprisePromises = startsFetchingSurprise()

const lockBtn = dialog.querySelector('button')
lockBtn.addEventListener('click', async () => {
  dialog.style.transform = 'scale(0)'

  await sleep(500)
  dialog.close()

  h1s[1].innerHTML = spanLetters('›_~')
  h1s[1].style.transform = 'scale(1)'

  surprise.addEventListener('click', surpriseHandler, { once: true })

  await sleep(500)
  for (const h1 of h1s) h1.style.animation =
    'hb 1.5s infinite alternate cubic-bezier(0.25, 0.46, 0.45, 0.94)'
}, { once: true })





async function surpriseHandler() {
  await whilePending(surprisePromises, () => {
    h1s[1].innerHTML = spanLetters('… ›_~ …')
  })

  h1s[1].style.fontSize = '1px';

  document.addEventListener('click', e => {
    audios.fireworks.play()
    party.sparkles(e, {
      count: party.variation.range(3, 7),
      size: party.variation.range(0.8, 1.2),
    })
  })

  const mediaPromise = attachMedias(main)

  await sleep(1000)
  audios.intro.pause()
  audios.intro.currentTime = 0
  delete audios.intro
  delete audios.click

  h1s[1].style.fontSize = 'clamp(1.4rem, 8vw, 4rem)'

  for (const h1 of h1s) {
    h1.style.transform = 'scale(0)'
    h1.style.animation = 'none'
  }

  await sleep(500)
  h1s[0].innerHTML = spanLetters('Happy Birthday')
  h1s[1].innerHTML = spanLetters('Mechid')

  h1s[0].dataset.content = '🎊'
  h1s[1].dataset.contentBefore = '🎉'
  h1s[1].dataset.contentAfter = '🥳'

  audios.birthday.play()
  audios.boom.play().addEventListener(
    'ended', () => delete audios.boom, { once: true }
  )


  party.confetti(h1s[1], {
    count: party.variation.range(34, 35)
  })

  for (const h1 of h1s) h1.style.transform = 'scale(1)'

  await sleep(350)
  for (const h1 of h1s) h1.style.animation = 'hb 1.5s infinite alternate cubic-bezier(0.25, 0.46, 0.45, 0.94)'

  await sleep(150)
  stars.forEach((star, i) => star.style.animation =
    `stars${i + 1} 60s ease-in-out infinite alternate`
  )

  await sleep(9000)
  whilePending(mediaPromise, () => {
    //just wait
  })

  showMedias()
}




//halpers

function sleep(ms) {
  return new Promise(rs => setTimeout(rs, ms))
}

function spanLetters(str) {
  return [...str].reduce((spans, char) => char == ' '
    ? spans + ' '
    : spans + `<span>${char}</span>`
    , '')
}

async function whilePending(promises, callback) {
  if (await promisesState(promises) != 'pending') return
  callback()
  await Promise.all(promises)
}

async function promisesState(promises) {
  if (!Array.isArray(promises) && promises instanceof Promise) {
    const t = {}
    return await Promise.race([promises, t])
      .then(v => v === t ? 'pending' : 'fulfilled')
      .catch(() => 'rejected')
  }

  const status = new Set()

  for (const p of promises) {
    const t = {},
      state = await Promise.race([p, t])
        .then(v => v === t ? 'pending' : 'fulfilled')
        .catch(() => 'rejected')

    if (state == 'rejected') return 'rejected'

    status.add(state)
  }

  return status.has('pending') ? 'pending' : 'fulfilled'
}