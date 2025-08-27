<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">User Profile Form</h1>
    
    <ShadcnForm 
      method="POST" 
      :model="user" 
      framework="shadcn"
      @submit.prevent="handleSubmit"
    >
      <ShadcnInput 
        name="name" 
        label="Full Name" 
        v-model="user.name" 
        placeholder="Enter your full name"
        required
        framework="shadcn"
      />
      
      <ShadcnInput 
        name="email" 
        label="Email Address" 
        type="email"
        v-model="user.email" 
        placeholder="Enter your email"
        required
        framework="shadcn"
      />
      
      <ShadcnSelect 
        name="role" 
        label="Role" 
        :options="roles" 
        v-model="user.role" 
        placeholder="Select a role"
        required
        framework="shadcn"
      />
      
      <ShadcnTextarea 
        name="bio" 
        label="Bio" 
        v-model="user.bio" 
        placeholder="Tell us about yourself"
        :rows="4"
        framework="shadcn"
      />
      
      <div class="flex justify-end gap-2 mt-6">
        <button 
          type="button"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Cancel
        </button>
        <button 
          type="submit"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Save Profile
        </button>
      </div>
    </ShadcnForm>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ShadcnForm, ShadcnInput, ShadcnSelect, ShadcnTextarea } from './src/index.js'

// Example user data (would come from Laravel backend in a real app)
const user = ref({
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
  bio: 'Software developer with 5 years of experience.'
})

// Example roles (would come from Laravel backend in a real app)
const roles = {
  admin: 'Administrator',
  editor: 'Editor',
  user: 'User'
}

const handleSubmit = () => {
  // In a real app, you would submit the form data to your Laravel backend
  console.log('Form submitted:', user.value)
  alert('Profile saved successfully!')
}
</script>

<style>
/* Import shadcn-ui CSS variables */
@import './src/styles.css';
</style>