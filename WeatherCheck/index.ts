import { AzureFunction, Context } from "@azure/functions"
import triggerDevicesController from "../src/controllers/trigger-devices.js";
import logger from "../src/services/logger.js";
import { nonHttpTriggerContextWrapper } from "@dvsa/azure-logger";

const timerTrigger: AzureFunction = async function (): Promise<void> {
    logger.debug("WeatherCheck::timerTrigger: Timer trigger has started");

    await triggerDevicesController.post();
};

const index = (context: Context): Promise<void> => nonHttpTriggerContextWrapper(timerTrigger, context);

export default index;
