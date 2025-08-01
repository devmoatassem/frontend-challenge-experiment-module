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
  describe('Data Retrieval', () => {
    it('returns correct experiment data', () => {
      const { result } = renderHook(() => useExperimentActions(1), { wrapper })

      expect(result.current.experimentData).toEqual(MOCK_DATA[0])
    })
  })

  describe('Iteration Management', () => {
    it('adds new iteration with title', () => {
      const { result } = renderHook(() => useExperimentActions(1), { wrapper })

      act(() => {
        result.current.addNewIterationTitle('New Iteration')
        result.current.saveNewIteration()
      })

      expect(result.current.experimentData.iterations).toHaveLength(3)
      expect(result.current.experimentData.iterations[2].title).toBe('New Iteration')
    })

    it('enables new iteration mode', () => {
      const { result } = renderHook(() => useExperimentActions(1), { wrapper })

      act(() => {
        result.current.startAddingNewIteration()
      })

      expect(result.current.experimentData.addingNewIteration).toBe(true)
    })

    it('cancels new iteration mode', () => {
      const { result } = renderHook(() => useExperimentActions(1), { wrapper })

      act(() => {
        result.current.startAddingNewIteration()
        result.current.cancelAddingNewIteration()
      })

      expect(result.current.experimentData.addingNewIteration).toBe(false)
      expect(result.current.experimentData.newIterationTitle).toBe(null)
    })
  })

  describe('Module State', () => {
    it('resets module to initial state', () => {
      const { result } = renderHook(() => useExperimentActions(1), { wrapper })

      act(() => {
        result.current.resetModule()
      })

      expect(result.current.experimentData.iterations).toHaveLength(0)
      expect(result.current.experimentData.addingNewIteration).toBe(true)
    })

    it('toggles lock state', () => {
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
})
