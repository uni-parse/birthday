export { attachMedias, showMedias }

import iconsUrl from './assets/mediaIcons.json?url'
import srcsetUniparse from './assets/UniParse.jpg?w=66&format=avif;webp&srcset'
import srcsetMechid from './assets/mechid.jpg?w=66&format=avif;webp&srcset'

const users = {
  uniparse: { srcset: srcsetUniparse },
  mechid: { srcset: srcsetMechid }
}

async function attachMedias(ctx) {
  const response = await fetch(iconsUrl)
  const icons = await response.json()

  users.uniparse.urls = [
    'https://youtube.com/channel/UCvNOch5x46MDaejgQ6SkzUg',
    'https://facebook.com/UniParse',
    'https://instagram.com/UniParse',
    'https://linkedin.com/in/UniParse',
    'https://github.com/TheUniParse',
    'https://twitter.com/UniParse'
  ]

  users.mechid.urls = [
    'https://facebook.com/got.em.11',
    'https://instagram.com/mohamed_mchid_hedjala',
    'https://twitter.com/mohamedmh06'
  ]

  for (const user in users) {
    const address = document.createElement('address')

    for (const url of users[user].urls) {
      const svg = icons[url.slice(8, url.indexOf('.'))]
      const a = document.createElement('a')
      a.target = '_blank'
      a.href = url
      a.innerHTML = svg
      address.append(a)
    }

    const img = document.createElement('img')
    img.srcset = users[user].srcset
    img.alt = user
    address.append(img)

    const svgs = [...address.querySelectorAll('svg')]
    svgs.forEach((svg, i) => svg.style.transition =
      `all 500ms cubic-bezier(.215, .61, .355, 1),
      right ${(svgs.length - i) * 100 + 200}ms cubic-bezier(.4,1,.8,1.4),
      left ${(svgs.length - i) * 100 + 200}ms cubic-bezier(.4,1,.8,1.4)`
    )

    //trash
    delete users[user].srcset
    delete users[user].urls

    //cache
    users[user].img = img
    users[user].svgs = svgs

    ctx.append(address)
  }
}

function showMedias() {
  users.uniparse.offsetX = 'right'
  users.mechid.offsetX = 'left'

  for (const user in users) {
    const { img, svgs, offsetX } = users[user]
    let visible

    img.style.bottom = '.3rem'
    img.addEventListener('click', () => {
      visible = !visible
      for (const svg of svgs)
        svg.style[offsetX] = visible ? '2.8rem' : 0
    }, { once: false })
  }

  //trash
  delete users.uniparse
  delete users.mechid
}