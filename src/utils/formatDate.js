export default function formatDate (date) {
  if (!date) {
    return ''
  }

  // get month short name
  const month = date.toLocaleString('default', { month: 'short' })

  const day = date.getDate()
  const year = date.getFullYear()

  return `${month} ${day}, ${year}`
}
