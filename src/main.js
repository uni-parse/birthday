//import './party'
import './party.scss'


import mp3 from './assets/m.mp3'

const div = document.querySelector('#birthday')
div.innerHTML = '<h1>🎊Happy Birthday🎊</h1><h1>🎉Mechid🥳</h1>'
const h1 = document.querySelectorAll('h1')
const audio = document.createElement('audio')
audio.setAttribute('src', mp3)
audio.setAttribute('loop', true)
div.appendChild(audio)

const stars = document.querySelectorAll('#stars,#stars2,#stars3')


function random(max) {
  return Math.floor(Math.random() * (max + 1))
}
function randomRgb(max = 255) {
  return `rgb(${random(max)},${random(max)},${random(max)})`
}
function randomHsl(saturate = 100, lightness = 50) {
  return `hsl(${random(360)},${saturate}%,${lightness}%)`
}
function randomBg() {
  document.body.style.backgroundColor = randomHsl(100, 18)
}

document.body.addEventListener('click', e => {
  party.sparkles(e, {
    count: party.variation.range(3, 7),
    size: party.variation.range(0.8, 1.2),
  })
  audio.play()
  h1[0].style.display = 'inline-block'
  h1[1].style.display = 'inline-block'
  for (let i = 0; i < 3; i++) {
    stars[i].style.animation = `stars${i + 1} 60s 1s ease-in-out infinite alternate`
  }
})
document.body.addEventListener('click', e => party.confetti(h1[1], { count: party.variation.range(10, 20) }), { once: true })

//alert('done')