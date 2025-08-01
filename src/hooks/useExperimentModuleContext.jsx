import { useContext } from 'react'
import ExperimentModuleContext from '../context/experimentModuleContext'

const useExperimentModuleContext = () => {
  const context = useContext(ExperimentModuleContext)
  if (!context) {
    throw new Error('Must be used within ExperimentModuleProvider')
  }

  // Assume context has experimentModules and setExperimentModules or similar
  const { setExperimentModules } = context

  // Function to add a new module
  const addExperimentModule = () => {
    if (typeof setExperimentModules === 'function') {
      setExperimentModules((prevModules) => [...prevModules, {
        id: prevModules.length + 1,
        title: 'New Experiment',
        iterations: [],
        lock: false,
        addingNewIteration: true
      }])
    } else {
      throw new Error('setExperimentModules is not available in context')
    }
  }

  return {
    ...context,
    addExperimentModule
  }
}

export default useExperimentModuleContext
