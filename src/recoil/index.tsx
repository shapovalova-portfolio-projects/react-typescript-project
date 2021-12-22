import { ReactElement } from 'react';
import { RecoilRoot } from 'recoil';

export const ProjectRecoilRoot = ({ children }: { children: ReactElement }) => {
    return (<RecoilRoot>{children}</RecoilRoot>);
};

export * from './atoms';
export * from './selectors';
