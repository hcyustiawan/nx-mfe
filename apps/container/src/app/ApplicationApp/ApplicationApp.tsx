import { useApolloClient } from '@apollo/client';
import { mount } from 'application/ApplicationApp';
import { useEffect, useRef } from 'react';

const ApplicationApp = () => {
  const ref = useRef<HTMLDivElement>(null);
  const client = useApolloClient();

  useEffect(() => {
    mount(ref.current, {
      client,
    });
  }, []);

  return <div ref={ref} />;
};

export default ApplicationApp;
