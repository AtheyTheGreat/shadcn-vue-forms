import { ref, computed } from 'vue'

// In a real implementation, this would integrate with Laravel's validation errors
// For now, we'll simulate error handling
const validationErrors = ref({})

export function useValidation(name) {
  const hasError = computed(() => {
    return !!validationErrors.value[name]
  })
  
  const errorMessage = computed(() => {
    return validationErrors.value[name] || ''
  })
  
  return {
    hasError,
    errorMessage
  }
}

// Function to set validation errors (would be called from Laravel backend)
export function setValidationErrors(errors) {
  validationErrors.value = errors
}