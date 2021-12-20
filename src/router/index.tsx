import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes';

export const Router =  function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={routes.layout.component}>
          {Object.keys(routes).map((routeKey: string) => {
            const path = routes[routeKey].localPath;
            const index = !!path;
            const component = routes[routeKey].component;
            return <Route key={routeKey} index={index} path={path} element={component} />
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { routes };
