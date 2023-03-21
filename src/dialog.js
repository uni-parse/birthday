import { dialogListener } from './dialog_listener'
import { sleep, eventPromise } from './utilities'

export { pendingDialog }

const dialog = document.createElement('dialog')


const form = document.createElement('form')
form.setAttribute('method', 'dialog')
dialog.append(form)

const h3 = document.createElement('h3')
h3.innerText = '😎Hi mechid✨'
const p = document.createElement('p')
p.innerText = 'I create for u a Gift🎁'
form.append(h3, p)

const details = document.createElement('details')
form.append(details)

const summary = document.createElement('summary')
summary.innerText = 'but first, answer the questions:'
details.append(summary)

details.innerHTML+='<br>'


const selectLabel = document.createElement('label')
selectLabel.innerHTML = 'which <em>year</em> our first meeting?'
details.append(selectLabel)

const select = document.createElement('select')
select.required = true
selectLabel.append(select)

const emptyOption = new Option('', '', true, true)
emptyOption.disabled = true
emptyOption.hidden = true
select.append(emptyOption)

const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016]
const options = years.map(year => new Option(year, year))
select.append(...options)


const dateLabel = document.createElement('label')
dateLabel.innerHTML = '<br>which day I <em>born</em>?'
details.append(dateLabel)

const dateInput = document.createElement('input')
dateInput.type = 'date'
dateInput.setAttribute('value', '2000-01-29')
dateInput.required = true
dateLabel.append(dateInput)

details.innerHTML += '<br>'

const btn = document.createElement('button')
btn.type = 'button'
btn.innerText = 'locked'
btn.dataset.lock = '🔒'
btn.disabled = true
details.append(btn)






const transitionDuration = 500
dialog.style.transition = `transform ${transitionDuration}ms`
dialog.style.transform = 'scale(0)'

async function pendingDialog(ctx) {
  //  show up
  ctx.append(dialog)
  dialog.showModal()
  dialog.style.transform = 'scale(1)'
  await sleep(transitionDuration)
  dialogListener(dialog)

  //  click event (unlock)
  await eventPromise(btn, 'click')

  //  hide out
  dialog.style.transform = 'scale(0)'
  await sleep(transitionDuration)
  dialog.close()
  dialog.remove()
}