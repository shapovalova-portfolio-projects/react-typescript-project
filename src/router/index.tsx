import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../pages/Layout';
import { routes } from './routes';

export const Router =  function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          {Object.keys(routes).map((routeKey: string) => {
            const route = routes[routeKey];
            const routeProps: { [propName: string]: any } = {
              element: route.component
            };
            const path = route.localPath;
            if (!path) {
              routeProps.index = true;
            } else {
              routeProps.path = path;
            }
              return (<Route key={routeKey} {...routeProps} />);
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { routes };
