import { ExperimentModuleProvider } from './context/experimentModuleContext'
import Home from './pages/home'

function App () {
  return (
    <ExperimentModuleProvider>
      <Home />
    </ExperimentModuleProvider>
  )
}

export default App
