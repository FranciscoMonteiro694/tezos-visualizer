import axios,{ AxiosResponse } from "axios";

export interface BlockData {
  level: number;
  timestamp: string;
  transactions?: number;
  proposer?: Proposer
}

export interface Entity {
  alias?: string;
  address: string;
}

export interface TransactionsData {
  sender: Entity;
  target: Entity;
  amount: number;
  status: string;
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
        throw error;
      });
      
    },
    getBlocks: (): Promise<BlockData[]> => {
      return axios
        .get("https://api.tzkt.io/v1/blocks?limit=10&sort.desc=level&select=level,timestamp,proposer&level")
        .then((response: AxiosResponse<BlockData[]>) => {
          return response.data.map(({ level, timestamp, proposer }) => ({ level, timestamp, proposer }))
        })
        .catch((error) => {
          throw error;
        });
        
      },
      getBlocksBelowGivenLevel: (level: number): Promise<BlockData[]> => {
        return axios
        .get(`https://api.tzkt.io/v1/blocks?limit=10&sort.desc=level&level.lt=${level}`)
        .then((response: AxiosResponse<BlockData[]>) => {
          return response.data.map(({ level, timestamp, proposer }) => ({ level, timestamp, proposer }))
        })
        .catch((error) => {
          throw error;
        });
          
        },
      getTransactionsByLevel: (level: number): Promise<number> => {
        return axios
          .get(`https://api.tzkt.io/v1/operations/transactions/count?level=${level}`)
          .then((response: AxiosResponse<number>) => {
            return response.data
          })
          .catch((error) => {
            throw error;
          });
          
        },
        getTransactionsDataByLevel: (level: number): Promise<TransactionsData[]> => {
          return axios
            .get(`https://api.tzkt.io/v1/operations/transactions?level.eq=${level}&select=sender,target,amount,status`)
            .then((response: AxiosResponse<TransactionsData[]>) => {
              return response.data.map(({ sender, target, amount, status }) => ({ sender, target, amount, status }))
            })
            .catch((error) => {
              throw error;
            });
            
          }

};

export default apiService;
