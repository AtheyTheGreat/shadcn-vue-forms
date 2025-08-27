<template>
  <form
    :method="spoofMethod ? 'POST' : method"
    :enctype="files ? 'multipart/form-data' : undefined"
    v-bind="attrs"
  >
    <input v-if="!isGetMethod" type="hidden" name="_token" :value="csrfToken" />
    <input v-if="spoofMethod" type="hidden" name="_method" :value="method" />
    <slot />
  </form>
</template>

<script setup>
import { computed, useAttrs, provide } from 'vue'

const props = defineProps({
  method: {
    type: String,
    default: 'POST'
  },
  model: {
    type: [Object, null],
    default: null
  },
  files: {
    type: Boolean,
    default: false
  },
  framework: {
    type: String,
    default: ''
  }
})

const attrs = useAttrs()

const spoofMethod = computed(() => ['PUT', 'PATCH', 'DELETE'].includes(props.method.toUpperCase()))
const isGetMethod = computed(() => props.method.toUpperCase() === 'GET')

// In a real Laravel app, you would get this from the backend
const csrfToken = 'YOUR_CSRF_TOKEN_HERE'

// Provide the framework to child components
provide('framework', props.framework)
</script>