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
    const anchors = user.urls.map(url => {
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
    address.append(...anchors)

    //append <img> in <address>
    const img = document.createElement('img')
    img.srcset = user.srcset
    img.alt = user.name
    address.append(img)

    user = null // trash
    return address
  })
}

function showMedias(delay = 2500) {
  const adderesses = document.querySelectorAll('address')
  adderesses.forEach(address => {
    address.style.transform = 'translateY(-.3rem)' //show up img

    let visible, timerId

    //toogle medias svgs visibility by clicking on img
    const img = address.querySelector('img')
    img.addEventListener('click', () => {
      transition()
      visible = !visible
    }, { once: false })

    //hide svgs after delay, if not hover over it.
    address.addEventListener('mouseenter', async () => {
      clearTimeout(timerId)
      await eventPromise(address, 'mouseleave')

      timerId = setTimeout(() => {
        if (!visible) return
        transition()
        visible = false
      }, delay)

    }, { once: false })


    //helpers
    function transition() {
      const anchors = [...address.querySelectorAll('a')]
      anchors.forEach((a, i) => {
        //transition configuration
        const delay = 60 * (visible ? i : anchors.length - i)
        const coordinates = visible
          ? '.3, -1,    1, 1'
          : '0, 0,    .7, 2'

        a.style.transition = `transform 200ms ${delay}ms cubic-bezier(${coordinates})`

        //toggle show/hide svgs
        a.style.transform = visible ? '' : 'translateX(0)'
      })
    }

  })
}


//helpers
async function fetchMedia() {
  const response = await fetch(iconsUrl)
  const icons = await response.json()
  return icons
}