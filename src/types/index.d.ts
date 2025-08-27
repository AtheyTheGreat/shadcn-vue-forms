export interface FormProps {
  method?: string
  model?: object | null
  files?: boolean
  framework?: string
}

export interface InputProps {
  name: string
  label?: string
  type?: string
  modelValue?: string | number
  placeholder?: string
  required?: boolean
  inline?: boolean
  floating?: boolean
  showLabel?: boolean
  inlineLabelClass?: string
  inlineInputClass?: string
  showErrors?: boolean
  help?: string
  wrap?: boolean
  framework?: string
}

export interface SelectProps {
  name: string
  label?: string
  options?: Record<string, string>
  modelValue?: string | number | string[]
  multiple?: boolean
  required?: boolean
  inline?: boolean
  floating?: boolean
  placeholder?: string
  showLabel?: boolean
  inlineLabelClass?: string
  inlineInputClass?: string
  showErrors?: boolean
  help?: string
  disabled?: boolean
  isSelect2?: boolean
  framework?: string
}

export interface TextareaProps {
  name: string
  label?: string
  modelValue?: string
  placeholder?: string
  required?: boolean
  inline?: boolean
  floating?: boolean
  showLabel?: boolean
  inlineLabelClass?: string
  inlineInputClass?: string
  showErrors?: boolean
  help?: string
  rows?: number
  framework?: string
}

export interface LabelProps {
  forProp?: string
  inline?: boolean
  required?: boolean
  floating?: boolean
  inlineLabelClass?: string
}