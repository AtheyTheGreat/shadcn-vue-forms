# Laravel Integration Guide

This guide explains how to integrate the Shadcn Vue Forms package with a Laravel 12 Breeze application.

## Installation

1. First, install the package in your Laravel project:

```bash
npm install shadcn-vue-forms
```

2. If you're using the package locally, you can link it:

```bash
npm link /path/to/shadcn-vue-forms
```

## Setup

1. In your `resources/js/app.js` file, import and register the components:

```javascript
import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';

// Import the form components
import ShadcnVueForms from 'shadcn-vue-forms';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(ShadcnVueForms) // Register the form components
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
```

2. If you prefer to import individual components, you can do so:

```javascript
import { ShadcnForm, ShadcnInput, ShadcnSelect, ShadcnTextarea } from 'shadcn-vue-forms';

// Register globally
const app = createApp({ render: () => h(App, props) })
app.component('ShadcnForm', ShadcnForm)
app.component('ShadcnInput', ShadcnInput)
app.component('ShadcnSelect', ShadcnSelect)
app.component('ShadcnTextarea', ShadcnTextarea)
```

## Usage in Inertia Pages

You can now use the components in your Inertia Vue pages:

```vue
<template>
  <AuthenticatedLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
        <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
          <ShadcnForm 
            method="POST" 
            :model="user" 
            :action="route('profile.update')"
            framework="shadcn"
          >
            <ShadcnInput 
              name="name" 
              label="Name" 
              v-model="user.name" 
              required
              framework="shadcn"
            />
            
            <ShadcnInput 
              name="email" 
              label="Email" 
              type="email"
              v-model="user.email" 
              required
              framework="shadcn"
            />
            
            <div class="flex items-center gap-4">
              <button 
                type="submit"
                class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
              >
                Save
              </button>
            </div>
          </ShadcnForm>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { ref } from 'vue';

const props = defineProps({
    user: Object,
});

const user = ref(props.user);
</script>
```

## Handling Validation Errors

The package integrates with Laravel's validation errors. To display errors, you need to pass them to the frontend. In your Inertia controllers, you can use the `share` method:

```php
// In your controller
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
        ]);

        $request->user()->update($request->only('name', 'email'));

        return redirect()->back();
    }
}
```

In your Vue component, you can use the `useValidation` composable to handle errors:

```vue
<script setup>
import { onMounted } from 'vue';
import { useValidation, setValidationErrors } from 'shadcn-vue-forms';

// Get errors from Inertia props
const props = defineProps({
    errors: Object,
});

// Set validation errors when component mounts
onMounted(() => {
    if (props.errors) {
        setValidationErrors(props.errors);
    }
});
</script>
```

## Customizing Styles

The components use shadcn-ui styling by default. If you want to customize the styles, you can override the CSS classes:

```vue
<ShadcnInput 
  name="name" 
  label="Name" 
  v-model="user.name" 
  class="border-red-500 focus:ring-red-500"
/>
```

Or you can create a custom theme by modifying the CSS variables in your `resources/css/app.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 47.4% 11.2%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 47.4% 11.2%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 100% 50%;
  --destructive-foreground: 210 40% 98%;
  --ring: 215 20.2% 65.1%;
  --radius: 0.5rem;
}
```

## Framework Support

The package supports different CSS frameworks. You can specify the framework when using components:

```vue
<ShadcnInput 
  name="name" 
  label="Name" 
  v-model="user.name" 
  framework="bootstrap"
/>
```

Supported frameworks:
- `shadcn` (default)
- `bootstrap`

## Laravel Breeze Specific Integration

If you're using Laravel Breeze, you might want to replace the default form components in the profile edit page. Here's how you can do it:

1. Open `resources/js/Pages/Profile/Edit.vue`
2. Replace the form elements with the Shadcn Vue Forms components
3. Update the form submission logic to work with Inertia

Example replacement for the profile update form:

```vue
<ShadcnForm 
  :model="user"
  @submit.prevent="updateProfile"
>
  <ShadcnInput 
    name="name" 
    label="Name" 
    v-model="user.name" 
    :error="form.errors.name"
    framework="shadcn"
  />
  
  <ShadcnInput 
    name="email" 
    label="Email" 
    type="email"
    v-model="user.email" 
    :error="form.errors.email"
    framework="shadcn"
  />
  
  <div class="flex items-center gap-4">
    <button 
      type="submit"
      :disabled="form.processing"
      class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
    >
      Save
    </button>
  </div>
</ShadcnForm>
```

This approach will give you a modern, shadcn-inspired look for your Laravel Breeze forms while maintaining all the functionality you expect from a Laravel application.