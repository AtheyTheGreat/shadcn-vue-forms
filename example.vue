<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Shadcn Vue Forms Example</h1>
    
    <ShadcnForm method="POST" :model="form">
      <ShadcnInput 
        name="name" 
        label="Full Name" 
        v-model="form.name" 
        placeholder="Enter your full name"
        required
      />
      
      <ShadcnInput 
        name="email" 
        label="Email Address" 
        type="email"
        v-model="form.email" 
        placeholder="Enter your email"
        required
      />
      
      <ShadcnSelect 
        name="role" 
        label="Role" 
        :options="roles" 
        v-model="form.role" 
        placeholder="Select a role"
        required
      />
      
      <ShadcnSelect2 
        name="country" 
        label="Country" 
        :options="countries" 
        v-model="form.country" 
        placeholder="Select a country"
      />
      
      <ShadcnTextarea 
        name="bio" 
        label="Bio" 
        v-model="form.bio" 
        placeholder="Tell us about yourself"
        :rows="4"
      />
      
      <div class="flex justify-end">
        <button 
          type="submit"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Submit
        </button>
      </div>
    </ShadcnForm>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ShadcnForm, ShadcnInput, ShadcnSelect, ShadcnSelect2, ShadcnTextarea } from './src/index.js'

const form = ref({
  name: '',
  email: '',
  role: '',
  country: '',
  bio: ''
})

const roles = {
  admin: 'Administrator',
  editor: 'Editor',
  user: 'User'
}

const countries = {
  'lk': 'Sri Lanka',
  'us': 'United States',
  'uk': 'United Kingdom',
  'ca': 'Canada',
  'au': 'Australia'
}

// Example of setting validation errors
// import { setValidationErrors } from './src/composables/useValidation'
// setValidationErrors({
//   name: 'Name is required',
//   email: 'Email must be a valid email address'
// })
</script>