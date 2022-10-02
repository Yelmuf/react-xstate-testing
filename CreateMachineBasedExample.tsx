import { useMachine } from '@xstate/react';
import { useSelector } from '@xstate/react/lib/useSelector';
import * as React from 'react';
import { createMachine, InterpreterFrom } from 'xstate';
import { useRenderCount } from './hooks';
import './style.css';

const exampleMachine =
/** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgCcx0IBPAYgGUAVAQQCVHFQAHAe1lwAuuHvk4gAHogC0AZgAsAJhIAGABwA2AJyrNARnUBWI7tUAaENWm7NMkutXKA7Ase6Dm5wd2OAvj-NoWHiEpLBgArQAogByACJivPxCImKSCFKKSspyzurK7o4yyuoK6uaW6TJKGupyyqWOck26crp+ARg4BMQkYRHisALoAmAk6ABmI2TIuspzRLSBXSG94Ql8gsKiSBLSMrq2Lgaqcu7eqjKOZRaICgYkCiYH6k85qgYyBu0gS8E9AK5cAA2PCoBCgtAgIlGBAAbjwANajX7dUiAkFg-BQBBwniYYZbADaygAuuskltUnt1LY6o5lDI9PtLgZyoh9vc3mp6aprAoTnJviiVujQRBwbQwGQyDwyCRgcNxrLUCRhQDgWLwTj8PD8cl8MSyTtEpsUjs0jYSI4To5Gid3jy2QhZuo7O85o0ZC8ZDp1ELOn80RrMRCYvFjRt9VT0pkVDlSvkPEUStcKm5XZplJo7go9Hb6l9-D8A6iSKKQ7QAMLMaKVyIAGXJpu2oDSUieJF03kK6ltc3emid3k7RlKmk06kMJhs-qCpbA+AgkForEiTDYHAjFLNrekXiUpQUjyPBhytUHNwQBkeVveNOsnraRbVpClMrIAAJBsMwFE4k2o3NdlJytU85F7DQFDkL15CdAxsitVwTnqU4wM0Wdlh6N9ZS-IYRhXSJGFYABNADKSAhB3hUJxmkceCDlPMxL30ZQVE0OR3hOH13CzP1nxLFZ6GwHgAHcPwEbB0HQD9-jCT9JIgD8DA-CgBDIXA4D-cNuEjcjd3SLtVBIOpvE+eDCg0T4nRyWxeQ8KCJ0zXtCyLfAeCXeAdhfchKBoMid12GMihIbR+XpFwvUeC8KlkfYSHkepGmvTRrzcQV+LnFY+n8ltAqkXNWMKflDHqVQoIdJ0pEKEh3m8ErdDCpp0o6TL1QxcUsRy6NZA+B4dFKi56QZOQhzUGqswZL0yoMRwPFUDDAxIBclwgLqKPyi5xsYrMDBKKDajghDrRkL03DUBrTgW+dpRw78RjW-TLlscd2NtJpJ2K1lL0tcdwJm3Mmv2XwMsw0ghNE8TJOk2SpQ-BSlJU8J1LgB7Aou6iLhsawvRpR5rP5UCeX5IwtDUK6QlRtsPldQ9jzuM85Gi6Q6lsBKXCuEmFBkPw-CAA */
createMachine({
  predictableActionArguments: true,
  id: "(machine)",
  initial: "ready",
  states: {
    ready: {
      description: 'Screen with "enter CN" field for consignment number\n',
      on: {
        START: {
          description: "User clicks on start button",
          target: "set",
        },
      },
    },
    set: {
      after: {
        "1000": {
          target: "uploading",
        },
      },
      on: {
        END: {
          target: "ended",
        },
      },
    },
    uploading: {
      invoke: {
        src: "upload something",
        onDone: [
          {
            actions: "process response & show result",
            target: "ended",
          },
        ],
        onError: [
          {
            target: "error state",
          },
        ],
      },
      on: {
        END: {
          target: "ended",
        },
        CANCEL: {
          target: "set",
        },
      },
    },
    ended: {
      on: {
        RESTART: {
          target: "set",
        },
      },
    },
    "error state": {
      entry: "show error",
      exit: "hide error",
      on: {
        END: {
          target: "ended",
        },
        RETRY: [
          {
            actions: "increment failed retries",
            cond: "Retry count < 5",
            target: "uploading",
          },
          {
            target: "Show thaa user had 5 retries",
          },
        ],
      },
    },
    "Show thaa user had 5 retries": {
      on: {
        END: {
          target: "ended",
        },
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
  const disabled = useSelector(service, (state) => !state.can(type));

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
