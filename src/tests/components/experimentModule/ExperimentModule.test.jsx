import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ExperimentModule from '../../../components/experimentModule/experimentModule'
import { ExperimentModuleProvider } from '../../../context/experimentModuleContext'

const renderWithContext = (component) => {
  return render(
    <ExperimentModuleProvider>
      {component}
    </ExperimentModuleProvider>
  )
}

describe('ExperimentModule', () => {
  it('renders experiment title correctly', () => {
    renderWithContext(<ExperimentModule expId={1} />)
    expect(screen.getByText('Experiment Module 1')).toBeInTheDocument()
  })

  it('displays unlock icon when experiment is unlocked', () => {
    renderWithContext(<ExperimentModule expId={1} />)
    expect(screen.getByTestId('unlock-icon')).toBeInTheDocument()
  })

  it('displays lock icon when experiment is locked', () => {
    renderWithContext(<ExperimentModule expId={3} />)
    expect(screen.getByTestId('lock-icon')).toBeInTheDocument()
  })

  it('renders all iterations', () => {
    renderWithContext(<ExperimentModule expId={1} />)

    // First, expand the accordion to see the iterations
    const accordionTrigger = screen.getByText('Experiment Module 1')
    // Import fireEvent at the top if not already imported

    fireEvent.click(accordionTrigger)

    // Now check for the iterations
    expect(screen.getByText('Iteration 1')).toBeInTheDocument()
    expect(screen.getByText('Iteration 2')).toBeInTheDocument()
  })

  it('shows new iteration form when adding new iteration', () => {
    renderWithContext(<ExperimentModule expId={2} />)

    // First, expand the accordion to see the iterations
    const accordionTrigger = screen.getByText('Experiment Module 2')
    fireEvent.click(accordionTrigger)

    expect(screen.getByText('Adding iteration...')).toBeInTheDocument()
  })

  it('shows new iteration by generating', () => {
    renderWithContext(<ExperimentModule expId={2} />)

    // First, expand the accordion to see the iterations
    const accordionTrigger = screen.getByText('Experiment Module 2')
    fireEvent.click(accordionTrigger)
    const generateTrigger = screen.getByText('generate')
    fireEvent.click(generateTrigger)
    const doneButton = screen.getByText('Done')
    fireEvent.click(doneButton)
    expect(screen.getByText('EM-1')).toBeInTheDocument()
  })
})
