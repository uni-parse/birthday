//import './party'
import './party.scss'
import mp3 from './assets/m.mp3'

const div = document.querySelector('#birthday')
div.innerHTML = `<h1></h1><h1>›_~</h1><audio src=${mp3} loop></audio>`
const h1 = document.querySelectorAll('h1')
const audio = document.querySelector('audio')
const stars = document.querySelectorAll('#stars,#stars2,#stars3')


document.body.addEventListener('click', e =>
  party.sparkles(e, {
    count: party.variation.range(3, 7),
    size: party.variation.range(0.8, 1.2),
  }))
document.addEventListener('click', () => {
  party.confetti(h1[1], { count: party.variation.range(9, 20) })
  h1[0].innerText = '🎊Happy Birthday🎊'
  h1[1].innerText = '🎉Mechid🥳'
  audio.play()
  for (let i = 0; i < 3; i++) {
    stars[i].style.animation = `stars${i + 1} 60s 1s ease-in-out infinite alternate`
  }
}, { once: true })

//alert('done')