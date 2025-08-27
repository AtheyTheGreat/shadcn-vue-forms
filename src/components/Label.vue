<template>
  <label
    :for="forProp"
    :class="labelClasses"
  >
    <slot />
    <span v-if="required && !floating" class="text-destructive">*</span>
  </label>
</template>

<script setup>
import { computed, inject } from 'vue'
import { getFrameworkClass } from '../utils/framework'

const props = defineProps({
  forProp: {
    type: String,
    default: ''
  },
  inline: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  floating: {
    type: Boolean,
    default: false
  },
  inlineLabelClass: {
    type: String,
    default: ''
  }
})

const framework = inject('framework', '')

const labelClasses = computed(() => {
  if (props.floating) {
    return 'absolute top-0 left-0 z-[1] w-full h-full text-muted-foreground pointer-events-none truncate pt-2 ps-3 pe-12 text-left'
  }
  
  if (props.inline) {
    const frameworkClass = getFrameworkClass('inline-label-class', framework)
    return `col-form-label ${props.inlineLabelClass || frameworkClass || 'col-sm-3 col-lg-2'}`
  }
  
  return 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
})
</script>