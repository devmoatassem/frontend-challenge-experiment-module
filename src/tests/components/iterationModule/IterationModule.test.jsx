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
  describe('Rendering', () => {
    it('displays iteration ID and title', () => {
      renderWithContext(<IterationModule expId={1} iterationId={1} />)

      expect(screen.getByText('EM-1')).toBeInTheDocument()
      expect(screen.getByText('Iteration 1')).toBeInTheDocument()
    })

    it('shows placeholder for new iteration', () => {
      renderWithContext(<IterationModule expId={1} iterationId={2} isNew />)

      expect(screen.getByText('Adding iteration...')).toBeInTheDocument()
    })
  })

  describe('Iteration Types', () => {
    it('displays all available iteration types', () => {
      renderWithContext(<IterationModule expId={1} iterationId={1} />)

      fireEvent.click(screen.getByText('EM-1'))

      ITERATION_TYPES.forEach(type => {
        expect(screen.getByRole('button', { name: type.label })).toBeInTheDocument()
      })
    })
  })

  describe('Locked State', () => {
    it('prevents interaction when experiment is locked', () => {
      renderWithContext(<ExperimentModule expId={3} />)

      fireEvent.click(screen.getByText('Experiment Module 3'))
      fireEvent.click(screen.getByText('EM-1'))

      ITERATION_TYPES.forEach(type => {
        expect(screen.queryByText(type.label)).not.toBeInTheDocument()
      })
    })
  })

  describe('Actions', () => {
    it('removes iteration when remove button is clicked', () => {
      renderWithContext(<IterationModule expId={1} iterationId={1} />)

      fireEvent.click(screen.getByText('EM-1'))
      fireEvent.click(screen.getByText('Remove'))

      expect(screen.queryByText('Iteration 1')).not.toBeInTheDocument()
    })

    it('closes accordion when done button is clicked', () => {
      renderWithContext(<IterationModule expId={1} iterationId={1} />)

      fireEvent.click(screen.getByText('EM-1'))
      fireEvent.click(screen.getByText('Done'))

      expect(screen.queryByRole('button', { name: 'Remove' })).not.toBeInTheDocument()
    })
  })
})
