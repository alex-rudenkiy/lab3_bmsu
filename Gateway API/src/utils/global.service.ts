export class GlobalService{
  static globalQueue: Array<number> = new Array<number>();
  static async taskExecutor(): Promise<string>{
    while (true){
      console.log('nop');
    }
    return;
  }
}
