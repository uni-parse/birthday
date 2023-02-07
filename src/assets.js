export { startsFetchingIntro, startsFetchingSurprise }

import partyUrl from './../src/party.min.js?url'

import audioClick from './assets/click.wav'
import audioFalse from './assets/false.wav'
import audioTrue from './assets/true.wav'
import audioSuccess from './assets/success.wav'
import audioFireworks from './assets/fireworks.wav'
import audioBoom from './assets/boom.wav'
import audioIntro from './assets/intro.mp3'
import audioBirthday from './assets/birthday.mp3'




function startsFetchingIntro(audios, introPromises) {
  audios.click = fetchAudio(audioClick)
  audios.true = fetchAudio(audioTrue)
  audios.false = fetchAudio(audioFalse)
  audios.success = fetchAudio(audioSuccess)

  audios.intro = new Audio(audioIntro)
  audios.intro.loop = true

  introPromises.push(
    new Promise(rs => window.addEventListener(
      'load', rs, { once: true })),
    new Promise(rs => audios.intro.addEventListener(
      'canplaythrough', rs, { once: true }))
  )

  for (const audio in audios) if (audio != 'intro')
    introPromises.push(
      (async () => audios[audio] = await audios[audio])())
}

function startsFetchingSurprise(audios, surprisePromises) {
  audios.fireworks = fetchAudio(audioFireworks)
  audios.boom = fetchAudio(audioBoom)

  audios.birthday = new Audio(audioBirthday)
  audios.birthday.loop = true

  const script = document.createElement('script')
  script.async = true
  script.src = partyUrl
  document.head.appendChild(script)

  surprisePromises.push(
    new Promise(rs => script.addEventListener(
      'load', rs, { once: true })),
    new Promise(rs => audios.birthday.addEventListener(
      'canplaythrough', rs, { once: true }))
  )

  for (let audio in audios) if ('boom fireworks'.includes(audio))
    surprisePromises.push(
      (async () => audios[audio] = await audios[audio])())
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