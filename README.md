# Shadcn Vue Forms

A Vue component library for building forms with shadcn-ui styling, designed to work seamlessly with Laravel applications.

## Features

- Vue 3 components with Composition API
- shadcn-ui styling
- Laravel integration
- Form binding and validation
- Responsive design
- Accessible components

## Installation

```bash
npm install shadcn-vue-forms
```

## Usage

```vue
<template>
  <ShadcnForm method="POST" :model="user">
    <ShadcnInput name="name" label="Name" v-model="user.name" />
    <ShadcnInput name="email" type="email" label="Email" v-model="user.email" />
    <ShadcnSelect 
      name="role" 
      label="Role" 
      :options="{ admin: 'Administrator', user: 'User' }" 
      v-model="user.role" 
    />
    <ShadcnTextarea name="bio" label="Bio" v-model="user.bio" />
  </ShadcnForm>
</template>

<script setup>
import { ref } from 'vue'
import { ShadcnForm, ShadcnInput, ShadcnSelect, ShadcnTextarea } from 'shadcn-vue-forms'

const user = ref({
  name: '',
  email: '',
  role: '',
  bio: ''
})
</script>
```

## Components

### Form

The main form component that handles form submission and method spoofing.

```vue
<ShadcnForm 
  method="POST" 
  :model="model" 
  :files="false"
>
  <!-- form fields -->
</ShadcnForm>
```

Props:
- `method`: HTTP method (GET, POST, PUT, PATCH, DELETE)
- `model`: The model to bind to the form
- `files`: Whether the form should support file uploads

### Input

A versatile input component for various input types.

```vue
<ShadcnInput 
  name="title" 
  label="Title" 
  v-model="form.title" 
  type="text"
/>
```

Props:
- `name`: Input name
- `label`: Input label
- `type`: Input type (text, email, password, etc.)
- `modelValue`: v-model value
- `placeholder`: Placeholder text
- `required`: Whether the field is required
- `inline`: Whether to display inline
- `floating`: Whether to use floating labels
- `showLabel`: Whether to show the label
- `inlineLabelClass`: Custom class for inline label
- `inlineInputClass`: Custom class for inline input
- `showErrors`: Whether to show validation errors
- `help`: Help text
- `wrap`: Whether to wrap in a container div

### Select

A select dropdown component.

```vue
<ShadcnSelect 
  name="category" 
  label="Category" 
  :options="{ 1: 'Option 1', 2: 'Option 2' }" 
  v-model="form.category"
/>
```

Props:
- `name`: Select name
- `label`: Select label
- `options`: Object of options (key-value pairs)
- `modelValue`: v-model value
- `multiple`: Whether to allow multiple selection
- `required`: Whether the field is required
- `inline`: Whether to display inline
- `floating`: Whether to use floating labels
- `placeholder`: Placeholder text
- `showLabel`: Whether to show the label
- `inlineLabelClass`: Custom class for inline label
- `inlineInputClass`: Custom class for inline input
- `showErrors`: Whether to show validation errors
- `help`: Help text
- `disabled`: Whether the select is disabled
- `isSelect2`: Whether to use Select2 styling (placeholder)

### Textarea

A textarea component for multi-line text input.

```vue
<ShadcnTextarea 
  name="description" 
  label="Description" 
  v-model="form.description" 
  :rows="5"
/>
```

Props:
- `name`: Textarea name
- `label`: Textarea label
- `modelValue`: v-model value
- `placeholder`: Placeholder text
- `required`: Whether the field is required
- `inline`: Whether to display inline
- `floating`: Whether to use floating labels
- `showLabel`: Whether to show the label
- `inlineLabelClass`: Custom class for inline label
- `inlineInputClass`: Custom class for inline input
- `showErrors`: Whether to show validation errors
- `help`: Help text
- `rows`: Number of rows

## Laravel Integration

This package is designed to work seamlessly with Laravel applications. It supports:

- Model binding
- Validation error display
- CSRF token handling
- Method spoofing for PUT, PATCH, and DELETE requests

## Styling

Components use shadcn-ui styling classes. Make sure you have shadcn-ui configured in your project.

## License

MIT