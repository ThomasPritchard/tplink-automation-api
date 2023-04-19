import { AzureFunction, Context } from "@azure/functions"
import triggerDevicesController from "../src/controllers/trigger-devices.js";

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    var timeStamp = new Date().toISOString();

    if (myTimer.isPastDue)
    {
        context.log('Timer function is running late!');
    }

    await triggerDevicesController.post();

    context.res = {
      status: 200,
    }

    context.log('Timer trigger function ran!', timeStamp);
};

export default timerTrigger;
