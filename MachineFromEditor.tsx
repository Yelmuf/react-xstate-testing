import { createMachine } from 'xstate';

const machineFromEditor = createMachine({
  id: 'New Machine 1',
  initial: 'First State',
  states: {
    'First State': {
      on: {
        Event: {
          target: 'Second State',
        },
      },
    },
    'Second State': {
      on: {
        'Event 2': {
          target: 'new state 1',
        },
        'Event 3': {
          target: 'new state 2',
        },
      },
    },
    'new state 1': {},
    'new state 2': {
      description:
        'In this state user can:\n- Delete entries\n- Toggle edit mode\n- Toggle create mode',
      on: {
        'Event 2': {
          cond: 'userCanDelete',
          target: 'new state 3',
        },
      },
    },
    'new state 3': {
      on: {
        'Event 2': {
          target: 'new state 1',
        },
      },
    },
  },
});
