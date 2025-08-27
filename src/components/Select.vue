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
      <select
        :id="id"
        :class="selectClasses"
        :name="name"
        :required="required"
        :multiple="multiple"
        :disabled="disabled"
        @change="handleChange"
        v-bind="attrs"
      >
        <option v-if="placeholder && !(isSelect2 && multiple)" :value="''" :selected="nothingSelected">
          {{ placeholder }}
        </option>
        <option
          v-for="(option, key) in options"
          :key="key"
          :value="key"
          :selected="isSelected(key)"
        >
          {{ option }}
        </option>
        <slot v-if="!options || Object.keys(options).length === 0" />
      </select>
    </div>

    <template v-else>
      <select
        :id="id"
        :class="selectClasses"
        :name="name"
        :required="required"
        :multiple="multiple"
        :disabled="disabled"
        @change="handleChange"
        v-bind="attrs"
      >
        <option v-if="placeholder && !(isSelect2 && multiple)" :value="''" :selected="nothingSelected">
          {{ placeholder }}
        </option>
        <option
          v-for="(option, key) in options"
          :key="key"
          :value="key"
          :selected="isSelected(key)"
        >
          {{ option }}
        </option>
        <slot v-if="!options || Object.keys(options).length === 0" />
      </select>
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
  options: {
    type: Object,
    default: () => ({})
  },
  modelValue: {
    type: [String, Number, Array],
    default: null
  },
  multiple: {
    type: Boolean,
    default: false
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
  placeholder: {
    type: String,
    default: ''
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
  disabled: {
    type: Boolean,
    default: false
  },
  isSelect2: {
    type: Boolean,
    default: false
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

const handleChange = (event) => {
  const selected = Array.from(event.target.selectedOptions).map(option => option.value)
  
  if (props.multiple) {
    emit('update:modelValue', selected)
  } else {
    emit('update:modelValue', event.target.value)
  }
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

const selectClasses = computed(() => {
  let classes = 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  
  if (props.multiple) {
    classes += ' h-auto'
  }
  
  if (hasError.value && props.showErrors) {
    classes += ' border-destructive'
  }
  
  return classes
})

const isSelected = (key) => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(key)
  }
  return props.modelValue === key
}

const nothingSelected = computed(() => {
  if (props.multiple) {
    return !Array.isArray(props.modelValue) || props.modelValue.length === 0
  }
  return props.modelValue === null || props.modelValue === undefined
})
</script>