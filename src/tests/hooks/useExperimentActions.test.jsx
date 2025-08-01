import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useExperimentActions from '../../hooks/useExperimentActions'
import { ExperimentModuleProvider } from '../../context/experimentModuleContext'
import { MOCK_DATA } from '../../lib/constants'

const wrapper = ({ children }) => (
  <ExperimentModuleProvider>
    {children}
  </ExperimentModuleProvider>
)

describe('useExperimentActions', () => {
  it('returns experiment data correctly', () => {
    const { result } = renderHook(() => useExperimentActions(1), { wrapper })
    expect(result.current.experimentData).toEqual(MOCK_DATA[0])
  })

  it('saves new iteration correctly', () => {
    const { result } = renderHook(() => useExperimentActions(1), { wrapper })

    act(() => {
      result.current.addNewIterationTitle('New Iteration')
      result.current.saveNewIteration()
    })

    expect(result.current.experimentData.iterations).toHaveLength(3)
    expect(result.current.experimentData.iterations[2].title).toBe('New Iteration')
  })

  it('starts adding new iteration', () => {
    const { result } = renderHook(() => useExperimentActions(1), { wrapper })

    act(() => {
      result.current.startAddingNewIteration()
    })

    expect(result.current.experimentData.addingNewIteration).toBe(true)
  })

  it('cancels adding new iteration', () => {
    const { result } = renderHook(() => useExperimentActions(1), { wrapper })

    act(() => {
      result.current.startAddingNewIteration()
      result.current.cancelAddingNewIteration()
    })

    expect(result.current.experimentData.addingNewIteration).toBe(false)
    expect(result.current.experimentData.newIterationTitle).toBe(null)
  })

  it('resets module correctly', () => {
    const { result } = renderHook(() => useExperimentActions(1), { wrapper })

    act(() => {
      result.current.resetModule()
    })

    expect(result.current.experimentData.iterations).toHaveLength(0)
    expect(result.current.experimentData.addingNewIteration).toBe(true)
  })

  it('locks and unlocks module', () => {
    const { result } = renderHook(() => useExperimentActions(1), { wrapper })

    act(() => {
      result.current.lockAndUnlockModule()
    })

    expect(result.current.experimentData.lock).toBe(true)

    act(() => {
      result.current.lockAndUnlockModule()
    })

    expect(result.current.experimentData.lock).toBe(false)
  })
})
