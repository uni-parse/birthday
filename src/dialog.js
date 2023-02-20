import { audios } from './assets'
export const dialog = document.createElement('dialog')
export { dialogListener }

dialog.innerHTML = `
  <form method=dialog>
    <h3>😎Hi mechid✨</h3>
    <p>I create for u a Gift🎁</p>
    <details>
      <summary>
        but first, answer the questions:
      </summary><br>
      <label>which <em>year</em> our first meeting?
        <select required>
          <option selected disabled hidden></option>
          <option>2010</option>
          <option>2011</option>
          <option>2012</option>
          <option>2013</option>
          <option>2014</option>
          <option>2015</option>
          <option>2016</option>
        </select>
      </label><br>
      <label>which day I <em>born</em>?
        <input type=date value='2000-01-29' required>
      </label><br>
      <button type=button disabled data-lock='🔒'>Locked</button>
    </details>
  </form>`

const select = dialog.querySelector('select'),
  selectOutput = document.createElement('output')

const date = dialog.querySelector('input[type=date]'),
  dateOutput = document.createElement('output')

const lockBtn = dialog.querySelector('button')


function dialogListener() {
  dialog.addEventListener('click', () => audios.click.play())
  dialog.addEventListener('click', () => audios.intro.play(),
    { once: true })

  select.addEventListener('change', selectHandler)
  date.addEventListener('change', dateHandler)
}

function selectHandler() {
  if (select.value != 2014) {
    audios.false.play()

    selectOutput.style.color = 'darkorange'
    selectOutput.innerHTML = `<br>Ops😅 we meet on <span>2014 ✓</span><br>not <span>${select.value}✗</span> !!`

    select.after(selectOutput)
    return
  }

  select.removeEventListener('change', selectHandler)

  selectOutput.style.color = 'greenyellow'
  selectOutput.innerHTML = `<br>Yes😁 <b>2014 ✓</b><br>it's was awesome ${(new Date().getFullYear()) - 2014} years of <b>friendship</b>!!`

  select.replaceWith(selectOutput)

  unlockDialog()
}

function dateHandler() {
  if (date.value != '2000-01-15') {
    audios.false.play()

    dateOutput.style.color = 'darkorange'
    dateOutput.innerHTML = `<br>Ops😅 my birthday on <span>15<sup><small>th</small></sup> january ✓</span> <br>not <span>${date.value}✗</span> !!`

    date.after(dateOutput)
    return
  }

  date.removeEventListener('change', dateHandler)

  dateOutput.style.color = 'greenyellow'
  dateOutput.innerHTML = '<br>Yes😁 <b>15<sup><small>th</small></sup> january ✓</b><br>you\'re younger than me by <b>135</b> day!!'

  date.replaceWith(dateOutput)

  unlockDialog()
}

function unlockDialog() {
  if (date.value != '2000-01-15' || select.value != 2014) {
    audios.true.play().addEventListener('ended',
      () => delete audios.true, { once: true })
    return
  }

  delete audios.false
  audios.success.play().addEventListener('ended',
    () => delete audios.success, { once: true })

  lockBtn.disabled = false
  lockBtn.innerText = 'Unlocked'
  lockBtn.dataset.lock = '🔑'
}