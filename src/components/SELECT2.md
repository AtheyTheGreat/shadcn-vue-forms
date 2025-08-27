# Select2 Component

The Select2 component is an enhanced version of the standard select component that provides additional features like search, AJAX loading, tagging, and cascading selects.

## Features

- Searchable dropdowns
- AJAX data loading
- Tagging support
- Cascading selects
- Modal support
- Custom styling options

## Basic Usage

```vue
<ShadcnSelect2 
  name="country" 
  label="Country" 
  :options="{ 'lk': 'Sri Lanka', 'us': 'United States' }" 
  v-model="form.country"
/>
```

## AJAX Loading

Load options dynamically from an API endpoint:

```vue
<ShadcnSelect2 
  name="country" 
  label="Country" 
  :options="initialCountries" 
  v-model="form.country"
  :is-ajax="true"
  ajax-url="/api/countries"
/>
```

## Hiding Search

Hide the search box for simple selects:

```vue
<ShadcnSelect2 
  name="country" 
  label="Country" 
  :options="{ 'lk': 'Sri Lanka', 'us': 'United States' }" 
  v-model="form.country"
  :hide-search="true"
/>
```

## Disabling Clear

Prevent users from clearing their selection:

```vue
<ShadcnSelect2 
  name="country" 
  label="Country" 
  :options="{ 'lk': 'Sri Lanka', 'us': 'United States' }" 
  v-model="form.country"
  :allow-clear="false"
/>
```

## Tags Support

Allow users to add their own options:

```vue
<ShadcnSelect2 
  name="categories" 
  label="Categories" 
  :options="{ 'tech': 'Technology', 'sports': 'Sports' }" 
  v-model="form.categories"
  :multiple="true"
  :tags="true"
/>
```

## Cascading Selects

Create dependent selects where options in one select depend on the selection in another:

```vue
<ShadcnSelect2 
  name="country" 
  label="Country" 
  :options="countries" 
  v-model="form.country"
  child="#state"
  :is-first="true"
/>

<ShadcnSelect2 
  name="state" 
  label="State" 
  :options="states" 
  v-model="form.state"
  :ajax-url="/api/states"
  filter-field="country"
  child="#city"
/>

<ShadcnSelect2 
  name="city" 
  label="City" 
  :options="cities" 
  v-model="form.city"
  :ajax-url="/api/cities"
  filter-field="state"
/>
```

## Modal Support

When using Select2 inside a modal, specify the parent modal to ensure proper rendering:

```vue
<Modal id="myModal">
  <ShadcnSelect2 
    name="country" 
    label="Country" 
    :options="{ 'lk': 'Sri Lanka', 'us': 'United States' }" 
    v-model="form.country"
    parent-modal="#myModal"
  />
</Modal>