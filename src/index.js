import Form from './components/Form.vue'
import Input from './components/Input.vue'
import Select from './components/Select.vue'
import Select2 from './components/Select2.vue'
import Textarea from './components/Textarea.vue'
import Label from './components/Label.vue'

// Composables
export { useId, useValidation, setValidationErrors } from './composables'

// Utils
export { getFrameworkConfig, getFrameworkIcon, getFrameworkClass } from './utils'

export {
  Form,
  Input,
  Select,
  Select2,
  Textarea,
  Label
}

export default {
  install(app) {
    app.component('ShadcnForm', Form)
    app.component('ShadcnInput', Input)
    app.component('ShadcnSelect', Select)
    app.component('ShadcnSelect2', Select2)
    app.component('ShadcnTextarea', Textarea)
    app.component('ShadcnLabel', Label)
  }
}