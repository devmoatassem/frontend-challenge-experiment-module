import React, { useState, useRef } from 'react'
import { Textarea } from '../ui/textarea'

const NewIteration = ({ expId }) => {
  const [inputValue, setInputValue] = useState('')
  const [showPrompt, setShowPrompt] = useState(true)
  const inputRef = useRef(null)

  const handleInputChange = (e) => {
    if (e.target.value.length === 0) {
      setShowPrompt(true)
    }
    setInputValue(e.target.value)
  }

  const handleGenerate = () => {
    setTimeout(() => {
      setShowPrompt(false)

      if (inputRef.current) {
        inputRef.current.value = 'Iteration Module'
        inputRef.current.focus()
      }
    })
  }

  return (

    <div
      className='mt-4'
      onBlur={() => {
        setShowPrompt(true)
      }}
    >

      {showPrompt && inputValue.length === 0
        ? (
          <div
            className='min-h-24 overflow-hidden rounded bg-background text-lg px-5 py-4'
            onClick={() => {
              setShowPrompt(false)
              setTimeout(() => {
                inputRef.current.focus()
              })
            }}
          >
            To add a new iteration, start typing a prompt or{' '}
            <button
              variant='ghost'
              tabIndex={-1}
              className='cursor-pointer underline p-0 text-base hover:bg-background'
              onClick={handleGenerate}
            >
              generate
            </button>{' '}
            one
          </div>
          )
        : (<Textarea
            ref={inputRef}
            type='text'
            onChange={handleInputChange}
            placeholder=''
            className='w-full px-4 py-2 border-none rounded-md min-h-24 bg-background focus-visible:ring-0 focus-visible:ring-offset-0 '
            style={{ zIndex: 1 }}
           />)}
    </div>

  )
}

export default NewIteration
