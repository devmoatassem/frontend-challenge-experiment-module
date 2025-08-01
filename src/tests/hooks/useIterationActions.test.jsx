import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useIterationActions from '../../hooks/useIterationActions'
import { ExperimentModuleProvider } from '../../context/experimentModuleContext'
import { MOCK_DATA } from '../../lib/constants'

const wrapper = ({ children }) => (
  <ExperimentModuleProvider>
    {children}
  </ExperimentModuleProvider>
)

describe('useIterationActions', () => {
  it('returns iteration data correctly', () => {
    const { result } = renderHook(() => useIterationActions(1, 1), { wrapper })
    expect(result.current.iterationData).toEqual(MOCK_DATA[0].iterations[0])
  })

  it('adds iteration type correctly', () => {
    const { result } = renderHook(() => useIterationActions(1, 1), { wrapper })

    act(() => {
      result.current.addIterationType('medium')
    })

    expect(result.current.iterationData.type).toBe('medium')
  })

  it('toggles iteration type when same type is selected', () => {
    const { result } = renderHook(() => useIterationActions(1, 2), { wrapper })

    act(() => {
      result.current.addIterationType('medium')
    })

    expect(result.current.iterationData.type).toBe(null)
  })

  it('removes iteration correctly', () => {
    const { result } = renderHook(() => useIterationActions(1, 1), { wrapper })

    act(() => {
      result.current.removeIteration()
    })
    const updatedIterations = result.current.experimentData.iterations
    expect(updatedIterations).toHaveLength(1)
    expect(result.current.experimentData.iterations[0].id).toBe(2)
    expect(result.current.experimentData.iterations[0].title).toBe('Iteration 2')
    expect(result.current.experimentData.iterations[0].type).toBe('medium')
    expect(result.current.experimentData.addingNewIteration).toBe(false)
    expect(result.current.experimentData.newIterationTitle).toBe(null)
  })
})
