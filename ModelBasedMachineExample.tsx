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
      PAUSE: () => ({ __p: true }),
      END: (reason: string) => ({ reason }),
    },
  }
);

/** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgCcx0IBPAYgGUAVAQQCVHFQAHAe1lwAuuHvk4gAHogCcUklIAcAFgDMAVlUA2DQHYNABlUAaENUQBGAEyztqvfKlnligzouqAvu+NoseQqVgwAVoAUQA5ABExXn4hETFJBDM9Eg0pN1UzRW1lMzNbeXljUwQLJRJk5WUDTOzVJw1PbwwcAmISQODxWAF0ATASdAAzfrJkZL09IlofVv8OoOi+QWFRJAlzN1SHZW0c7T0pZXSLYsQ1FL00izN7dMVFLSaQWb92qB4CKFoABWYAVXoISWsVWCXMijMFT0+UU6gsBmqijOCEU8gscike3q8lyGjMaWerzapA+X1CkRBK3i60SOhIiMUR2yWI0u2UKMUCIZGnqvLZt3kWWURJab1IXHQAFdAhAKVF1jFqWtQIksrJjgZ7BorEzVBZTiZEAKKk4ubdbLdtPJRb4SSQwPgIJAGCx2FS4iqNghjspUkKyqomY99SiNOiSHVNHsbA4PM98DxnfB1sT5hQqCVuMtPeCkioSE5dmUstosdoLByjQh9HJ1bozDI9JWVLa5u1Oh6wbSIfISC2nPJVFImVJwyiLNboVVblpWek2+KSGT8FAuzTVRCMTIbhouc37HZDSVIYoefVrdbw1izIv7ZKZZB1161bsGblKzjfQ9kdX1KoSFUGxDjMa190aLwXjFe1HWdCBnzzMo+wedRrXuPc7DDXRIxsVR5EOaojj0bQ738BCewQABaRxC2Ih4hwscMlAcY9EGoqE7FsBFG2ORstBtTx3CAA */

const exampleMachine =

/** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgCcx0IBPAYgGUAVAQQCVHFQAHAe1lwAuuHvk4gAHogCMJAMwBOAExTFABgCs6gGwAOVVK3qA7OoA0IaoiNaS8+QBYdJ1Vq2zF81bIC+382iw8QlJYMAFaAFEAOQARMV5+IRExSQQAWicSHTtdWTdrHR1FLXNLBEVZGVl7I0VsxXsNKXUG338MHAJiElDw8VgBdAEwEnQAM2GyZClVWaJaAM7gnrD4vkFhUSQJREUjElU7KXtFYv1ZdScdUt35fcr3VT2pItUdezaQRaDuqB4CKC0AAKzAAqvQImtEpsUogTiR1IdKqpGnc9i57DcEPZZKoSA0pEZZCZjMSdK5Pt8uqQ-gDIrEoRtkttUmlKgjZE57AZkQotFJZFi8vckfZ5BdrDjFJSOj9SFx0ABXUIQelxbYJJlbUCpREkIzyHQXezqF5aeQva4WRDGHRyIzvDTGdQOeTqGWBakkBXKyC0UFREHgyEa9ZJbU7BAC-Y1cVGGbFfl5LE4vEEokkjNOD1LbpgfAQP1MNgcUPQ5k63bFA7mxGuJ76ewla0IVx2jyuIxPFoChy+PwgfA8QvwbZU5YUKhlbhhmEsuH2fWmsW44mEznyLF25rZF1KGo6Fo5uUrASM8Ow7HyEhaE5SAWObni+wmrGndRyGq4ipu9S4+RaMeXq0vgUDnnOlbYouCh2B4hxqFy1hCvychIloiimsUlzyEByw+iq4EVpGnIkDinizHsDz3liiKKFkUieCShwAQ6PgDuOeYFpAhERqk3I3o4xKqLUhoKDoUhYq4dF1ESBjNESFzSuxsrUjxl5pPeMjZABRr5LoRTNmUaRuFklSGPoyg4uhUj9t4QA */
model.createMachine({
  predictableActionArguments: true,
  id: "(machine)",
  initial: "ready",
  states: {
    ready: {
      on: {
        START: {
          cond: (c, e) => e.startWith === "startWithArgument",
          target: "set",
        },
      },
    },
    set: {
      after: {
        "1000": {
          target: "going",
        },
      },
      on: {
        END: {
          target: "ended",
        },
      },
    },
    going: {
      on: {
        PAUSE: {
          target: "paused",
        },
        END: {
          target: "ended",
        },
      },
    },
    paused: {
      on: {
        END: {
          target: "ended",
        },
        UNPAUSE: {
          target: "going",
        },
      },
    },
    ended: {
      on: {
        START: {
          target: "set",
        },
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

      <button onClick={() => send(model.events.START('startWithArgument'))} disabled={!state.can(model.events.START('startWithArgument'))}>
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
