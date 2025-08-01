import React from 'react'
import { Button } from './ui/button'
import useIterationActions from '../hooks/useIterationActions'
import { cn } from '../lib/utils'

const IterationModuleType = ({ iterationType, iterationId, expId }) => {
  const { iterationData, addIterationType } = useIterationActions(expId, iterationId)
  return (
    <Button className={cn('border border-primary rounded-md p-2 text-primary', iterationData?.type === iterationType.value && 'bg-primary text-green-500 border-green-500')} onClick={() => addIterationType(iterationType.value)}>
      {iterationType.label}
    </Button>
  )
}

export default IterationModuleType
