export const ITERATION_TYPES = [
  {
    value: 'short',
    label: 'SHORT'
  },
  {
    value: 'medium',
    label: 'MEDIUM LENGTH'
  },
  {
    value: 'long',
    label: 'VERY VERY VERY LONG (UP TO 35 CHAR)'
  }
]

export const MOCK_DATA = [
  {
    id: 1,
    title: 'Experiment 1',
    lock: false,
    addingNewIteration: false,
    newIterationTitle: null,
    iterations: [
      {
        id: 1,
        title: 'Iteration 1',
        type: 'short'
      },
      {
        id: 2,
        title: 'Iteration 2',
        type: 'medium'
      }
    ]
  },
  {
    id: 2,
    title: 'Experiment 2',
    lock: false,
    addingNewIteration: true,
    newIterationTitle: null,
    iterations: []
  },
  {
    id: 3,
    title: 'Experiment 3',
    lock: true,
    addingNewIteration: false,
    newIterationTitle: null,
    iterations: [
      {
        id: 1,
        title: 'Iteration 1',
        type: 'short'
      }
    ]

  }
]
