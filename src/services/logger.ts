import winston from "winston";
import appInsights from "applicationinsights";
import { AzureApplicationsInsightsLogger } from 'winston-azure-application-insights';

appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY).start(); // TODO Refactor to config
const logger = winston.createLogger();

logger.add(new AzureApplicationsInsightsLogger({
  client: appInsights.defaultClient,
}));

logger.debug("Hello world!", {
  test: 123,
});


export default logger;
