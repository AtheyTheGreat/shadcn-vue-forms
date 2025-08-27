export const config = {
  /*
  |--------------------------------------------------------------------------
  | Default CSS Framework
  |--------------------------------------------------------------------------
  |
  | This option controls the default CSS framework that will be used by the
  | package when rendering form components
  |
  | Supported: "shadcn", "bootstrap"
  |
  */

  framework: 'shadcn',

  frameworks: {
    shadcn: {
      'date-icon': 'calendar',
      'date-icon-wrapper-class': 'date-icon-wrapper',
      'datetime-icon': 'calendar',
      'time-icon': 'clock',
      'date-clear-icon': 'x',
      'date-clear-btn-class': 'btn btn-outline-secondary btn-date-clear disable-w-input',
      'file-download-icon': 'download',
      'file-upload-icon': 'upload',
      'file-clear-icon': 'x',
      'image-icon': 'image',
      'inline-label-class': 'col-sm-3 col-lg-2 col-form-label',
      'inline-input-class': 'col-sm-9 col-lg-10',
      'inline-entry-label-class': 'col-sm-6 col-md-4',
      'inline-entry-class': 'col-sm-6 col-md-8',
      'search-icon': 'search',
      'no-items-icon': 'file'
    },

    bootstrap: {
      'date-icon': 'fa-calendar',
      'date-icon-wrapper-class': 'date-icon-wrapper',
      'datetime-icon': 'fa-calendar',
      'time-icon': 'fa-clock',
      'date-clear-icon': 'fa-close',
      'date-clear-btn-class': 'btn btn-outline-secondary btn-date-clear disable-w-input',
      'file-download-icon': 'fa-arrow-to-bottom',
      'file-upload-icon': 'fa-arrow-to-top',
      'file-clear-icon': 'fa-close',
      'image-icon': 'fa-image',
      'inline-label-class': 'col-sm-3 col-lg-2 col-form-label',
      'inline-input-class': 'col-sm-9 col-lg-10',
      'inline-entry-label-class': 'col-sm-6 col-md-4',
      'inline-entry-class': 'col-sm-6 col-md-8',
      'search-icon': 'fa-search',
      'no-items-icon': 'fa-file'
    }
  },

  /*
  |--------------------------------------------------------------------------
  | Scripts Stack
  |--------------------------------------------------------------------------
  |
  | The name of the stack to push scripts
  |
  */

  scriptsStack: 'scripts',

  /*
  |--------------------------------------------------------------------------
  | Google Maps API Key
  |--------------------------------------------------------------------------
  |
  | API key to use for map inputs
  |
  */

  mapApiKey: import.meta.env.VITE_MAP_API_KEY || null
}