import { ref, getCurrentInstance } from 'vue'

let idCounter = 0

export function useId(name) {
  const instance = getCurrentInstance()
  
  // Generate ID based on name or use a counter
  if (name) {
    return name.replace(/[\[\]]/g, '-').replace(/-$/, '')
  }
  
  idCounter++
  return `field-${idCounter}`
}