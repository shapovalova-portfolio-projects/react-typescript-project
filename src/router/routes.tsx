import { Layout } from '../pages/Layout';
import { Home } from '../pages/Home';
import { MemoryLibrary } from '../pages/MemoryLibrary';
import { PageNotFound } from '../pages/PageNotFound';
import { ProjectRoutes } from '../types';

export const routes: ProjectRoutes = {
    layout: {
        component: <Layout />,
        isPublic: true,
    },
    home: {
        path: '/',
        component: <Home />,
        isPublic: true,
    },
    memoryLibrary: {
        path: '/memory',
        localPath: 'memory',
        component: <MemoryLibrary />,
        isPublic: true,
    },
    pageNotFound: {
        localPath: '*',
        component: <PageNotFound />,
        isPublic: true,
    },
};