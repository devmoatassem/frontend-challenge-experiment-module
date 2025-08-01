import React from 'react'
import useExperimentModuleContext from '../hooks/useExperimentModuleContext'
import ExperimentModule from '../components/experimentModule/experimentModule'
import { Button } from '../components/ui/button'
import { FaPlus } from 'react-icons/fa6'

const Home = () => {
  const { experimentModules, addNewExperimentModule } = useExperimentModuleContext()
  return (
    <div className='bg-background'>
      <div className='max-w-xl mx-auto h-screen overflow-auto space-y-2.5 p-4'>
        {experimentModules.map((experiment) => (
          <ExperimentModule key={experiment.id} expId={experiment.id} />
        ))}
        <div className='flex justify-center mt-4'> <Button onClick={addNewExperimentModule} variant='outline'><FaPlus /> Add Experiment Module</Button> </div>

      </div>
    </div>

  )
}

export default Home
