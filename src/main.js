//summary:
//  initiate
//  loading (intro fetching audios: click false true success intro)
//  dialog (questions)
//  >_~ (nice animation)
//  loading: (surprise fetching party, audios: boom fireworks birthday)
//  surprise: (⚠️animation: stars, h1s, party) (audios: boom, birthday)
//  medias (show up after 10s)

import './sass/main.scss'
import { sleep, eventPromise } from './utilities'
import { loading } from './loader'
import { dialog } from './dialog'
import { dialogListener } from './dialog_listener'
import { attachMedias, showMedias } from './mediaIcons'
import { audios, fetchIntro, fetchSurprise } from './assets'

const main = document.createElement('main')
document.body.append(main)


//background of 3 stars with multi box-shadow
const stars = []
for (const i of [1, 2, 3]) {
  const star = document.createElement('div')
  star.id = `star${i}`
  stars.push(star)
}
main.append(...stars)


//start fetching audios: click true false success intro
const introPromises = fetchIntro()
await sleep(500)//audio buffer|decode, even if cached
await loading(introPromises, main)
//start fetching party.min.js & audios: boom birthday fireworks
const surprisePromises = fetchSurprise()

//dialog show up
main.append(dialog)
const dialogTransitionDuration = 500
dialog.style.transition =
  `transform ${dialogTransitionDuration}ms`
dialog.style.transform = 'scale(0)'
dialog.showModal()
dialog.style.transform = 'scale(1)'
dialogListener()




//>_~ show up with nice animation, after closing dialog
//  >_~ preparing
const surprise = document.createElement('div')
surprise.id = 'surprise'
main.append(surprise)

const h1 = document.createElement('h1')
const h1TransitionDuration = 500
h1.style.transition = `all ${h1TransitionDuration}ms`
h1.style.transform = 'scale(0)'
surprise.append(h1)

//  event click
const dialogBtn = dialog.querySelector('button')
await eventPromise(dialogBtn, 'click')

//  dialog hide out
dialog.style.transform = 'scale(0)'
await sleep(dialogTransitionDuration)
dialog.close()
dialog.remove()

//  >_~ show up
h1.innerHTML = spanLetters('›_~')
h1.style.transform = 'scale(1)'
await sleep(h1TransitionDuration)
h1.className = 'animated' //⚠️transforrm: rotate() scale()







//birthday shows up & play boom.wav birthday.mp3 after >_~ hide
//  event click
await eventPromise(document, 'click')

//  >_~ hide out
h1.classList.remove('animated')
h1.style.fontSize = 0
await sleep(h1TransitionDuration)
await sleep(500) //⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️

//  loading spanner shows up if fetching pending
await loading(surprisePromises, main)
//  start fetching media svgs & 2 images
const mediaPromise = attachMedias(main)

//  event click: show party sparkles & play fireworks.wav
main.addEventListener('click', e => {
  audios.fireworks.play()
  party.sparkles(e, {
    count: party.variation.range(3, 7),
    size: party.variation.range(0.8, 1.2),
  })
}, { once: false })

//  stop intro.mp3
audios.intro.pause()
audios.intro.currentTime = 0
delete audios.intro
delete audios.click

//  birthday preparing
h1.textContent = ''
h1.style.fontSize = ''

const h1_2 = document.createElement('h1')
h1_2.style.transition = `all ${h1TransitionDuration}ms`
surprise.append(h1_2)

const h1s = [h1, h1_2]
for (const h1 of h1s) h1.style.transform = 'scale(0)'
await sleep(h1TransitionDuration)//⚠️⚠️⚠️⚠️⚠️⚠️

h1.innerHTML = spanLetters('Happy Birthday')
h1_2.innerHTML = spanLetters('UniParse')
h1.dataset.content = '🎊'
h1_2.dataset.contentBefore = '🎉'
h1_2.dataset.contentAfter = '🥳'

//  play audios
audios.birthday.play()
audios.boom.play()
  .addEventListener('ended',
    () => delete audios.boom, { once: true })

//  party confetti expload & shows up
party.confetti(h1_2, {
  count: party.variation.range(34, 35)
})

//  birthday thows up
for (const h1 of h1s) h1.style.transform = 'scale(1)'
await sleep(350) //sync transition with animation
for (const h1 of h1s) h1.classList.add('animated')

//  animate background stars
await sleep(150)
stars.forEach((star, i) => star.style.animation =
  `star${i + 1} 60s ease-in-out infinite alternate`
)

//  show medias
await sleep(9000)
await mediaPromise
showMedias()


function spanLetters(str) {
  return [...str].reduce((spans, char) => char == ' '
    ? spans + ' '
    : spans + `<span>${char}</span>`
    , '')
}