export const toLocalDateString = (dateString: string) => {
  const formattedDate = new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return formattedDate
}
