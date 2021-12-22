import { atom } from 'recoil';

export const FILES_STATE = 'files';

export const filesState = atom({
    key: FILES_STATE,
    default: {},
});