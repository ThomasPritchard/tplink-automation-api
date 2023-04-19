import dotenv from 'dotenv';

dotenv.config();

interface Config {
  baseUrl: string;

  tpLink: {
    baseUrl: string;
    username: string;
    password: string;
  };

  openMeteo: {
    baseUrl: string;
  }
}

export const config: Config = {
  baseUrl: process.env.BASE_URL || '',
  tpLink: {
    baseUrl: process.env.TPLINK_CLOUD_BASE_URL || '',
    username: process.env.TPLINK_CLOUD_USERNAME || '',
    password: process.env.TPLINK_CLOUD_PASSWORD || '',
  },
  openMeteo: {
    baseUrl: process.env.OPEN_METEO_BASE_URL || '',
  }
}
