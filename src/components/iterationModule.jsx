import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import useIterationActions from '../hooks/useIterationActions'
import { ITERATION_TYPES } from '../lib/constants'
import IterationModuleType from './iterationModuleType'
import { Separator } from './ui/separator'

const IterationModule = ({ expId, iterationId, isNew = false }) => {
  const { iterationData } = useIterationActions(expId, iterationId)

  return (

    <Accordion collapsible disabled={isNew} className='bg-background px-4 py-2 overflow-hidden first:rounded-t-md last:rounded-b-md'>
      <AccordionItem value={`iteration-${iterationId}-${expId}`}>
        <AccordionTrigger
          className='justify-start text-base font-normal leading-0 grid grid-cols-6'
        >
          <p className=''>{`EM-${iterationId}`}</p>
          <p className='col-span-6 col-start-2'>{!isNew ? <span>{iterationData?.title}</span> : <span>Adding iteration...</span>}</p>

        </AccordionTrigger>
        <AccordionContent className='p-0 grid grid-cols-6'>
          <div className='col-span-6 col-start-2 flex flex-wrap gap-2 w-full'>
            {ITERATION_TYPES.map((type) => (
              <IterationModuleType key={type.value} iterationType={type} iterationId={iterationId} expId={expId} />
            ))}
            <Separator />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

  )
}

export default IterationModule
