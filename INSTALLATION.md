# Installation

## Prerequisites

- Node.js >= 16.0.0
- npm or yarn
- A Vue 3 project

## Installation

### Using npm

```bash
npm install shadcn-vue-forms
```

### Using yarn

```bash
yarn add shadcn-vue-forms
```

## Setup

### Global Registration

To register all components globally, import and use the plugin in your main.js file:

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import ShadcnVueForms from 'shadcn-vue-forms'

const app = createApp(App)
app.use(ShadcnVueForms)
app.mount('#app')
```

### Individual Component Registration

If you prefer to import only the components you need:

```javascript
import { ShadcnForm, ShadcnInput, ShadcnSelect, ShadcnTextarea } from 'shadcn-vue-forms'

export default {
  components: {
    ShadcnForm,
    ShadcnInput,
    ShadcnSelect,
    ShadcnTextarea
  }
}
```

### Direct Import in Templates

You can also import components directly in your Vue templates:

```vue
<template>
  <ShadcnForm>
    <ShadcnInput name="email" label="Email" />
  </ShadcnForm>
</template>

<script setup>
import { ShadcnForm, ShadcnInput } from 'shadcn-vue-forms'
</script>
```

## Styling

This package uses shadcn-ui styling, which requires Tailwind CSS. Make sure you have Tailwind CSS configured in your project.

If you're not using Tailwind CSS, you can import the basic styles:

```javascript
import 'shadcn-vue-forms/src/styles.css'
```

## Framework Support

The package supports multiple CSS frameworks:

- shadcn (default)
- bootstrap

You can specify the framework when using components:

```vue
<ShadcnInput 
  name="name" 
  label="Name" 
  framework="bootstrap"
/>
```

Or set it globally in a form:

```vue
<ShadcnForm framework="bootstrap">
  <ShadcnInput name="name" label="Name" />
</ShadcnForm>
```