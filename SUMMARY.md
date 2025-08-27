# Shadcn Vue Forms - Summary

This project is a Vue 3 implementation of form components inspired by the Javaabu/Forms Laravel package, but with a modern shadcn-ui design instead of Bootstrap.

## Features Implemented

### 1. Core Components
- **Form**: Main form wrapper with method spoofing support (PUT, PATCH, DELETE)
- **Input**: Versatile input component supporting various types (text, email, password, etc.)
- **Select**: Dropdown component with single/multiple selection support
- **Textarea**: Multi-line text input component
- **Label**: Label component with required indicator support

### 2. Framework Support
- **shadcn-ui**: Default styling with Tailwind CSS
- **Bootstrap**: Alternative styling for projects using Bootstrap
- Configurable framework settings through a centralized configuration system

### 3. Advanced Features
- **Model Binding**: Support for binding form data to Vue reactive objects
- **Validation**: Integration with validation error handling
- **Floating Labels**: Support for floating label design pattern
- **Inline Forms**: Support for horizontal form layouts
- **Accessibility**: Proper ARIA attributes and keyboard navigation support

### 4. Laravel Integration
- **CSRF Protection**: Automatic CSRF token handling
- **Method Spoofing**: Support for PUT, PATCH, DELETE methods
- **Validation Errors**: Integration with Laravel's validation error system
- **Inertia.js Support**: Ready for use with Inertia.js in Laravel applications

## Architecture

### Component Structure
The components follow a similar architecture to the Javaabu/Forms package:

1. **Base Component**: Abstract base class with common functionality
2. **Individual Components**: Specific form elements extending the base component
3. **Composables**: Reusable logic for ID generation, validation, etc.
4. **Utils**: Utility functions for framework configuration and icon handling

### Configuration System
The package uses a configuration system similar to Javaabu/Forms:

```javascript
// config.js
export const config = {
  framework: 'shadcn',
  frameworks: {
    shadcn: {
      // shadcn-specific settings
    },
    bootstrap: {
      // Bootstrap-specific settings
    }
  }
}
```

### Composables
Reusable logic is implemented as Vue composables:

- `useId`: Generates unique IDs for form elements
- `useValidation`: Handles validation error display
- `useFramework`: Manages framework-specific settings

## Usage Examples

### Basic Form
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
```

### Laravel Integration
```vue
<template>
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
      :error="errors.name"
      framework="shadcn"
    />
  </ShadcnForm>
</template>
```

## Key Differences from Javaabu/Forms

1. **Frontend Framework**: Vue 3 instead of Blade components
2. **Styling**: shadcn-ui/Tailwind CSS instead of Bootstrap
3. **Reactivity**: Fully reactive with Vue's Composition API
4. **Validation**: Client-side validation integration
5. **Build System**: Modern build system with Vite

## Future Enhancements

1. **Additional Components**: 
   - File upload
   - Date/Time pickers
   - WYSIWYG editor
   - Checkbox/Radio groups

2. **Advanced Features**:
   - Form wizard support
   - Conditional fields
   - Form validation schemas
   - Internationalization support

3. **Framework Extensions**:
   - Material Design support
   - Bulma support
   - Custom theme support

This implementation provides a solid foundation for building beautiful, functional forms in Vue applications while maintaining the flexibility and extensibility of the original Javaabu/Forms package.