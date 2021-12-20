import { ReactElement } from "react";

interface ProjectRoute {
    path?: string,
    localPath?: string,
    component: ReactElement,
    isPublic: boolean,
};

export interface ProjectRoutes {
    [propName: string]: ProjectRoute
};
