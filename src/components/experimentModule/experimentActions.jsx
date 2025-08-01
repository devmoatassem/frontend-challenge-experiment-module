import React from 'react'
import useExperimentActions from '../../hooks/useExperimentActions'
import { Button } from '../ui/button'
import { ActionContainer } from '../ui/actionContainer'
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
      <ActionContainer>
        <Button onClick={lockAndUnlockModule}>Unlock</Button>
      </ActionContainer>
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
      <ActionContainer>
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
      </ActionContainer>
    )
  }

  return (
    <ActionContainer>
      <Button onClick={lockAndUnlockModule}>Lock</Button>
      <Button onClick={resetModule}>Reset</Button>
      <Button onClick={startAddingNewIteration}><FaPlus /> Add Iteration</Button>
    </ActionContainer>
  )
}

export default ExperimentActions
