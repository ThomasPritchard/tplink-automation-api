import logger from '@azure/logger';

logger.setLogLevel('verbose');
const azureLogger = logger.createClientLogger('event-hubs');

export default azureLogger;
