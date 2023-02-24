export const audios = {}
export { fetchIntro, fetchSurprise }

import { sleep, eventPromise } from './utilities'

import musicIntro from './assets/intro.mp3'
import audioClick from './assets/click.wav'
import audioFalse from './assets/false.wav'
import audioTrue from './assets/true.wav'
import audioSuccess from './assets/success.wav'

import musicBirthday from './assets/birthday.mp3'
import audioBoom from './assets/boom.wav'
import audioFireworks from './assets/fireworks.wav'

import partyUrl from './assets/party.min.js?url'

function fetchIntro(delay = 0, promises = []) {
  audios.intro = new Audio(musicIntro)
  audios.intro.loop = true

  const pending = new Map()
    .set('click', fetchAudio(audioClick))
    .set('true', fetchAudio(audioTrue))
    .set('false', fetchAudio(audioFalse))
    .set('success', fetchAudio(audioSuccess))

  for (const entry of pending.entries())
    promises.push(audioPromise(entry))

  promises.push(
    sleep(delay),
    eventPromise(window, 'load'),
    eventPromise(audios.intro, 'canplaythrough')
  )
  return promises
}

function fetchSurprise(delay = 0, promises = []) {
  audios.birthday = new Audio(musicBirthday)
  audios.birthday.loop = true

  const pending = new Map()
    .set('boom', fetchAudio(audioBoom))
    .set('fireworks', fetchAudio(audioFireworks))

  for (const entry of pending.entries())
    promises.push(audioPromise(entry))

  const script = document.createElement('script')
  script.async = true
  script.src = partyUrl
  document.head.append(script)

  promises.push(
    sleep(delay),
    eventPromise(script, 'load'),
    eventPromise(audios.birthday, 'canplaythrough')
  )
  return promises
}

//helpers
async function audioPromise([key, fetchPromise]) {
  audios[key] = await fetchPromise
}

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