export { sleep, whilePending, getEventPromise }

function sleep(ms) {
  return new Promise(rs => setTimeout(rs, ms))
}

async function whilePending(promises, callback) {
  if (await promisesState(promises) != 'pending') return false

  callback()
  await Promise.all(promises)
  return true
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

    if (state == 'rejected') return 'rejected'

    status.add(state)
  }

  return status.has('pending') ? 'pending' : 'fulfilled'
}

function getEventPromise(target, event) {
  return new Promise(
    rs => target.addEventListener(event, rs, { once: true })
  )
}