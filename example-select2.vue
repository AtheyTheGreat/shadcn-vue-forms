<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Select2 Component Examples</h1>
    
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Basic Select2</h2>
      <Select2 
        name="country" 
        label="Country" 
        :options="countries" 
        v-model="selectedCountry"
      />
      <p class="mt-2">Selected: {{ selectedCountry }}</p>
    </div>
    
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Select2 with AJAX</h2>
      <Select2 
        name="ajax_country" 
        label="Country (AJAX)" 
        :options="initialCountries" 
        v-model="selectedAjaxCountry"
        :is-ajax="true"
        ajax-url="/api/countries"
      />
      <p class="mt-2">Selected: {{ selectedAjaxCountry }}</p>
    </div>
    
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Select2 with Search Disabled</h2>
      <Select2 
        name="country_no_search" 
        label="Country (No Search)" 
        :options="countries" 
        v-model="selectedCountryNoSearch"
        :hide-search="true"
      />
      <p class="mt-2">Selected: {{ selectedCountryNoSearch }}</p>
    </div>
    
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Select2 with Clear Disabled</h2>
      <Select2 
        name="country_no_clear" 
        label="Country (No Clear)" 
        :options="countries" 
        v-model="selectedCountryNoClear"
        :allow-clear="false"
      />
      <p class="mt-2">Selected: {{ selectedCountryNoClear }}</p>
    </div>
    
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-2">Select2 with Tags</h2>
      <Select2 
        name="categories" 
        label="Categories" 
        :options="categories" 
        v-model="selectedCategories"
        :multiple="true"
        :tags="true"
      />
      <p class="mt-2">Selected: {{ selectedCategories }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Select2 } from './src/components'

// Basic options
const countries = {
  'lk': 'Sri Lanka',
  'us': 'United States',
  'uk': 'United Kingdom',
  'ca': 'Canada',
  'au': 'Australia'
}

const categories = {
  'tech': 'Technology',
  'sports': 'Sports',
  'music': 'Music'
}

// Initial values for AJAX example
const initialCountries = {
  'lk': 'Sri Lanka',
  'us': 'United States'
}

// Reactive values
const selectedCountry = ref('')
const selectedAjaxCountry = ref('')
const selectedCountryNoSearch = ref('')
const selectedCountryNoClear = ref('')
const selectedCategories = ref([])
</script>