import { lazyLoad } from 'utils/loadable';

export const DragAndDrop = lazyLoad(() => import('./index'));
