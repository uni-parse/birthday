import { audios } from './assets'
export function dialogListener(dialog) {
  dialog.addEventListener('click', () => audios.click.play())
  dialog.addEventListener('click', () => audios.intro.play(),
    { once: true })

  const select = dialog.querySelector('select'),
    selectOutput = document.createElement('output')
  select.addEventListener('change', selectHandler)

  const date = dialog.querySelector('input[type=date]'),
    dateOutput = document.createElement('output')
  date.addEventListener('change', dateHandler)



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
    dateOutput.innerHTML = '<br>Yes😁 <b>15<sup><small>th</small></sup> january ✓</b><br>you\'re younger than me by <b>165</b> day!!'

    date.replaceWith(dateOutput)

    unlockDialog()
  }

  const lockBtn = dialog.querySelector('button')
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
}
