import axios from "axios";
import { config } from "../config/environment-variables.js";
import { WeatherData } from "./interfaces.js";

export class OpenMeteoGateway {
  public getWeatherData = async (): Promise<WeatherData> => {
    const response = await axios.get(`${config.openMeteo.baseUrl}/v1/forecast?latitude=52.48&longitude=-1.90&current_weather=true`);

    return {
      temperature: response.data.current_weather.temperature,
      isDay: response.data.current_weather.is_day,
    };
  }

  public static getInstance = (): OpenMeteoGateway => {
    return new OpenMeteoGateway();
  }
}
