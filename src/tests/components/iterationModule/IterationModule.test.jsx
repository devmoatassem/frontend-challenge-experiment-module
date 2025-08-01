import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import IterationModule from '../../../components/iterationModule/iterationModule'
import { ExperimentModuleProvider } from '../../../context/experimentModuleContext'
import { ITERATION_TYPES } from '../../../lib/constants'
import ExperimentModule from '../../../components/experimentModule/experimentModule'

const renderWithContext = (component) => {
  return render(
    <ExperimentModuleProvider>
      {component}
    </ExperimentModuleProvider>
  )
}

describe('IterationModule', () => {
  it('renders iteration ID and title correctly', () => {
    renderWithContext(<IterationModule expId={1} iterationId={1} />)
    expect(screen.getByText('EM-1')).toBeInTheDocument()
    expect(screen.getByText('Iteration 1')).toBeInTheDocument()
  })

  it('shows "Adding iteration..." when isNew is true', () => {
    renderWithContext(<IterationModule expId={1} iterationId={2} isNew />)
    expect(screen.getByText('Adding iteration...')).toBeInTheDocument()
  })

  it('renders all iteration types', () => {
    renderWithContext(<IterationModule expId={1} iterationId={1} />)
    fireEvent.click(screen.getByText('EM-1'))

    ITERATION_TYPES.forEach(type => {
      expect(screen.getByRole('button', { name: type.label })).toBeInTheDocument()
    })
  })
  // test to check iterations clickable when locked
  it('check iterations clickable when locked', () => {
    renderWithContext(<ExperimentModule expId={3} />)
    const accordionTrigger = screen.getByText('Experiment 3')
    fireEvent.click(accordionTrigger)
    const iteration = screen.getByText('EM-1')
    fireEvent.click(iteration)
    ITERATION_TYPES.forEach(type => {
      expect(screen.queryByText(type.label)).not.toBeInTheDocument()
    })
  })
  it('handles remove iteration', () => {
    renderWithContext(<IterationModule expId={1} iterationId={1} />)
    fireEvent.click(screen.getByText('EM-1'))
    fireEvent.click(screen.getByText('Remove'))
    // Verify the iteration was removed from context
    expect(screen.queryByText('Iteration 1')).not.toBeInTheDocument()
  })

  it('handles done button click', () => {
    renderWithContext(<IterationModule expId={1} iterationId={1} />)
    fireEvent.click(screen.getByText('EM-1'))
    fireEvent.click(screen.getByText('Done'))

    // Verify the accordion is closed
    expect(screen.queryByRole('button', { name: 'Remove' })).not.toBeInTheDocument()
  })
})
