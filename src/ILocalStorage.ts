export interface ILocalStorage {
  set(items: Record<string, any>): Promise<void>;
  get(key: string): Promise<Record<string, any>>;
  remove(key: string): Promise<void>;
  all(): Promise<Record<string, any>>;
}
