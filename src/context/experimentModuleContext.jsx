import { createContext, useState } from 'react'
import { MOCK_DATA } from '../lib/constants'

const ExperimentModuleContext = createContext()

export const ExperimentModuleProvider = ({ children, initialModules }) => {
  const [experimentModules, setExperimentModules] = useState(MOCK_DATA)

  return (
    <ExperimentModuleContext.Provider value={{ experimentModules, setExperimentModules }}>
      {children}
    </ExperimentModuleContext.Provider>
  )
}

export default ExperimentModuleContext
