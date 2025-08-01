import React from 'react'
import useExperimentModuleContext from '../hooks/useExperimentModuleContext'
import ExperimentModule from '../components/experimentModule/experimentModule'
import { Button } from '../components/ui/button'

const Home = () => {
  const { experimentModules, addExperimentModule } = useExperimentModuleContext()
  return (
    <div className='bg-black'>
      <div className='max-w-xl mx-auto h-screen overflow-auto space-y-2.5 p-4'>
        {experimentModules.map((experiment) => (
          <ExperimentModule key={experiment.id} expId={experiment.id} />
        ))}
        <Button onClick={addExperimentModule}>Add Experiment</Button>
      </div>
    </div>

  )
}

export default Home
