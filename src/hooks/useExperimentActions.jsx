import useExperimentModuleContext from './useExperimentModuleContext'

const useExperimentActions = (expId) => {
  const { experimentModules } = useExperimentModuleContext()
  const experimentData = experimentModules.find(
    (module) => module.id === expId
  )
  return { experimentData }
}

export default useExperimentActions
