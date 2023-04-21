import axios from 'axios';
import { uuid } from 'uuidv4';
import { config } from '../config/environment-variables.js';
import { Device } from './interfaces.js';
import logger from './logger.js';

const getToken = async (): Promise<string> => {
  const authResponse = await axios.post(config.tpLink.baseUrl, {
    method: "login",
    params: {
      appType: "Kasa_Android",
      cloudUserName: config.tpLink.username,
      cloudPassword: config.tpLink.password,
      terminalUUID: uuid(),
    }
  },
  {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return authResponse.data.result.token;
}

const token = await getToken();

export class TplinkGateway {
  private token: string;

  public constructor(token: string) {
    this.token = token;
  }

  public listDevices = async (): Promise<Device[]> => {
    let response;
    try {
      logger.info("tpLinkGateway::listDevices: Attempting to grab device list from service");
      response = await axios.post(config.tpLink.baseUrl, {
        method: "getDeviceList",
        params: {
          token: this.token,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      logger.info("tpLinkGateway::listDevices: Fetched response", {
        response: response.data,
      });
    } catch(error) {
      logger.error(error, "tpLinkGateway::listDevices: Failed to grab device list from service");
      throw error;
    }

    const deviceList: any[] = response.data.result.deviceList;
    const mappedDeviceList: Device[] = deviceList.map((device) => ({
      id: device.deviceId,
      alias: device.alias,
      status: device.status,
    }));

    return mappedDeviceList;
  };

  public toggleDevice = async (deviceCode: string, relayState: number): Promise<void> => {
   await axios.post(config.tpLink.baseUrl, {
      method: "passthrough",
      params: {
        deviceId: deviceCode,
        requestData: {
          system: {
            set_relay_state: {
              state: relayState,
            },
          },
        },
        token: this.token,
      }
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  public static getInstance = (): TplinkGateway => {
    return new TplinkGateway(token);
  };
}
