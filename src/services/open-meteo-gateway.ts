import axios from "axios";
import { config } from "../config/environment-variables.js";

export class OpenMeteoGateway {
  public getCurrentTemperature = async (): Promise<number> => {
    const response = await axios.get(`${config.openMeteo.baseUrl}/v1/forecast?latitude=52.48&longitude=-1.90&current_weather=true`);

    return response.data.current_weather.temperature;
  }

  public static getInstance = (): OpenMeteoGateway => {
    return new OpenMeteoGateway();
  }
}
