import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Router } from './router';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
