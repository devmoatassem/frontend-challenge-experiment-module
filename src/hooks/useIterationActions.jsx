import useExperimentModuleContext from './useExperimentModuleContext'

const useIterationActions = (expId, iterationId) => {
  const { experimentModules, setExperimentModules } = useExperimentModuleContext()
  const experimentData = experimentModules.find(
    (module) => module?.id === expId
  )
  const iterationData = experimentData.iterations.find(
    (iteration) => iteration?.id === iterationId
  )

  const addIterationType = (type) => {
    setExperimentModules(prev => {
      const newExperimentData = prev.map((module) => {
        if (module.id === expId) {
          const iterationIndex = module.iterations.findIndex(
            (iteration) => iteration?.id === iterationId
          )
          if (iterationIndex !== -1) {
            const updatedIterations = module.iterations.map((iteration, idx) => {
              if (idx === iterationIndex) {
                // If type is already set and same as new one, set to null
                if (iteration.type === type) {
                  return { ...iteration, type: null }
                }
                return { ...iteration, type }
              }
              return iteration
            })
            return { ...module, iterations: updatedIterations }
          }
        }
        return module
      })
      return newExperimentData
    })
  }

  return { iterationData, addIterationType }
}

export default useIterationActions
