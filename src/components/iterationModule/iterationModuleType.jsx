import React from 'react'
import { Button } from '../ui/button'
import useIterationActions from '../../hooks/useIterationActions'
import { cn } from '../../lib/utils'

const IterationModuleType = ({ iterationType, iterationId, expId }) => {
  const { iterationData, addIterationType } = useIterationActions(expId, iterationId)
  return (
    <Button
      className={cn(
        'text-sm max-w-full min-w-0 flex-shrink truncate',
        iterationData?.type === iterationType.value && 'bg-primary text-selection border-selection hover:bg-selection/50'
      )}
      variant='outline'
      onClick={() => addIterationType(iterationType.value)}
      title={iterationType.label}
    >
      <span className='truncate'>
        {iterationType.label}
      </span>
    </Button>
  )
}

export default IterationModuleType
