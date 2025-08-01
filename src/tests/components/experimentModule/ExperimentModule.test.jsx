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
  describe('Rendering', () => {
    it('displays experiment title', () => {
      renderWithContext(<ExperimentModule expId={1} />)
      expect(screen.getByText('Experiment Module 1')).toBeInTheDocument()
    })

    it('shows unlock icon for unlocked experiment', () => {
      renderWithContext(<ExperimentModule expId={1} />)
      expect(screen.getByTestId('unlock-icon')).toBeInTheDocument()
    })

    it('shows lock icon for locked experiment', () => {
      renderWithContext(<ExperimentModule expId={3} />)
      expect(screen.getByTestId('lock-icon')).toBeInTheDocument()
    })
  })

  describe('Iterations', () => {
    it('displays all iterations when expanded', () => {
      renderWithContext(<ExperimentModule expId={1} />)

      fireEvent.click(screen.getByText('Experiment Module 1'))

      expect(screen.getByText('Iteration 1')).toBeInTheDocument()
      expect(screen.getByText('Iteration 2')).toBeInTheDocument()
    })

    it('shows new iteration form for empty experiment', () => {
      renderWithContext(<ExperimentModule expId={2} />)

      fireEvent.click(screen.getByText('Experiment Module 2'))

      expect(screen.getByText('Adding iteration...')).toBeInTheDocument()
    })
  })

  describe('New Iteration Generation', () => {
    it('creates iteration when generate button is clicked', () => {
      renderWithContext(<ExperimentModule expId={2} />)

      fireEvent.click(screen.getByText('Experiment Module 2'))
      fireEvent.click(screen.getByText('generate'))
      fireEvent.click(screen.getByText('Done'))

      expect(screen.getByText('EM-1')).toBeInTheDocument()
    })
  })
})
