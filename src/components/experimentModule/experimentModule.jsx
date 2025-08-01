import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import useExperimentActions from '../../hooks/useExperimentActions'
import { FaLock, FaLockOpen } from 'react-icons/fa6'
import IterationModule from '../iterationModule/iterationModule'
import NewIteration from './newIteration'
import ExperimentActions from './experimentActions'
import { cn } from '../../lib/utils'

const ExperimentModule = ({ expId }) => {
  const { experimentData } = useExperimentActions(expId)

  return (
    <Accordion collapsible className='bg-primary px-5 rounded-lg overflow-hidden'>
      <AccordionItem value={`experiment-${expId}`}>
        <AccordionTrigger
          className={cn(
            'cursor-pointer text-2xl text-primary-foreground [&>div>svg]:text-primary-foreground',
            experimentData?.lock && 'text-muted [&>div>svg]:text-muted',
            experimentData?.iterations.length === 0 && 'text-muted [&>div>svg]:text-muted'
          )}
        >
          {experimentData?.title}
          {experimentData?.iterations.length > 0 && (
            <div className='p-2 text-primary-foreground'>
              {experimentData?.lock
                ? <FaLock data-testid='lock-icon' size={18} />
                : <FaLockOpen data-testid='unlock-icon' size={18} />}
            </div>
          )}
        </AccordionTrigger>
        <AccordionContent className='p-0'>
          <div className='space-y-1'>
            {experimentData?.iterations.map((iteration) => (
              <IterationModule
                key={`${iteration.id} + ${expId}`}
                expId={expId}
                iterationId={iteration.id}
              />
            ))}
            {experimentData?.addingNewIteration &&
              <IterationModule
                expId={expId}
                isNew
                iterationId={experimentData?.iterations.length + 1}
              />}
          </div>
          {experimentData?.addingNewIteration && <NewIteration expId={expId} />}
          <ExperimentActions expId={expId} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default ExperimentModule
