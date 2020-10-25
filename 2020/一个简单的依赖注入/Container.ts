class Container {
  private ContainerMap = new Map<string | symbol, any>();

  public set = (id: string | symbol, value: any): void => {
    this.ContainerMap.set(id, value);
  }

  public get = <T extends any>(id: string | symbol): T => {
    return this.ContainerMap.get(id);
  }

  public has = (id: string | symbol): Boolean => {
    return this.ContainerMap.has(id);
  }
}
export default new Container();