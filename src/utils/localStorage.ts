export const getLocalStorage = (
  storageName: string,
  valueType: '[]' | '{}',
  emptyType: '[]' | '{}' | 'null'
) => {
  let value
  try {
    value = JSON.parse(localStorage.getItem(storageName) || emptyType)
  } catch (err) {
    localStorage.setItem(storageName, emptyType)
  }
  if (
    (valueType === '[]' && !Array.isArray(value)) ||
    (valueType === '{}' &&
      !(typeof value === 'object' && value !== null && !Array.isArray(value)))
  ) {
    value = JSON.parse(emptyType)
    localStorage.setItem(storageName, emptyType)
  }
  return value
}
