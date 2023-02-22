export { sleep, whilePending, eventPromise }

function sleep(ms) {
  return new Promise(rs => setTimeout(rs, ms))
}

async function whilePending(promises, onPending, onSettled) {
  let state = await promisesState(promises)
  if (state != 'pending') return

  await onPending()
  state = await Promise.all(promises)
  await onSettled?.()
}

async function promisesState(promises) {
  if (!Array.isArray(promises)) { // single promise
    const t = {}
    return await Promise.race([promises, t])
      .then(v => v === t ? 'pending' : 'fulfilled')
      .catch(() => 'rejected')
  }

  const status = new Set()

  for (const p of promises) {
    const t = {}
    const state = await Promise.race([p, t])
      .then(v => v === t ? 'pending' : 'fulfilled')
      .catch(() => 'rejected')

    if (state == 'rejected') return state

    status.add(state)
  }

  return status.has('pending') ? 'pending' : 'fulfilled'
}

function eventPromise(target, event) {
  return new Promise(
    rs => target.addEventListener(event, rs, { once: true })
  )
}