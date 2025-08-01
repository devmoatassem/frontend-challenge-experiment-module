import useExperimentModuleContext from './useExperimentModuleContext'

const useExperimentActions = (expId) => {
  const { experimentModules, setExperimentModules } = useExperimentModuleContext()
  const experimentData = experimentModules.find(
    (module) => module.id === expId
  )
  // function to add a new iteration
  const saveNewIteration = () => {
    setExperimentModules(prevModules =>
      prevModules.map(module => {
        if (module.id === expId) {
          return {
            ...module,
            addingNewIteration: false,
            newIterationTitle: null,
            iterations: [
              ...module.iterations,
              {
                id: module.iterations.length + 1,
                title: module.newIterationTitle,
                type: ''
              }
            ]
          }
        }
        return module
      })
    )
  }

  // function to add new iteration title
  const addNewIterationTitle = (iterationTitle) => {
    setExperimentModules(prevModules =>
      prevModules.map(module => {
        if (module.id === expId) {
          return { ...module, newIterationTitle: iterationTitle }
        }
        return module
      })
    )
  }

  // function to start adding a new iteration
  const startAddingNewIteration = () => {
    setExperimentModules(prevModules =>
      prevModules.map(module => {
        if (module.id === expId) {
          return {
            ...module,
            newIterationTitle: null,
            addingNewIteration: true
          }
        }
        return module
      })
    )
  }

  const cancelAddingNewIteration = () => {
    setExperimentModules(prevModules =>
      prevModules.map(module => {
        if (module.id === expId) {
          return {
            ...module,
            newIterationTitle: null,
            addingNewIteration: false
          }
        }
        return module
      })
    )
  }

  // reset the module
  const resetModule = () => {
    setExperimentModules(prevModules =>
      prevModules.map(module => {
        if (module.id === expId) {
          return {
            ...module,
            newIterationTitle: null,
            addingNewIteration: true,
            iterations: []
          }
        }
        return module
      })
    )
  }

  // lock&unlock the module
  const lockAndUnlockModule = () => {
    setExperimentModules(prevModules =>
      prevModules.map(module => {
        if (module.id === expId) {
          return { ...module, lock: !module.lock }
        }
        return module
      })
    )
  }
  const isNew = experimentModules.length === expId && experimentData?.iterations?.length === 0
  return {
    experimentData,
    saveNewIteration,
    addNewIterationTitle,
    startAddingNewIteration,
    cancelAddingNewIteration,
    resetModule,
    lockAndUnlockModule,
    isNew
  }
}

export default useExperimentActions
