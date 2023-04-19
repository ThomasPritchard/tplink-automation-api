import { Request, Response } from 'express';
import { TplinkGateway } from '../services/tplink-gateway.js';
import { OpenMeteoGateway } from '../services/open-meteo-gateway.js';
import { Device } from '../services/interfaces.js';

export class TriggerDevicesController {
  private tpLinkGateway: TplinkGateway;
  private openMeteoGateway: OpenMeteoGateway;

  public constructor(tpLinkGateway: TplinkGateway, openMeteoGateway: OpenMeteoGateway) {
    this.tpLinkGateway = tpLinkGateway;
    this.openMeteoGateway = openMeteoGateway;
  }

  public post = async (req: Request, res: Response) => {
    const deviceList = await this.tpLinkGateway.listDevices();
    const heaterDevices = deviceList.filter((device: Device) => device.alias.toLowerCase().includes('heater'));

    const temperature = await this.openMeteoGateway.getCurrentTemperature();
    const toggleStatus = Number(temperature <= 10);

    console.log({
      toggleStatus,
      temperature,
      heaterDevices
    });

    Promise.all(heaterDevices.map(async (device: Device) => {
      await this.tpLinkGateway.toggleDevice(device.id, toggleStatus);
    }));
    return res.status(200).send();
  }
}

export default new TriggerDevicesController(TplinkGateway.getInstance(), OpenMeteoGateway.getInstance());
