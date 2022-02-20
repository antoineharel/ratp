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

type LineTraffic = {
  line: string;
  slug: string;
  title: string;
  message: string;
}

type Traffic = {
  metros: LineTraffic[];
  rers: LineTraffic[];
  tramways: LineTraffic[];
}