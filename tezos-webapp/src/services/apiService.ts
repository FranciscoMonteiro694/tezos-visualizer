import axios,{ AxiosResponse } from "axios";

export interface BlockData {
  level: number;
  timestamp: string;
  proposer?: Proposer
}

interface Proposer {
  alias: string;
  address: string;
}

const apiService = {
  getAmountOfBlocks: (): Promise<number> => {
    return axios
      .get("https://api.tzkt.io/v1/blocks/count")
      .then((response: AxiosResponse<number>) => {
        return response.data;
      })
      .catch((error) => {
        // Handle error
        throw error;
      });
      
    },
    getBlocks: (): Promise<BlockData[]> => {
      return axios
        .get("https://api.tzkt.io/v1/blocks")
        .then((response: AxiosResponse<BlockData[]>) => {
          return response.data.map(({ level, timestamp, proposer }) => ({ level, timestamp, proposer }))
        })
        .catch((error) => {
          // Handle error
          throw error;
        });
        
      },

  // Define other API methods here...
};

export default apiService;
