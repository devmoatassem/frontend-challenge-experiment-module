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

  const removeIteration = () => {
    setExperimentModules(prev => {
      const newExperimentData = prev.map((module) => {
        if (module.id === expId) {
          const updatedIterations = module.iterations.filter(
            (iteration) => iteration?.id !== iterationId
          )
          if (updatedIterations?.length === 0 || !updatedIterations) {
            return { ...module, iterations: [], addingNewIteration: true, newIterationTitle: null }
          }
          return { ...module, iterations: updatedIterations }
        }
        return module
      })
      return newExperimentData
    })
  }
  return { iterationData, experimentData, addIterationType, removeIteration }
}

export default useIterationActions
