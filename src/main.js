import './sass/main.scss'
import { attachMedias, showMedias } from './mediaIcons'
import { audios, startsFetchingIntro, startsFetchingSurprise } from './assets'
import { dialog } from './dialog'
import { dialogListener } from './dialog_listener'
import { loaderCtx } from './loader'
import { sleep, whilePending, getEventPromise } from './utilities'

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
const introPromises = startsFetchingIntro()
await sleep(500)//audio buffer|decode, even if cached

const loaderTransitionDuration = 1000
loaderCtx.style.transition =
  `transform ${loaderTransitionDuration}ms`
loaderCtx.style.transform = 'scale(0)'

let loading = await whilePending(introPromises, async () => {
  main.append(loaderCtx)
  await sleep(loaderTransitionDuration)
  loaderCtx.style.transform = 'scale(1)'
})

if (loading) {
  loaderCtx.style.transform = 'scale(0)'
  await sleep(loaderTransitionDuration)
  loaderCtx.remove()
}






//start fetching party.min.js & audios: boom birthday fireworks
const surprisePromises = startsFetchingSurprise()

main.append(dialog)
const dialogTransitionDuration = 500
dialog.style.transition =
  `transform ${dialogTransitionDuration}ms`
dialog.style.transform = 'scale(0)'
dialog.showModal()
dialog.style.transform = 'scale(1)'
dialogListener()




const surprise = document.createElement('div')
surprise.id = 'surprise'
main.append(surprise)

const heading = document.createElement('h1')
const h1TransitionDuration = 500
heading.style.transition = `all ${h1TransitionDuration}ms`
heading.style.transform = 'scale(0)'
surprise.append(heading)





const dialogBtn = dialog.querySelector('button')
await getEventPromise(dialogBtn, 'click')

dialog.style.transform = 'scale(0)'
await sleep(dialogTransitionDuration)
dialog.close()
dialog.remove()

heading.innerHTML = spanLetters('›_~')
heading.style.transform = 'scale(1)'
await sleep(h1TransitionDuration)
heading.className = 'animated' //⚠️transforrm: rotate() scale()





await getEventPromise(document, 'click')

heading.classList.remove('animated')

loading = await whilePending(surprisePromises, async () => {
  heading.style.fontSize = 0
  await sleep(h1TransitionDuration)

  main.append(loaderCtx)
  await sleep(loaderTransitionDuration)
  loaderCtx.style.transform = 'scale(1)'
})

if (loading) {
  loaderCtx.style.transform = 'scale(0)'
  await sleep(loaderTransitionDuration)
  loaderCtx.remove()
} else {
  heading.style.fontSize = 0
  await sleep(h1TransitionDuration)
}



//start fetching media svgs & 2 images
const mediaPromise = attachMedias(main)

//on click: show party sparkles & play fireworks audio
document.addEventListener('click', e => {
  audios.fireworks.play()
  party.sparkles(e, {
    count: party.variation.range(3, 7),
    size: party.variation.range(0.8, 1.2),
  })
})

await sleep(500) //??
audios.intro.pause()
audios.intro.currentTime = 0
delete audios.intro
delete audios.click

heading.textContent = ''
heading.style.fontSize = ''

const heading2 = document.createElement('h1')
heading2.style.transition = `all ${h1TransitionDuration}ms`
surprise.append(heading2)

const h1s = [heading, heading2]
for (const h1 of h1s) h1.style.transform = 'scale(0)'
await sleep(500)

heading.innerHTML = spanLetters('Happy Birthday')
heading2.innerHTML = spanLetters('Mechid')

heading.dataset.content = '🎊'
heading2.dataset.contentBefore = '🎉'
heading2.dataset.contentAfter = '🥳'

audios.birthday.play()
audios.boom.play().addEventListener(
  'ended', () => delete audios.boom, { once: true }
)

party.confetti(heading2, {
  count: party.variation.range(34, 35)
})

for (const h1 of h1s) h1.style.transform = 'scale(1)'
await sleep(350)

for (const h1 of h1s) h1.classList.add('animated')

await sleep(150)
stars.forEach((star, i) => star.style.animation =
  `star${i + 1} 60s ease-in-out infinite alternate`
)

await sleep(9000)
await mediaPromise
showMedias()


function spanLetters(str) {
  return [...str].reduce((spans, char) => char == ' '
    ? spans + ' '
    : spans + `<span>${char}</span>`
    , '')
}