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

import partyJsUrl from './assets/party.min.js?url'

function fetchIntro(delay = 0, promises = []) {
  audios.intro = new Audio(musicIntro)
  audios.intro.loop = true
  promises.push(eventPromise(audios.intro, 'canplaythrough'))

  new Map()
    .set('click', fetchAudio(audioClick))
    .set('true', fetchAudio(audioTrue))
    .set('false', fetchAudio(audioFalse))
    .set('success', fetchAudio(audioSuccess))
    .forEach((v, k) => promises.push(audioPromise([k, v])))

  if (document.readyState != 'complete')
    promises.push(eventPromise(window, 'load'))

  promises.push(sleep(delay))
  return promises
}

function fetchSurprise(delay = 0, promises = []) {
  audios.birthday = new Audio(musicBirthday)
  audios.birthday.loop = true
  promises.push(eventPromise(audios.birthday, 'canplaythrough'))

  new Map()
    .set('boom', fetchAudio(audioBoom))
    .set('fireworks', fetchAudio(audioFireworks))
    .forEach((v, k) => promises.push(audioPromise([k, v])))

  const script_party = document.createElement('script')
  script_party.async = true
  script_party.src = partyJsUrl
  document.head.append(script_party)
  promises.push(eventPromise(script_party, 'load'))

  promises.push(sleep(delay))
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