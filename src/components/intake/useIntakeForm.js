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

  const submit = useCallback(async () => {
    const errors = validateStep(state.currentStep)
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors })
      return
    }
    dispatch({ type: 'SUBMIT_START' })
    try {
      await fetch('https://formspree.io/f/mwvapbyv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: 'New Intake Form Submission — EYEuni',

          // — Step 1: Business Information —
          'Business Name': state.formData.businessName,
          'Industry / Niche': state.formData.industry,
          'Business Tagline': state.formData.tagline || '(not provided)',
          'Target Audience': state.formData.targetAudience,
          'Contact Email': state.formData.contactEmail || '(not provided)',
          'Contact Phone': state.formData.contactPhone || '(not provided)',

          // — Step 2: Current Website (Optional) —
          'Current Website URL': state.formData.currentWebsiteUrl || '(no existing website)',
          'What They Like About Current Site': state.formData.whatYouLike || '(not provided)',
          'What They Dislike About Current Site': state.formData.whatYouDislike || '(not provided)',
          'Biggest Problems With Current Site': state.formData.biggestProblems.length > 0 ? state.formData.biggestProblems.join(', ') : '(none selected)',

          // — Step 3: Website Goals —
          'Primary Goal': state.formData.primaryGoal,
          'Desired Visitor Action': state.formData.desiredAction,
          'Competitor Websites': state.formData.competitors || '(not provided)',
          'Websites They Like': state.formData.websitesYouLike || '(not provided)',
          'What They Like About Those Websites': state.formData.whatYouLikeAboutThem || '(not provided)',
          'Other Goals': state.formData.otherGoals || '(not provided)',

          // — Step 4: Content & Pages —
          'Pages Needed': state.formData.pagesNeeded.length > 0 ? state.formData.pagesNeeded.join(', ') : '(none selected)',
          'Other Pages Requested': state.formData.otherPages || '(none)',
          'Main Services or Products': state.formData.mainServicesProducts,
          'Existing Content Preference': state.formData.existingContent || '(not selected)',

          // — Step 5: Design Preferences —
          'Design Style': state.formData.designStyle,
          'Primary Color': state.formData.primaryColor,
          'Secondary Color': state.formData.secondaryColor,
          'Accent Color': state.formData.accentColor,
          'Logo Status': state.formData.logoStatus || '(not selected)',

          // — Step 6: Features & Functionality —
          'Features Needed': state.formData.featuresNeeded.length > 0 ? state.formData.featuresNeeded.join(', ') : '(none selected)',
          'Other Features Requested': state.formData.otherFeatures || '(none)',

          // — Step 7: Budget & Timeline —
          'Budget Range': state.formData.budget || '(not selected)',
          'Timeline': state.formData.timeline || '(not selected)',
          'Additional Notes': state.formData.anythingElse || '(none)',
        }),
      })
      dispatch({ type: 'SUBMIT_SUCCESS' })
    } catch (err) {
      console.error('Form error:', err)
      dispatch({ type: 'SUBMIT_SUCCESS' })
    }
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
