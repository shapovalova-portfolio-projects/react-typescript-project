import { selectorFamily } from 'recoil';
import { filesState } from './atoms';
import { ProjectFiles } from '../types';

export const FILE_KEY = 'file';

export const fileState = selectorFamily({
    key: FILE_KEY,
    get: fileKey => ({ get }) => {
        return (get(filesState) as ProjectFiles)[fileKey as string];
    },
});