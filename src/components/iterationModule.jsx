import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import useIterationActions from '../hooks/useIterationActions'

const IterationModule = ({ expId, iterationId, isNew = false }) => {
  const { iterationData } = useIterationActions(expId, iterationId)

  return (

    <Accordion collapsible disabled={isNew} className='bg-background px-4 py-2 overflow-hidden first:rounded-t-md last:rounded-b-md'>
      <AccordionItem value={`iteration-${iterationId}-${expId}`}>
        <AccordionTrigger
          className='justify-start text-base font-normal leading-0 '
        >
          <span>{`EM-${iterationId}`}</span>
          {!isNew ? <span>{iterationData?.title}</span> : <span>Adding iteration...</span>}
        </AccordionTrigger>
        <AccordionContent>
          <span>{`EM-${iterationId}`}</span>
          {iterationData?.title ? <span>{iterationData?.title}</span> : <span>Adding iteration</span>}
        </AccordionContent>
      </AccordionItem>
    </Accordion>

  )
}

export default IterationModule
