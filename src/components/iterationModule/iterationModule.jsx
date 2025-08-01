import React, { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import useIterationActions from '../../hooks/useIterationActions'
import { ITERATION_TYPES } from '../../lib/constants'
import { Separator } from '../ui/separator'
import IterationModuleType from './iterationModuleType'
import { Button } from '../ui/button'

const IterationModule = ({ expId, iterationId, isNew = false }) => {
  const { iterationData, experimentData, removeIteration } = useIterationActions(expId, iterationId)
  const [openValue, setOpenValue] = useState('')

  return (
    <Accordion
      type='single'
      collapsible
      disabled={isNew || experimentData?.lock}
      className='bg-background px-4 py-1 overflow-hidden first:rounded-t-md last:rounded-b-md'
      value={openValue}
      onValueChange={setOpenValue}
    >
      <AccordionItem value={`iteration-${iterationId}-${expId}`}>
        <AccordionTrigger className='justify-start text-base font-normal leading-2 grid grid-cols-6 items-center'>
          <p className='text-muted'>{`EM-${iterationId}`}</p>
          <div className='col-span-6 col-start-2 flex items-center justify-between'>
            <p className='text-muted'>
              {!isNew ? <span className='text-muted-foreground'>{iterationData?.title}</span> : <span className='text-muted'>Adding iteration...</span>}
            </p>
            {iterationData?.type && (
              <div className='text-muted flex items-center text-base leading-0'>
                <span>Selection</span>
                <span className='bg-selection w-2 h-2 rounded-full inline-block ml-2' />
              </div>
            )}
          </div>

        </AccordionTrigger>
        {!isNew && (
          <AccordionContent className='p-0 mt-4 grid grid-cols-6'>
            <div className='col-span-6 col-start-2 flex flex-wrap gap-2 w-full'>
              {ITERATION_TYPES.map((type) => (
                <IterationModuleType
                  key={type.value}
                  iterationType={type}
                  iterationId={iterationId}
                  expId={expId}
                />
              ))}
              <Separator className='my-2 opacity-40' />
              <div className='flex gap-2 items-center justify-end w-full'>
                <Button onClick={removeIteration}>Remove</Button>
                <Button onClick={() => setOpenValue('')}>Done</Button>
              </div>
            </div>
          </AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  )
}

export default IterationModule
