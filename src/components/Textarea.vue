<template>
  <div :class="`mb-4 ${floating ? 'form-floating' : inline ? 'row' : ''}`">
    <Label
      v-if="showLabel && !floating"
      :for="id"
      :inline="inline"
      :required="required"
      :inlineLabelClass="effectiveInlineLabelClass"
    >
      {{ label || generateLabel() }}
    </Label>

    <div v-if="inline && !floating" :class="effectiveInlineInputClass">
      <textarea
        :id="id"
        :class="textareaClasses"
        :name="name"
        :value="modelValue"
        :placeholder="floating || placeholder ? placeholder || (floating ? ' ' : '') : undefined"
        :required="required"
        :rows="rows"
        @input="handleInput"
        v-bind="attrs"
      ></textarea>
    </div>

    <template v-else>
      <textarea
        :id="id"
        :class="textareaClasses"
        :name="name"
        :value="modelValue"
        :placeholder="floating || placeholder ? placeholder || (floating ? ' ' : '') : undefined"
        :required="required"
        :rows="rows"
        @input="handleInput"
        v-bind="attrs"
      ></textarea>
    </template>

    <Label v-if="floating" :for="id" floating>
      {{ label || generateLabel() }}
    </Label>

    <p v-if="help" class="text-sm text-muted-foreground mt-1">
      {{ help }}
    </p>

    <div v-if="hasError && showErrors" class="text-sm font-medium text-destructive mt-1">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { computed, useAttrs } from 'vue'
import Label from './Label.vue'
import { useId } from '@/composables/useId'
import { useValidation } from '@/composables/useValidation'
import { getFrameworkClass } from '../utils/framework'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  inline: {
    type: Boolean,
    default: false
  },
  floating: {
    type: Boolean,
    default: false
  },
  showLabel: {
    type: Boolean,
    default: true
  },
  inlineLabelClass: {
    type: String,
    default: ''
  },
  inlineInputClass: {
    type: String,
    default: ''
  },
  showErrors: {
    type: Boolean,
    default: true
  },
  help: {
    type: String,
    default: ''
  },
  rows: {
    type: Number,
    default: 3
  },
  framework: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const attrs = useAttrs()
const id = useId(props.name)

const { hasError, errorMessage } = useValidation(props.name)

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const generateLabel = () => {
  // Convert name to label (e.g., 'first_name' -> 'First Name')
  return props.name
    .replace(/[_\[\]]/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
    .trim()
}

const effectiveInlineLabelClass = computed(() => {
  if (props.inlineLabelClass) {
    return props.inlineLabelClass
  }
  return getFrameworkClass('inline-label-class', props.framework)
})

const effectiveInlineInputClass = computed(() => {
  if (props.inlineInputClass) {
    return props.inlineInputClass
  }
  return getFrameworkClass('inline-input-class', props.framework)
})

const textareaClasses = computed(() => {
  let classes = 'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  
  if (hasError.value && props.showErrors) {
    classes += ' border-destructive'
  }
  
  return classes
})
</script>