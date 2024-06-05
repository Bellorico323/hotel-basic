export function formatDate(date: string) {
  const dateWithUsTimezone = new Date(date)

  const dateWithBRTimezone = dateWithUsTimezone.setHours(
    dateWithUsTimezone.getHours() + 0,
  )

  return new Date(dateWithBRTimezone).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo',
  })
}
