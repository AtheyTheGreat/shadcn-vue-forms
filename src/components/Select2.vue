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
        v-bind="selectAttrs"
      >
        <option v-if="placeholder && !(multiple && isSelect2)" :value="''" :selected="nothingSelected">
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
        v-bind="selectAttrs"
      >
        <option v-if="placeholder && !(multiple && isSelect2)" :value="''" :selected="nothingSelected">
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
import { computed, useAttrs, onMounted, onBeforeUnmount, watch } from 'vue'
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
  // Select2 specific props
  isAjax: {
    type: Boolean,
    default: false
  },
  isFirst: {
    type: Boolean,
    default: false
  },
  hideSearch: {
    type: Boolean,
    default: false
  },
  allowClear: {
    type: Boolean,
    default: true
  },
  tags: {
    type: Boolean,
    default: false
  },
  child: {
    type: String,
    default: ''
  },
  ajaxChild: {
    type: String,
    default: ''
  },
  ajaxUrl: {
    type: String,
    default: ''
  },
  selectedUrl: {
    type: String,
    default: ''
  },
  filterField: {
    type: String,
    default: ''
  },
  fallback: {
    type: String,
    default: ''
  },
  parentModal: {
    type: String,
    default: ''
  },
  framework: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

// Separate Vue attributes from regular HTML attributes
const attrs = useAttrs()
const selectAttrs = computed(() => {
  const { 
    class: cls, 
    style, 
    ...otherAttrs 
  } = attrs
  
  // Add Select2 specific data attributes
  const select2Attrs = {
    ...otherAttrs,
    ...(props.isAjax ? { 'data-ajax--url': props.ajaxUrl } : {}),
    ...(props.isAjax ? { 'data-is-ajax': 'true' } : {}),
    ...(props.hideSearch ? { 'data-minimum-results-for-search': 'Infinity' } : {}),
    ...(props.allowClear ? { 'data-allow-clear': 'true' } : {}),
    ...(props.tags ? { 'data-tags': 'true' } : {}),
    ...(props.child ? { 'data-child': props.child } : {}),
    ...(props.ajaxChild ? { 'data-ajax-child': props.ajaxChild } : {}),
    ...(props.filterField ? { 'data-filter-field': props.filterField } : {}),
    ...(props.fallback ? { 'data-fallback': props.fallback } : {}),
    ...(props.parentModal ? { 'data-parent-modal': props.parentModal } : {}),
    ...(props.isFirst ? { 'data-is-first': 'true' } : {}),
    ...(props.selectedUrl ? { 'data-selected-url': props.selectedUrl } : {})
  }
  
  // Add Select2 class
  if (!select2Attrs.class) {
    select2Attrs.class = ''
  }
  select2Attrs.class += ' select2-basic'
  
  return select2Attrs
})

const id = useId(props.name)
const { hasError, errorMessage } = useValidation(props.name)

// Handle Select2 initialization
let select2Instance = null

onMounted(() => {
  // Initialize Select2 if available
  if (typeof $ !== 'undefined' && typeof $.fn.select2 !== 'undefined') {
    const $element = $(`#${id}`)
    const config = {
      allowClear: props.allowClear,
      placeholder: props.placeholder || '',
      tags: props.tags,
      minimumResultsForSearch: props.hideSearch ? Infinity : 0
    }
    
    // Add AJAX configuration if needed
    if (props.isAjax && props.ajaxUrl) {
      config.ajax = {
        url: props.ajaxUrl,
        dataType: 'json',
        delay: 250,
        data: function (params) {
          return {
            q: params.term,
            page: params.page || 1
          }
        },
        processResults: function (data, params) {
          params.page = params.page || 1
          return {
            results: data.items || data,
            pagination: {
              more: (params.page * 30) < (data.total_count || data.length || 0)
            }
          }
        },
        cache: true
      }
    }
    
    // Initialize Select2
    select2Instance = $element.select2(config)
    
    // Handle value changes
    select2Instance.on('change', (e) => {
      handleChange(e)
    })
    
    // Handle cascade functionality if needed
    if (props.isFirst && props.child) {
      select2Instance.on('change', function () {
        const selectedValue = $(this).val()
        const $child = $(props.child)
        
        if ($child.length && typeof $child.select2 !== 'undefined') {
          // Clear child select
          $child.val(null).trigger('change')
          
          // Reload options if using AJAX
          if (props.ajaxUrl && selectedValue) {
            $child.select2('destroy')
            const childConfig = {
              ...config,
              ajax: {
                url: props.ajaxUrl,
                dataType: 'json',
                delay: 250,
                data: function (params) {
                  return {
                    q: params.term,
                    [props.filterField]: selectedValue,
                    page: params.page || 1
                  }
                },
                processResults: function (data, params) {
                  params.page = params.page || 1
                  return {
                    results: data.items || data,
                    pagination: {
                      more: (params.page * 30) < (data.total_count || data.length || 0)
                    }
                  }
                },
                cache: true
              }
            }
            $child.select2(childConfig)
          }
        }
      })
    }
  }
})

onBeforeUnmount(() => {
  // Destroy Select2 instance if it exists
  if (select2Instance) {
    select2Instance.select2('destroy')
  }
})

const handleChange = (event) => {
  const target = event.target || event.srcElement
  const selected = Array.from(target.selectedOptions).map(option => option.value)
  
  if (props.multiple) {
    emit('update:modelValue', selected)
  } else {
    emit('update:modelValue', target.value)
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
  
  // Add Select2 class
  classes += ' select2-basic'
  
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