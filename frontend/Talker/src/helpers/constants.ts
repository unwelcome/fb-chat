export const DEVMODE = true;
export const API = '/api';

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