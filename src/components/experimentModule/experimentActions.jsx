import React from 'react'
import useExperimentActions from '../../hooks/useExperimentActions'
import { Button } from '../ui/button'
import { FaPlus } from 'react-icons/fa6'

const ExperimentActions = ({ expId }) => {
  const {
    experimentData,
    saveNewIteration,
    startAddingNewIteration,
    cancelAddingNewIteration,
    resetModule,
    lockAndUnlockModule
  } = useExperimentActions(expId)

  if (experimentData.lock) {
    return (
      <div className='flex gap-2 items-center justify-end py-2'>
        <Button onClick={lockAndUnlockModule}>Unlock</Button>
      </div>
    )
  }

  if (experimentData.addingNewIteration) {
    const iterations = experimentData?.iterations
    const newTitle = experimentData?.newIterationTitle

    const isCancelDisabled =
      !Array.isArray(iterations) || iterations.length === 0

    const isDoneDisabled =
      newTitle === undefined ||
      newTitle === null ||
      (typeof newTitle === 'string' && newTitle.trim().length === 0)

    return (
      <div className='flex gap-2 items-center justify-end py-2'>
        <Button
          onClick={cancelAddingNewIteration}
          disabled={isCancelDisabled}
        >
          Cancel
        </Button>
        <Button
          disabled={isDoneDisabled}
          onClick={saveNewIteration}
        >
          Done
        </Button>
      </div>
    )
  }
  return (
    <div className='flex gap-2 items-center justify-end py-2'>
      <Button onClick={lockAndUnlockModule}>Lock</Button>
      <Button onClick={resetModule}>Reset</Button>
      <Button onClick={startAddingNewIteration}><FaPlus /> Add Iteration</Button>
    </div>
  )
}

export default ExperimentActions
