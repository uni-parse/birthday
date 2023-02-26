export { attachMedias, showMedias }

import { eventPromise, sleep } from './utilities'

import iconsUrl from './assets/mediaIcons.json?url'
import srcsetUniparse from './assets/UniParse.jpg?w=66&format=avif;webp&srcset'
import srcsetMechid from './assets/mechid.jpg?w=66&format=avif;webp&srcset'

let users = [
  {
    name: 'uniparse',
    side: 'right',
    srcset: srcsetUniparse,
    urls: [
      'https://youtube.com/channel/UCvNOch5x46MDaejgQ6SkzUg',
      'https://facebook.com/UniParse',
      'https://instagram.com/UniParse',
      'https://linkedin.com/in/UniParse',
      'https://github.com/TheUniParse',
      'https://twitter.com/UniParse'
    ]
  }, {
    name: 'mechid',
    side: 'left',
    srcset: srcsetMechid,
    urls: [
      'https://facebook.com/got.em.11',
      'https://instagram.com/mohamed_mchid_hedjala',
      'https://twitter.com/mohamedmh06'
    ]
  }
]
async function attachMedias(ctx) {
  const icons = await fetchMedia()
  //append <address> <a><svg></a>... <img> </address>
  ctx.append(...getAdresses(icons))
}

function getAdresses(icons) {
  return users.map(user => {
    const address = document.createElement('address')

    //append ...<a><svg> in <address>
    const medias = user.urls.map(url => {
      const a = document.createElement('a')
      a.target = '_blank'
      a.href = url

      const mediaName = url.slice(8, url.indexOf('.'))
      const svg_html = icons[mediaName]
      a.innerHTML = svg_html

      //accessibility
      const svg = a.querySelector('svg')
      svg.role = 'img'
      const title = document.createElement('title')
      title.innerText = `${mediaName} of ${user.name}`
      svg.prepend(title)

      return a
    })
    address.append(...medias)

    //append <img> in <address>
    const img = document.createElement('img')
    img.srcset = user.srcset
    img.alt = user.name
    address.append(img)

    //trash & cache
    delete user.srcset
    delete user.urls
    user.img = img
    user.address = address

    return address
  })
}

function showMedias(delay = 5000) {
  users.forEach(user => {
    const { img, side, address } = user
    img.style.bottom = '.3rem'

    //toogle medias svgs visibility by clicking on img
    let visible, timerId
    img.addEventListener('click', () => {
      const svgs = [...address.querySelectorAll('svg')]

      //toggle show/hide svgs
      transition()
      visible = !visible

      //hide svgs after delay, if not hover over it.
      clearTimeout(timerId)
      timer()
      address.addEventListener('mouseover', async e => {
        if (!svgs.includes(e.target)) return
        clearTimeout(timerId)
        console.log('hi')
        await eventPromise(e.target, 'mouseout')
        timer()
        console.log('bye')
      }, { once: false })


      //helpers
      function timer() {
        timerId = setTimeout(() => {
          if (!visible) return
          transition()
          visible = false
        }, delay)
      }

      function transition() {
        svgs.forEach((svg, i) => {
          //transition configuration
          const delay = 60 * (visible ? i : svgs.length - i)
          const coordinates = visible
            ? '.3, -.5,    1, 1'
            : '0, 0,    .7, 1.5'

          svg.style.transition =
            `transform 500ms cubic-bezier(.215, .61, .355, 1),
          ${side} 200ms ${delay}ms cubic-bezier(${coordinates})`

          //toggle show/hide svgs
          svg.style[side] = visible ? '' : '3rem'
        })
      }
    }, { once: false })
  })

  users = null // trash
}


//helpers
async function fetchMedia() {
  const response = await fetch(iconsUrl)
  const icons = await response.json()
  return icons
}