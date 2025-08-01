import React from 'react'
import { Button } from '../ui/button'
import useIterationActions from '../../hooks/useIterationActions'
import { cn } from '../../lib/utils'

const IterationModuleType = ({ iterationType, iterationId, expId }) => {
  const { iterationData, addIterationType } = useIterationActions(expId, iterationId)
  return (
    <Button
      className={cn(
        'text-sm',
        iterationData?.type === iterationType.value && 'bg-primary text-selection border-selection hover:bg-selection/50 '
      )}
      variant='outline'
      onClick={() => addIterationType(iterationType.value)}
    >
      {iterationType.label}
    </Button>
  )
}

export default IterationModuleType
