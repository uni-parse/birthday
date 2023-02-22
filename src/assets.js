export const audios = {}
export { fetchIntro, fetchSurprise }

import { eventPromise } from './utilities'

import musicIntro from './assets/intro.mp3'
import audioClick from './assets/click.wav'
import audioFalse from './assets/false.wav'
import audioTrue from './assets/true.wav'
import audioSuccess from './assets/success.wav'

import musicBirthday from './assets/birthday.mp3'
import audioBoom from './assets/boom.wav'
import audioFireworks from './assets/fireworks.wav'

import partyUrl from './assets/party.min.js?url'

function fetchIntro() {
  audios.click = fetchAudio(audioClick)
  audios.true = fetchAudio(audioTrue)
  audios.false = fetchAudio(audioFalse)
  audios.success = fetchAudio(audioSuccess)

  audios.intro = new Audio(musicIntro)
  audios.intro.loop = true

  const promises = [
    //new Promise(rs => setTimeout(rs, 10000)),
    //Promise.reject('error 404 from uniparse'),
    eventPromise(window, 'load'),
    eventPromise(audios.intro, 'canplaythrough'),
  ]

  for (const a in audios) if (a != 'intro')
    promises.push((async () => audios[a] = await audios[a])())

  return promises
}

function fetchSurprise() {
  audios.fireworks = fetchAudio(audioFireworks)
  audios.boom = fetchAudio(audioBoom)

  audios.birthday = new Audio(musicBirthday)
  audios.birthday.loop = true

  const script = document.createElement('script')
  script.async = true
  script.src = partyUrl
  document.head.append(script)

  const promises = [
    new Promise(rs => setTimeout(rs, 10000)),
    eventPromise(script, 'load'),
    eventPromise(audios.birthday, 'canplaythrough')
  ]

  for (let a in audios) if ('boom fireworks'.includes(a))
    promises.push((async () => audios[a] = await audios[a])())

  return promises
}

//helpers
async function fetchAudio(url) {
  const
    ctx = new AudioContext(),
    data = await fetch(url),
    arrayBuffer = await data.arrayBuffer(),
    audioBuffer = await ctx.decodeAudioData(arrayBuffer)

  function play() {
    const playSound = ctx.createBufferSource()
    playSound.buffer = audioBuffer
    playSound.connect(ctx.destination)
    playSound.start(ctx.currentTime)

    return playSound
    //playSound.stop( when?: ctx.currentTime )
    //playSound.addEventListener('ended', handler)
  }

  return { play }
}