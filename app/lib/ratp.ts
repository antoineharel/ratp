import axios from "axios";

const ratpClient = axios.create({
  baseURL: 'https://api-ratp.pierre-grimaud.fr/v4'
});

export namespace ratp {
  export const traffic = (): Promise<Traffic> => {
    return ratpClient
      .get('/traffic')
      .then(req => req.data.result)
  }
}

export type LineTraffic = {
  line: string;
  slug: TrafficSlug;
  title: string;
  message: string;
}

export type Traffic = {
  metros: LineTraffic[];
  rers: LineTraffic[];
  tramways: LineTraffic[];
}

export type LineType = 'metro' | 'rer' | 'tramway' | 'bus';
export type TrafficSlug = 'normal' | 'normal_trav' | 'critical';