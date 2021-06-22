export interface IConfig {
  LinkedIn: ILinkedIn;
}

export interface ILinkedIn {
  baseURL: string;
  clientId: string;
  clientSecret: string;
  redirectURL: string;
  state: string;
  scope: string;
}
