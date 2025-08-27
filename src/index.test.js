import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Form, Input, Select, Select2, Textarea } from './index.js'

describe('ShadcnVueForms', () => {
  it('should render form component', () => {
    const wrapper = mount(Form, {
      slots: {
        default: '<div>Form content</div>'
      }
    })
    expect(wrapper.text()).toContain('Form content')
  })

  it('should render input component', () => {
    const wrapper = mount(Input, {
      props: {
        name: 'test',
        label: 'Test Input'
      }
    })
    expect(wrapper.find('label').text()).toBe('Test Input')
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('should render select component', () => {
    const wrapper = mount(Select, {
      props: {
        name: 'test',
        label: 'Test Select',
        placeholder: 'Select an option',
        options: {
          option1: 'Option 1',
          option2: 'Option 2'
        }
      }
    })
    expect(wrapper.find('label').text()).toBe('Test Select')
    expect(wrapper.find('select').exists()).toBe(true)
    expect(wrapper.findAll('option').length).toBe(3) // placeholder + 2 options
  })

  it('should render select2 component', () => {
    const wrapper = mount(Select2, {
      props: {
        name: 'test',
        label: 'Test Select2',
        options: {
          option1: 'Option 1',
          option2: 'Option 2'
        }
      }
    })
    expect(wrapper.find('label').text()).toBe('Test Select2')
    expect(wrapper.find('select').exists()).toBe(true)
    expect(wrapper.findAll('option').length).toBe(2) // 2 options (no placeholder for Select2 by default)
  })

  it('should render textarea component', () => {
    const wrapper = mount(Textarea, {
      props: {
        name: 'test',
        label: 'Test Textarea'
      }
    })
    expect(wrapper.find('label').text()).toBe('Test Textarea')
    expect(wrapper.find('textarea').exists()).toBe(true)
  })
})