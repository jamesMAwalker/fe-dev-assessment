export const formatToYM = (newDate: Date | string) => {
  const date = new Date(newDate)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  return `${year}-${month}`
}

export const formatToYMD = (newDate: Date | string) => {
  const date = new Date(newDate)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = '01'
  return `${year}-${month}-${day}`
}

export const getMonthName = (date: string) => {
  const formatMe = new Date(date)
  return formatMe.toLocaleString('default', { month: 'short' })
}
