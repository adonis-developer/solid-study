export interface ITypeActionMessageExecute {
  execute(): void;
  createMsgModel(payload: any): any;
}
