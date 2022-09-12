import { useRef } from 'react';

export function useRenderCount(name?: string) {
  const renderCountRef = useRef(0);

  let message = `render+ (${++renderCountRef.current})`;

  if (name) {
    message = `[${name}] ` + message;
  }

  console.log(message);
}
