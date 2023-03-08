import debug from 'debug';

export const log = debug('app:server');
debug.enable('app:server');

export default log;
