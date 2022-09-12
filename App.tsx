import React = require('react');
import { CreateMachineBasedExample } from './CreateMachineBasedExample';
import { ModelBasedMachineExample } from './ModelBasedMachineExample';

export function App() {
  return (
    <main>
      <Bordered name="ModelBasedMachineExample">
        <ModelBasedMachineExample />
      </Bordered>

      <Bordered name="CreateMachineBasedExample">
        <CreateMachineBasedExample />
      </Bordered>
    </main>
  );
}

// TODO: extract
const Bordered = ({
  name,
  children,
}: React.PropsWithChildren<{ name: string }>) => (
  <section
    style={{
      border: '1px solid gray',
      roderRadius: '12px',
      padding: '12px',
      position: 'relative',
      margin: '14px 0',
    }}
  >
    <h3
      style={{
        backgroundColor: 'white',
        paddingX: '12px',
        margin: '0',
        position: 'absolute',
        translate: '0 -100%',
      }}
    >
      {name}
    </h3>
    {children}
  </section>
);
