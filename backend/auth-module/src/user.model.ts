export interface User {
  uid?: string;
  email: string;
  password?: {
    hash: string;
    algorithm: HashingAlgorithm;
  };
}

export type HashingAlgorithm = 'bcrypt';
