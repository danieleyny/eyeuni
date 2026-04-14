import { useReducer, useCallback } from 'react'
import { INITIAL_FORM_DATA, REQUIRED_FIELDS_PER_STEP } from './formConstants'

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, formData: { ...state.formData, [action.field]: action.value }, errors: {} }
    case 'TOGGLE_ARRAY_ITEM': {
      const arr = state.formData[action.field]
      const newArr = arr.includes(action.value)
        ? arr.filter((v) => v !== action.value)
        : [...arr, action.value]
      return { ...state, formData: { ...state.formData, [action.field]: newArr }, errors: {} }
    }
    case 'NEXT_STEP':
      return { ...state, currentStep: state.currentStep + 1, direction: 1, errors: {} }
    case 'PREV_STEP':
      return { ...state, currentStep: state.currentStep - 1, direction: -1, errors: {} }
    case 'SET_ERRORS':
      return { ...state, errors: action.errors }
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true }
    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false, isSubmitted: true }
    default:
      return state
  }
}

export function useIntakeForm() {
  const [state, dispatch] = useReducer(formReducer, {
    formData: INITIAL_FORM_DATA,
    currentStep: 0,
    direction: 1,
    errors: {},
    isSubmitting: false,
    isSubmitted: false,
  })

  const updateField = useCallback((field, value) => {
    dispatch({ type: 'SET_FIELD', field, value })
  }, [])

  const toggleArrayItem = useCallback((field, value) => {
    dispatch({ type: 'TOGGLE_ARRAY_ITEM', field, value })
  }, [])

  const validateStep = useCallback((step) => {
    const required = REQUIRED_FIELDS_PER_STEP[step] || []
    const errors = {}
    for (const field of required) {
      const val = state.formData[field]
      if (Array.isArray(val)) {
        if (val.length === 0) errors[field] = 'Please select at least one option'
      } else if (!val || !val.trim()) {
        errors[field] = 'This field is required'
      }
    }
    return errors
  }, [state.formData])

  const next = useCallback(() => {
    const errors = validateStep(state.currentStep)
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors })
      return false
    }
    dispatch({ type: 'NEXT_STEP' })
    return true
  }, [state.currentStep, validateStep])

  const prev = useCallback(() => {
    dispatch({ type: 'PREV_STEP' })
  }, [])

  const submit = useCallback(() => {
    const errors = validateStep(state.currentStep)
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors })
      return
    }
    dispatch({ type: 'SUBMIT_START' })
    // Log form data - replace with API call when ready
    console.log('Intake form submitted:', state.formData)
    setTimeout(() => {
      dispatch({ type: 'SUBMIT_SUCCESS' })
    }, 1500)
  }, [state.currentStep, state.formData, validateStep])

  return {
    ...state,
    updateField,
    toggleArrayItem,
    next,
    prev,
    submit,
  }
}
