export const DEVMODE = true;
export const API = '/api';
export const StatusWindowTime = 2000;

export enum StatusCodes {
  'error', 'info', 'loading', 'success'
};

export interface IStatusWindow{
  id: number,
  status: StatusCodes,
  text: string,
  time: number,
};

export interface IValidator{
  value: string,
  error: string,
}

export interface ISignUp{
  login: string,
  password: string,
  name: string,
  surname: string,
  tagname: string,
  email: string
}

export interface ILogIn{
  login: string,
  password: string
}