export function getCookie(name: string): string | undefined {
  if (typeof window === 'undefined') {
    return undefined
  }
  const value = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
  return value?.split('=')[1]
}
