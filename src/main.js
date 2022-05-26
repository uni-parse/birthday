//import './party.js'
import './party.scss'
import audioParty from './assets/m.mp3'
import audioClick from './assets/click.wav'
import audioFalse from './assets/false.wav'
import audioTrue from './assets/true.wav'
import audioSuccess from './assets/success.wav'
import audioFireworks from './assets/fireworks1.wav'

const birthday = document.querySelector('#birthday')
birthday.innerHTML = `
  <h1></h1>
  <h1>›_~</h1>
  <audio src=${audioClick} preload=auto></audio>
  <audio src=${audioTrue} preload=auto></audio>
  <audio src=${audioFalse} preload=auto></audio>
  <audio src=${audioSuccess} preload=auto></audio>
  <audio src=${audioFireworks} preload=auto></audio>
  <audio src=${audioParty} preload=auto loop></audio>
`
const h1 = document.querySelectorAll('h1')
const audio = document.querySelectorAll('audio')
const stars = document.querySelectorAll('#stars,#stars2,#stars3')
function fun() {
  h1[0].style.animation = 'hb 1.5s infinite alternate cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  h1[1].style.animation = 'hb 1.5s infinite alternate cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  birthday.addEventListener('click', e => {
    e.stopPropagation()
    audio[5].play()
    party.confetti(h1[1], { count: party.variation.range(9, 20) })
    h1[0].innerText = '🎊Happy Birthday🎊'
    h1[1].innerText = '🎉Mechid🥳'
    for (let i = 0; i < 3; i++) {
      stars[i].style.animation = `stars${i + 1} 60s 1s ease-in-out infinite alternate`
    }
  }, { once: true })
  document.addEventListener('click', e => {
    audio[4].play()
    party.sparkles(e, {
      count: party.variation.range(3, 7),
      size: party.variation.range(0.8, 1.2),
    })
  })
}
const dialog = document.querySelector('dialog')

if (typeof dialog.showModal !== 'function') {
  dialog.hidden = true;
  let access = prompt('😎Hi mechid✨, We\'ve create for u a Gift🎁\nbut first, u need to answer the question:\nwich year our first meeting?', '')

  if (access == '2014') {
    alert('Yes😁 2014!!\nit\'s was awesome 8 years of friendship!!')
  } else if (access.startsWith('201')) {
    alert(`Nooo😅 we meet on 2014 not "${access}"!!\nit\'s was awesome 8 years of friendship!!`)
  } else if (!(access.startsWith('201'))) {
    while (!(access.startsWith('201'))) {
      access = prompt(`⚠️warning "${access}" not a number!!\n💡 our first meeting year was:    201#`, '')
    } if (access == '2014') {
      alert('Yes😁 2014!!\nit\'s was awesome 8 years of friendship!!')
    } else if (access.startsWith('201')) {
      alert(`Nooo😅 we meet on 2014 not "${access}"!!\nit\'s was awesome 8 years of friendship!!`)
    }
  }
  fun()
}
const select = document.querySelector('select')
const date = document.querySelector('input[type=date]')
const output = document.querySelectorAll('output')
const btn = document.querySelector('button')
document.addEventListener('DOMContentLoaded', () => {
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
    dialog.addEventListener('click', () => audio[0].play())
    select.addEventListener('change', () => {
      if (date.value == '2000-01-15' && select.value == 2014) {
        audio[3].play()
        select.disabled = true
        btn.disabled = false
        output[0].style.color = 'hsl(90,100%,50%)'
        output[0].innerText = 'Yes😁 2014!!\nit\'s was awesome 8 years of friendship!!'
      } else if (select.value == 2014) {
        audio[1].play()
        select.disabled = true
        output[0].style.color = 'hsl(90,100%,50%)'
        output[0].innerText = 'Yes😁 2014!!\nit\'s was awesome 8 years of friendship!!'
      } else {
        audio[2].play()
        output[0].style.color = 'darkorange'
        output[0].innerText = `Nooo😅 we meet on 2014 not ${select.value}!!`
      }
    })
    date.addEventListener('change', () => {
      if (date.value == '2000-01-15' && select.value == 2014) {
        audio[3].play()
        date.disabled = true
        btn.disabled = false
        output[1].style.color = 'hsl(90,100%,50%)'
        output[1].innerText = 'Yes😁 15th january!!\nyou\'re younger than me by 135 day!!'
      } else if (date.value == '2000-01-15') {
        audio[1].play()
        date.disabled = true
        output[1].style.color = 'hsl(90,100%,50%)'
        output[1].innerText = 'Yes😁 15th january!!\nyou\'re younger than me by 135 day!!'
      } else {
        audio[2].play()
        output[1].style.color = 'darkorange'
        output[1].innerText = 'Nooo😅 my birthday on 15th january!'
      }
    })
    dialog.addEventListener('close', () => fun(), { once: true })
  }
})
//alert('done')
