import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import useExperimentActions from '../../hooks/useExperimentActions'
import { FaLock, FaLockOpen } from 'react-icons/fa6'
import IterationModule from '../iterationModule/iterationModule'
import NewIteration from './newIteration'
import ExperimentActions from './experimentActions'

const ExperimentModule = ({ expId }) => {
  const { experimentData } = useExperimentActions(expId)

  return (
    <Accordion collapsible className='bg-primary px-5 rounded-lg overflow-hidden'>
      <AccordionItem value={`experiment-${expId}`}>
        <AccordionTrigger className='text-2xl text-primary-foreground hover:text-primary-foreground/80'>{experimentData?.title}
          <div className='p-2 text-primary-foreground'>
            {experimentData?.lock ? <FaLock data-testid='lock-icon' /> : <FaLockOpen data-testid='unlock-icon' />}
          </div>
        </AccordionTrigger>
        <AccordionContent className='p-0'>
          <div className='space-y-1'> {experimentData?.iterations.map((iteration) => (
            <IterationModule key={`${iteration.id} + ${expId}`} expId={expId} iterationId={iteration.id} />
          ))}
            {experimentData?.addingNewIteration &&
              <IterationModule expId={expId} isNew iterationId={experimentData?.iterations.length + 1} />}
          </div>
          {experimentData?.addingNewIteration && <NewIteration expId={expId} />}
          <ExperimentActions expId={expId} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default ExperimentModule
