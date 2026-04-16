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
    case 'GO_TO_STEP':
      return { ...state, currentStep: action.step, direction: action.step > state.currentStep ? 1 : -1, errors: {} }
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

  const goToStep = useCallback((step) => {
    dispatch({ type: 'GO_TO_STEP', step })
  }, [])

  const submit = useCallback(async () => {
    dispatch({ type: 'SUBMIT_START' })
    try {
      const d = state.formData
      await fetch('https://formspree.io/f/mwvapbyv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: 'New Intake Form Submission — EYEuni',

          // — Contact & Business Info —
          'Contact Name': d.contactName,
          'Contact Email': d.contactEmail,
          'Contact Phone': d.contactPhone || '(not provided)',
          'Business Name': d.businessName,
          'Industry / Niche': d.industry,
          'Business Tagline': d.tagline || '(not provided)',
          'Target Audience': d.targetAudience,

          // — Current Website (Optional) —
          'Current Website URL': d.currentWebsiteUrl || '(no existing website)',
          'What They Like About Current Site': d.whatYouLike || '(not provided)',
          'What They Dislike About Current Site': d.whatYouDislike || '(not provided)',
          'Biggest Problems With Current Site': d.biggestProblems.length > 0 ? d.biggestProblems.join(', ') : '(none selected)',

          // — Website Goals —
          'Website Goals': d.websiteGoals.length > 0 ? d.websiteGoals.join(', ') : '(none selected)',
          'Desired Visitor Actions': d.desiredActions.length > 0 ? d.desiredActions.join(', ') : '(none selected)',
          'Competitor Websites': d.competitors || '(not provided)',
          'Websites They Like': d.websitesYouLike || '(not provided)',
          'What They Like About Those Websites': d.whatYouLikeAboutThem || '(not provided)',
          'Other Goals': d.otherGoals || '(not provided)',

          // — Content & Pages —
          'Pages Needed': d.pagesNeeded.length > 0 ? d.pagesNeeded.join(', ') : '(none selected)',
          'Other Pages Requested': d.otherPages || '(none)',
          'Business Description & Services': d.businessDescription,
          'Existing Content Preference': d.existingContent || '(not selected)',

          // — Design Preferences —
          'Design Styles': (d.designStyles || []).length > 0 ? d.designStyles.join(', ') : '(none selected)',
          'Primary Color': d.primaryColor,
          'Secondary Color': d.secondaryColor,
          'Accent Color': d.accentColor,
          'Logo Status': d.logoStatus || '(not selected)',

          // — Features & Functionality —
          'Features Needed': d.featuresNeeded.length > 0 ? d.featuresNeeded.join(', ') : '(none selected)',
          'Other Features Requested': d.otherFeatures || '(none)',

          // — Timeline & Notes —
          'Timeline': d.timeline || '(not selected)',
          'Additional Notes': d.anythingElse || '(none)',
        }),
      })
      dispatch({ type: 'SUBMIT_SUCCESS' })
    } catch (err) {
      console.error('Form error:', err)
      dispatch({ type: 'SUBMIT_SUCCESS' })
    }
  }, [state.formData])

  return {
    ...state,
    updateField,
    toggleArrayItem,
    next,
    prev,
    goToStep,
    submit,
  }
}
