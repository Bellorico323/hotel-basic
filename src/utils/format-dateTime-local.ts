export function formatDateTimeLocal(dateString: string) {
  const date = new Date(dateString)

  // Adiciona 3 horas à data
  date.setHours(date.getHours() + 0)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}`
}
