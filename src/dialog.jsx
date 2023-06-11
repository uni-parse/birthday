import { useState } from 'react'
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

details.innerHTML += '<br>'

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

export default function Dialog() {
  return (
    <dialog open>
      <form method='dialog'>
        <h3>😎Hi Uniparse✨</h3>
        <p>We create for u a Gift🎁</p>
        <Details />
      </form>
    </dialog>
  )
}

function Details() {
  const [meetingYear, setMeetingYear] = useState(null)
  const [birthday, setBirthday] = useState(null)

  return (
    <details>
      <summary>but first, answer the questions:</summary>
      <br />

      {meetingYear == 2014 ? (
        <output>
          Yes😁 <b>2014 ✓</b>
          <br />
          it's was awesome $
          {new Date().getFullYear() - 2014 + ' '}
          years of <b>friendship</b>!!
        </output>
      ) : (
        <label>
          which <em>year</em> our first meeting?
          <select
            required
            defaultValue=''
            onChange={e => setMeetingYear(e.target.value)}>
            <option disabled hidden></option>
            <option>2010</option>
            <option>2011</option>
            <option>2012</option>
            <option>2013</option>
            <option>2014</option>
            <option>2015</option>
            <option>2016</option>
          </select>
        </label>
      )}
      <br />
      <br />

      {
        <label>
          which day I <em>born</em>?
          <input
            type='date'
            value='2000-01-29'
            required
            onChange={e => setBirthday(e.target.value)}
          />
        </label>
      }
      <br />

      <button type='button' data-lock='🔒' disabled>
        locked
      </button>
    </details>
  )
}
