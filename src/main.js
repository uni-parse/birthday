// ★▶►▬•»›▲♥⚠️💡±×÷²√π⁰≠≈≤≥Ø∞✓✗✖ € ← → ↑ ↓ ⇆♪©Ⓓ†₱…
import './sass/main.scss'

import { attachMedias, showMedias } from './mediaIcons'
import { startsFetchingIntro, startsFetchingSurprise } from './assets'

const main = document.createElement('main')
main.innerHTML = `
  <div id=stars1></div>
  <div id=stars2></div>
  <div id=stars3></div>

  <div id=birthday>
    <h1></h1>
    <h1></h1>
  </div>`

document.body.append(main)

const
  stars = main.querySelectorAll('#stars1, #stars2, #stars3'),
  birthday = main.querySelector('#birthday'),
  h1s = birthday.querySelectorAll('h1')


const audios = {},
  introPromises = startsFetchingIntro(audios)


await sleep(500)//wait for audio buffer|decode even if cached
let loading
await whilePending(introPromises, () => {
  h1s[1].innerHTML = spanLetters('loading…')
  loading = true
})

h1s[1].style.transform = 'scale(0)'
if (loading) await sleep(500) //animation duration
h1s[1].innerText = ''



const
  dialog = document.body.querySelector('dialog'),
  select = dialog.querySelector('select'),
  date = dialog.querySelector('input[type=date]'),
  outputs = dialog.querySelectorAll('output'),
  surbriseBtn = dialog.querySelector('button')


dialog.style.transform = 'scale(0)'
dialog.showModal()
dialog.style.transform = 'scale(1)'

dialog.addEventListener('click', () => audios.click.play())
dialog.addEventListener('click', () => audios.intro.play(),
  { once: true })

select.addEventListener('change', function handler() {
  if (select.value != 2014) {
    outputs[0].style.color = 'darkorange'
    outputs[0].innerHTML = `Ops😅 we meet on <span>2014 ✓</span><br>not <span>${select.value}✗</span> !!`
    audios.false.play()
    return
  }

  select.removeEventListener('change', handler)

  select.disabled = true
  outputs[0].style.color = 'greenyellow'
  outputs[0].innerHTML = `Yes😁 <b>2014 ✓</b><br>it\'s was awesome ${(new Date().getFullYear()) - 2014} years of <b>friendship</b>!!`

  unlockDialog()
})

date.addEventListener('change', function handler() {
  if (date.value != '2000-01-15') {
    outputs[1].style.color = 'darkorange'
    outputs[1].innerHTML = `Ops😅 my birthday on <span>15<sup><small>th</small></sup> january ✓</span> <br>not <span>${date.value}✗</span> !!`
    audios.false.play()
    return
  }

  date.removeEventListener('change', handler)

  date.disabled = true
  outputs[1].style.color = 'greenyellow'
  outputs[1].innerHTML = 'Yes😁 <b>15<sup><small>th</small></sup> january ✓</b><br>you\'re younger than me by <b>135</b> day!!'

  unlockDialog()
})




const surprisePromises = startsFetchingSurprise(audios)



surbriseBtn.addEventListener('click', async () => {
  dialog.style.transform = 'scale(0)'

  await sleep(500)
  dialog.close()

  h1s[1].innerHTML = spanLetters('›_~')
  h1s[1].style.transform = 'scale(1)'

  birthday.addEventListener('click', surprise, { once: true })

  await sleep(500)
  for (const h1 of h1s) h1.style.animation =
    'hb 1.5s infinite alternate cubic-bezier(0.25, 0.46, 0.45, 0.94)'
}, { once: true })





async function surprise(event) {
  event.stopPropagation()

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

function unlockDialog() {
  if (!(date.value == '2000-01-15' && select.value == 2014)) {
    audios.true.play().addEventListener('ended', () =>
      delete audios.true, { once: true })
    return
  }

  delete audios.false
  audios.success.play().addEventListener('ended', () =>
    delete audios.success, { once: true })

  surbriseBtn.disabled = false
  surbriseBtn.innerText = 'Unlocked'
  surbriseBtn.dataset.lock = '🔑'
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

