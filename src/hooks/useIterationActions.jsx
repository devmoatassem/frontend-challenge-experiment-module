import useExperimentModuleContext from './useExperimentModuleContext'

const useIterationActions = (expId, iterationId) => {
  const { experimentModules } = useExperimentModuleContext()
  const experimentData = experimentModules.find(
    (module) => module?.id === expId
  )
  const iterationData = experimentData.iterations.find(
    (iteration) => iteration?.id === iterationId
  )
  return { iterationData }
}

export default useIterationActions
