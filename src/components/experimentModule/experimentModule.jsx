import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import useExperimentActions from '../../hooks/useExperimentActions'
import { FaLock, FaLockOpen } from 'react-icons/fa6'
import IterationModule from '../iterationModule'
import NewIteration from './newIteration'

const ExperimentModule = ({ expId }) => {
  const { experimentData } = useExperimentActions(expId)

  return (
    <Accordion collapsible className='bg-primary px-5 py-1 rounded-lg overflow-hidden'>
      <AccordionItem value={`experiment-${expId}`}>
        <AccordionTrigger className='text-2xl text-secondary-foreground hover:text-secondary-foreground/80'>{experimentData?.title}
          <div className='p-2 text-secondary-foreground'>
            {experimentData?.lock ? <FaLock /> : <FaLockOpen />}
          </div>
        </AccordionTrigger>
        <AccordionContent className=''>
          <div className='space-y-1'> {experimentData?.iterations.map((iteration) => (
            <IterationModule key={`${iteration.id} + ${expId}`} expId={expId} iterationId={iteration.id} />
          ))}
            {experimentData?.addingNewIteration &&
              <IterationModule expId={expId} isNew iterationId={experimentData?.iterations.length + 1} />}
          </div>
          {experimentData?.addingNewIteration && <NewIteration expId={expId} />}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default ExperimentModule
