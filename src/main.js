import './sass/main.scss'
import { sleep } from './utilities'
import { pendingLoader } from './loader'
import { pendingDialog } from './dialog'
import { pendingLogo } from './logo'
import { fetchIntro, fetchSurprise } from './assets'
import { attachMedias, showMedias } from './mediaIcons'
import { stars } from './stars'
import { showSurprise } from './surprise'

const main = document.createElement('main')
document.body.append(main)

//background of 3 stars with multi box-shadow
main.append(...stars);

(async () => {
  //start fetching audios: click true false success intro
  const introPromises = fetchIntro()
  await sleep(500) //⚠️audio buffer|decode, even if cached
  await pendingLoader(introPromises, main)//show logo if pending

  //start fetching party.min.js & audios: boom birthday fireworks
  const surprisePromises = fetchSurprise()

  await pendingDialog(main)
  await pendingLogo(main)
  await pendingLoader(surprisePromises, main)

  //  start fetching mediaIcons.json of svgs
  const mediaPromise = attachMedias(main)

  //birthday shows up & play boom.wav birthday.mp3
  await showSurprise(main)

  //  animate background stars ⚠️60s (needs optimization)
  animateStarsBackground()


  //  show medias after 9s
  await sleep(9000)
  await mediaPromise
  showMedias()
})()

function animateStarsBackground() {
  stars.forEach((star, i) => {
    star.style.willChange = 'transform' //opt animation
    star.style.animation =
      `star${i + 1} 60s ease-in-out infinite alternate`
  })
}