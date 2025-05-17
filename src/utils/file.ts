import { env } from './env'

/**
 * Utility function to handle file url in case of local file uploads
 * @param {string} url
 */
export function handleFileUrl(url: string): string {
  if (!url) {
    return ''
  }
  if (url.startsWith('http') || url.startsWith('blob:')) {
    return url
  }
  return `${env.VITE_API_URL}/public/${url}`
}
