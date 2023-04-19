export interface Device {
  id: string;
  alias: string;
  status: number;
}

export interface WeatherData {
  temperature: number;
  isDay: number;
}
