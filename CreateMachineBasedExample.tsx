import { useMachine } from '@xstate/react';
import { useSelector } from '@xstate/react/lib/useSelector';
import * as React from 'react';
import { createMachine, Interpreter, InterpreterFrom } from 'xstate';
import { useRenderCount } from './hooks';
import './style.css';

const exampleMachine = createMachine({
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

const ExampleMachineContext = React.createContext(
  {} as InterpreterFrom<typeof exampleMachine>
);

export function CreateMachineBasedExample() {
  useRenderCount('CreateMachineBasedExample');

  const runningMachine = useMachine(exampleMachine);

  const [state, send, service] = runningMachine;

  return (
    <div>
      <ExampleMachineContext.Provider value={service}>
        <p>
          Current state: <code>{state.toStrings().join('.')}</code>
        </p>
        <p>
          Context: <code>{JSON.stringify(state.context, null, 2)}</code>
        </p>

        <EventButtons />
      </ExampleMachineContext.Provider>
    </div>
  );
}

const EventButton = <T extends string>({ type }: { type: T }) => {
  const service = React.useContext(ExampleMachineContext);
  const disabled = useSelector(service, () => !service.getSnapshot().can(type));

  console.log('EventButton', type, '(re)rendered');

  return (
    <button onClick={() => service.send(type)} disabled={disabled}>
      {type}
    </button>
  );
};

const EventButtons = React.memo(() => {
  const actions = ['START', 'PAUSE', 'END'];

  return (
    <React.Fragment>
      {actions.map((type) => (
        <EventButton type={type} key={type} />
      ))}
    </React.Fragment>
  );
});
