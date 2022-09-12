import { useMachine } from '@xstate/react';
import * as React from 'react';
import { createModel } from 'xstate/lib/model';
import { useRenderCount } from './hooks';
import './style.css';

const model = createModel(
  { contextualInfo: 'some initial value' },
  {
    events: {
      START: (startWith: string) => ({ startWith }),
      PAUSE: () => ({}),
      END: (reason: string) => ({ reason }),
    },
  }
);

const exampleMachine = model.createMachine({
  predictableActionArguments: true,
  strict: true,
  initial: 'ready',
  states: {
    ready: {
      on: {
        START: 'set',
      },
    },
    set: {
      after: {
        1000: 'going',
      },
      on: {
        END: 'ended',
      },
    },
    going: {
      on: {
        PAUSE: 'paused',
        END: 'ended',
      },
    },
    paused: {
      on: {
        END: 'ended',
      },
    },
    ended: {
      on: {
        START: 'set',
      },
    },
  },
});

export function ModelBasedMachineExample() {
  useRenderCount('ModelBasedMachineExample');

  const runningMachine = useMachine(exampleMachine);

  const [state, send, service] = runningMachine;

  return (
    <div>
      <p>
        Current state: <code>{state.toStrings().join('.')}</code>
      </p>
      <p>
        Context: <code>{JSON.stringify(state.context, null, 2)}</code>
      </p>

      <button onClick={() => send('START')} disabled={!state.can('START')}>
        start
      </button>
      <button onClick={() => send('PAUSE')} disabled={!state.can('PAUSE')}>
        pause
      </button>
      <button onClick={() => send('END')} disabled={!state.can('END')}>
        end
      </button>
    </div>
  );
}
