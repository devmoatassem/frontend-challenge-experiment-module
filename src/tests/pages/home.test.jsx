import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ExperimentModuleProvider } from '../../context/experimentModuleContext'
import { MOCK_DATA } from '../../lib/constants'
import Home from '../../pages/home'

// Mock the ExperimentModule component
vi.mock('../../components/experimentModule/experimentModule', () => ({
  default: ({ expId }) => <div data-testid={`experiment-module-${expId}`}>Experiment Module {expId}</div>
}))

// Mock the Button component
vi.mock('../../components/ui/button', () => ({
  Button: ({ children, onClick, variant }) => (
    <button
      data-testid='add-experiment-button'
      onClick={onClick}
      className={variant}
    >
      {children}
    </button>
  )
}))

// Mock react-icons
vi.mock('react-icons/fa6', () => ({
  FaPlus: () => <span data-testid='plus-icon'>+</span>
}))

const renderHomeWithProvider = () => {
  return render(
    <ExperimentModuleProvider>
      <Home />
    </ExperimentModuleProvider>
  )
}

describe('Home Page', () => {
  it('renders without crashing', () => {
    renderHomeWithProvider()
    expect(screen.getByTestId('add-experiment-button')).toBeInTheDocument()
  })

  it('displays all experiment modules from context', () => {
    renderHomeWithProvider()

    // Check that all experiment modules from MOCK_DATA are rendered
    MOCK_DATA.forEach(experiment => {
      expect(screen.getByTestId(`experiment-module-${experiment.id}`)).toBeInTheDocument()
    })
  })

  it('displays the correct number of experiment modules', () => {
    renderHomeWithProvider()

    const experimentModules = screen.getAllByTestId(/experiment-module-/)
    expect(experimentModules).toHaveLength(MOCK_DATA.length)
  })

  it('renders "Add Experiment Module" button', () => {
    renderHomeWithProvider()

    const addButton = screen.getByTestId('add-experiment-button')
    expect(addButton).toHaveTextContent('Add Experiment Module')
  })

  it('adds a new experiment module', () => {
    renderHomeWithProvider()

    const addButton = screen.getByTestId('add-experiment-button')
    fireEvent.click(addButton)

    // After clicking, there should be one more experiment module
    const experimentModules = screen.getAllByTestId(/experiment-module-/)
    expect(experimentModules).toHaveLength(MOCK_DATA.length + 1)

    // Check that the new module (id: 4) is rendered
    expect(screen.getByTestId('experiment-module-4')).toBeInTheDocument()
  })

  it('handles multiple clicks on add button', () => {
    renderHomeWithProvider()

    const addButton = screen.getByTestId('add-experiment-button')

    // Click multiple times
    fireEvent.click(addButton)
    fireEvent.click(addButton)
    fireEvent.click(addButton)

    // Should have 3 more modules
    const experimentModules = screen.getAllByTestId(/experiment-module-/)
    expect(experimentModules).toHaveLength(MOCK_DATA.length + 3)

    // Check that new modules are rendered
    expect(screen.getByTestId('experiment-module-4')).toBeInTheDocument()
    expect(screen.getByTestId('experiment-module-5')).toBeInTheDocument()
    expect(screen.getByTestId('experiment-module-6')).toBeInTheDocument()
  })
})
