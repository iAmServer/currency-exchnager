export interface IConvertProps {
  name: string;
  base: string;
  rate: number;
  amount: number;
}

export interface IConvertPayload {
  from: string;
  to: string;
  amount: number;
}
