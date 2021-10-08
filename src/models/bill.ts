export type Bill = {
  id: string;
  nome: string;
  valor: number;
  contas: Bill[];
};
