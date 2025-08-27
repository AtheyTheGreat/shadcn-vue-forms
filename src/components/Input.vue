<template>
  <div :class="wrap ? `mb-4 ${floating ? 'form-floating' : inline ? 'row' : ''}` : ''">
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
      <slot name="prepend" />

      <input
        :id="id"
        :class="inputClasses"
        :type="type"
        :name="name"
        :value="modelValue"
        :placeholder="floating || placeholder ? placeholder || (floating ? ' ' : '') : undefined"
        :required="required"
        @input="handleInput"
        v-bind="attrs"
      />

      <slot name="append" />
    </div>

    <template v-else>
      <slot name="prepend" />

      <input
        :id="id"
        :class="inputClasses"
        :type="type"
        :name="name"
        :value="modelValue"
        :placeholder="floating || placeholder ? placeholder || (floating ? ' ' : '') : undefined"
        :required="required"
        @input="handleInput"
        v-bind="attrs"
      />

      <slot name="append" />
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
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: [String, Number],
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
  wrap: {
    type: Boolean,
    default: true
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

const inputClasses = computed(() => {
  let classes = 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  
  if (hasError.value && props.showErrors) {
    classes += ' border-destructive'
  }
  
  if (props.type === 'color') {
    classes += ' h-12 px-1 py-1'
  }
  
  return classes
})
</script>