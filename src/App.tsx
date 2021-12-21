import { ReactQueryDevtools } from 'react-query/devtools';
import { Router } from './router';
import { ProjectQueryClientProvider } from './query-client';
import './App.css';

function App() {
  return (
    <ProjectQueryClientProvider>
      <>
        <Router />
        <ReactQueryDevtools initialIsOpen />
      </>
    </ProjectQueryClientProvider>
  );
}

export default App;
