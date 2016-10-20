import { v4 } from 'node-uuid';

export const setHeader = (header) => ({
    type: 'SET_HEADER',
    header
});
