// ★▶►▬•»›▲♥⚠️💡±×÷²√π⁰≠≈≤≥Ø∞✓✗✖ € ← → ↑ ↓ ⇆♪©Ⓓ†₱…
import './sass/main.scss'

import audioClick from './assets/click.wav'
import audioFalse from './assets/false.wav'
import audioTrue from './assets/true.wav'
import audioSuccess from './assets/success.wav'
import audioFireworks from './assets/fireworks.wav'
import audioBoom from './assets/boom.wav'
import audioIntro from './assets/intro.mp3'
import audioBirthday from './assets/birthday.mp3'

import attachMedias, { showMedias } from './mediaIcons'

const main = document.createElement('main')
main.innerHTML = `
  <div id=stars1></div>
  <div id=stars2></div>
  <div id=stars3></div>
  <div id=birthday></div>`
attachMedias(main)
document.body.appendChild(main)



const birthday = document.querySelector('#birthday')
birthday.innerHTML = `<h1></h1>
  <h1>${spanLetters('loading…')}</h1>`

const h1s = document.querySelectorAll('h1'),
  stars = document.querySelectorAll('#stars1,#stars2,#stars3'),
  dialog = document.querySelector('dialog'),
  select = document.querySelector('select'),
  date = document.querySelector('input[type=date]'),
  outputs = document.querySelectorAll('output'),
  surbriseBtn = document.querySelector('button')


const audios = {
  click: fetchAudio(audioClick),
  true: fetchAudio(audioTrue),
  false: fetchAudio(audioFalse),
  success: fetchAudio(audioSuccess),
  intro: new Audio(audioIntro),
}

audios.intro.setAttribute('loop', true)

const introPromises = [
  new Promise(rs => window.addEventListener(
    'load', rs, { once: true }
  )),
  new Promise(rs => audios.intro.addEventListener(
    'canplaythrough', rs, { once: true }
  ))
]
for (const audio in audios)
  if ('click true false success'.includes(audio))
    introPromises.push(
      (async () => audios[audio] = await audios[audio])()
    )
//console.log(introPromises)



await Promise.all(introPromises)//.............................
//console.log('loaded & all intro promises settled')

h1s[1].style.transform = 'scale(0)'
dialog.style.transform = 'scale(0)'





//starts fetching surprise
audios.fireworks = fetchAudio(audioFireworks)
audios.boom = fetchAudio(audioBoom)
audios.birthday = new Audio(audioBirthday)

audios.birthday.setAttribute('loop', true)

const script = document.createElement('script')
script.async = true
script.src = './../src/party.min.js'
document.head.appendChild(script)

const surprisePromises = [
  new Promise(rs => script.addEventListener(
    'load', rs, { once: true }
  )),
  new Promise(rs => audios.birthday.addEventListener(
    'canplaythrough', rs, { once: true }
  ))
]
for (const audio in audios)
  if ('boom fireworks'.includes(audio))
    surprisePromises.push(
      (async () => audios[audio] = await audios[audio])()
    )




await sleep(500)

h1s[1].innerText = ''

dialog.showModal()
dialog.style.transform = 'scale(1)'

dialog.addEventListener('click', () => audios.click.play())
dialog.addEventListener('click', () => audios.intro.play(),
  { once: true })

select.addEventListener('change', function handler() {
  if (select.value != 2014) {
    audios.false.play()
    outputs[0].style.color = 'darkorange'
    outputs[0].innerHTML = `Ops😅 we meet on <span>2014 ✓</span><br>not <span>${select.value}✗</span> !!`
    return
  }

  select.removeEventListener('change', handler)
  unlockDialog(date.value == '2000-01-15')

  select.disabled = true
  outputs[0].style.color = 'greenyellow'
  outputs[0].innerHTML = `Yes😁 <b>2014 ✓</b><br>it\'s was awesome ${(new Date().getFullYear()) - 2014} years of <b>friendship</b>!!`
})

date.addEventListener('change', function handler() {
  if (date.value != '2000-01-15') {
    audios.false.play()
    outputs[1].style.color = 'darkorange'
    outputs[1].innerHTML = `Ops😅 my birthday on <span>15<sup><small>th</small></sup> january ✓</span> <br>not <span>${date.value}✗</span> !!`
    return
  }

  date.removeEventListener('change', handler)
  unlockDialog(select.value == 2014)

  date.disabled = true
  outputs[1].style.color = 'greenyellow'
  outputs[1].innerHTML = 'Yes😁 <b>15<sup><small>th</small></sup> january ✓</b><br>you\'re younger than me by <b>135</b> day!!'
})

surbriseBtn.addEventListener('click', async () => {
  dialog.style.transform = 'scale(0)'

  await sleep(500)

  dialog.close()

  h1s[1].innerHTML = spanLetters('›_~')
  h1s[1].style.transform = 'scale(1)'


  birthday.addEventListener('click', async e => {
    e.stopPropagation()

    const status = await promisesState(surprisePromises)
    if (status != 'fulfilled') {
      h1s[1].innerHTML = spanLetters('… ›_~ …')
      await Promise.all(surprisePromises)
    }

    h1s[1].style.fontSize = '1px';

    document.addEventListener('click', e => {
      audios.fireworks.play()
      party.sparkles(e, {
        count: party.variation.range(3, 7),
        size: party.variation.range(0.8, 1.2),
      })
    })

    await sleep(1000)
    audios.intro.pause()
    audios.intro.currentTime = 0
    delete audios.intro
    delete audios.true
    delete audios.false
    delete audios.success
    delete audios.click

    h1s[1].style.fontSize = 'clamp(1.4rem, 8vw, 4rem)';

    for (const h1 of h1s) {
      h1.style.transform = 'scale(0)'
      h1.style.animation = 'none'
    }

    await sleep(500)
    h1s[0].innerHTML = spanLetters('Happy Birthday')
    h1s[0].setAttribute('data-content', '🎊')

    h1s[1].innerHTML = spanLetters('Mechid')
    h1s[1].setAttribute('data-contentBefore', '🎉')
    h1s[1].setAttribute('data-contentAfter', '🥳')

    audios.boom.play()
    audios.birthday.play()

    party.confetti(h1s[1], {
      count: party.variation.range(34, 35)
    })

    for (const h1 of h1s) h1.style.transform = 'scale(1)'

    await sleep(350)
    for (const h1 of h1s) h1.style.animation =
      'hb 1.5s infinite alternate cubic-bezier(0.25, 0.46, 0.45, 0.94)'

    await sleep(150)
    stars.forEach((star, i) => star.style.animation =
      `stars${i + 1} 60s ease-in-out infinite alternate`
    )


    await sleep(9000)
    showMedias()
  }, { once: true })

  await sleep(500)
  for (const h1 of h1s) h1.style.animation =
    'hb 1.5s infinite alternate cubic-bezier(0.25, 0.46, 0.45, 0.94)'

}, { once: true })



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

function unlockDialog(cnd) {
  if (!cnd) return audios.true.play()
  audios.success.play()
  surbriseBtn.disabled = false
  surbriseBtn.innerText = 'Unlocked'
  surbriseBtn.setAttribute('data-lock', '🔑')
}

async function fetchAudio(url) {
  const
    ctx = new AudioContext(),
    data = await fetch(url),
    arrayBuffer = await data.arrayBuffer(),
    audio = await ctx.decodeAudioData(arrayBuffer)

  async function play() {
    const playSound = ctx.createBufferSource()
    playSound.buffer = audio
    playSound.connect(ctx.destination)
    playSound.start(ctx.currentTime)
  }

  return { play }
}

async function promisesState(promises) {
  const status = []
  for (const promise of promises) {
    const t = {}
    status.push(await Promise.race([promise, t]).then(
      v => (v === t) ? 'pending' : 'fulfilled',
      () => 'rejected'
    ))
  }

  if (status.includes('rejected')) return 'rejecded'
  else return status.includes('pending')
    ? 'pending' : 'fulfilled'
}