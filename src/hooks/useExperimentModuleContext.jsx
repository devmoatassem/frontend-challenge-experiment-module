import { useContext } from 'react'
import ExperimentModuleContext from '../context/experimentModuleContext'

const useExperimentModuleContext = () => {
  const context = useContext(ExperimentModuleContext)
  if (!context) {
    throw new Error('Must be used within ExperimentModuleProvider')
  }

  const { setExperimentModules } = context

  // Function to add a new module
  const addNewExperimentModule = () => {
    setExperimentModules((prevModules) => [...prevModules, {
      id: prevModules.length + 1,
      title: 'New Experiment',
      iterations: [],
      lock: false,
      addingNewIteration: true,
      newIterationTitle: null
    }])
  }

  return {
    ...context,
    addNewExperimentModule
  }
}

export default useExperimentModuleContext
