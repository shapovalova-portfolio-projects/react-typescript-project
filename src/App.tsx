import { Router } from './router';
import { ProjectQueryClientProvider } from './query-client';
import './App.css';

function App() {
  return (
    <ProjectQueryClientProvider>
      <Router />
    </ProjectQueryClientProvider>
  );
}

export default App;
