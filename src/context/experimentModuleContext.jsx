import { createContext, useState } from 'react'

const ExperimentModuleContext = createContext()

export const ExperimentModuleProvider = ({ children }) => {
  const [experimentModules, setExperimentModules] = useState([
    {
      id: 1,
      title: 'Experiment 1',
      lock: false,
      addingNewIteration: false,
      iterations: [
        {
          id: 1,
          title: 'Iteration 1',
          type: 'short'
        }
      ]
    },
    {
      id: 2,
      title: 'Experiment 2',
      lock: false,
      addingNewIteration: false,
      iterations: [
        {
          id: 1,
          title: 'Iteration 1',
          type: 'long'
        }
      ]
    }
  ])

  return (
    <ExperimentModuleContext.Provider value={{ experimentModules, setExperimentModules }}>
      {children}
    </ExperimentModuleContext.Provider>
  )
}

export default ExperimentModuleContext
