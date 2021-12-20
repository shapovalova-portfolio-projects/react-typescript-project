import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes';

export const Router =  function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={routes.layout.component}>
          {Object.keys(routes).map((routeKey: string) => {
            const route = routes[routeKey];
            if (!route.path) {
              return null;
            }
            const routeProps: { [propName: string]: any } = {
              element: route.component
            };
            const path = route.localPath;
            if (!!path) {
              routeProps.path = path;
            } else {
              routeProps.index = true;
            }
              return (<Route key={routeKey} {...routeProps} />);
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { routes };
