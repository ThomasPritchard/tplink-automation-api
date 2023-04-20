import { AzureFunction, Context } from "@azure/functions"
import triggerDevicesController from "../src/controllers/trigger-devices.js";
import logger from "../src/services/logger.js";

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    var timeStamp = new Date().toISOString();

    logger.verbose("WeatherCheck::timerTrigger: Timer trigger has started");

    if (myTimer.isPastDue)
    {
        context.log('Timer function is running late!');
    }

    await triggerDevicesController.post();

    context.log('Timer trigger function ran!', timeStamp);
};

export default timerTrigger;
