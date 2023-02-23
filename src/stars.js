export const stars = [1, 2, 3].map(i => {
  const star = document.createElement('div')
  star.id = `star${i}`
  return star
})