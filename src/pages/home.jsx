import React from 'react'
import useExperimentModuleContext from '../hooks/useExperimentModuleContext'
import ExperimentModule from '../components/experimentModule/experimentModule'
import { Button } from '../components/ui/button'
import { FaPlus } from 'react-icons/fa6'

const Home = () => {
  const { experimentModules, addNewExperimentModule } = useExperimentModuleContext()
  return (
    <div className='bg-background font-sans tracking-wide h-screen overflow-auto'>
      <div
        className='max-w-lg mx-auto  space-y-2.5 p-4'
      >
        {experimentModules.map((experiment) => (
          <ExperimentModule
            key={experiment.id}
            expId={experiment.id}
          />
        ))}
        <div className='flex justify-center mt-4'>
          <Button
            onClick={addNewExperimentModule}
            variant='outline'
          >
            <FaPlus /> Add Experiment Module
          </Button>
        </div>

      </div>
    </div>

  )
}

export default Home
