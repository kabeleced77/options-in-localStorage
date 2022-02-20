import { IStorageValue } from './IStorageValue'

export class StorageValue implements IStorageValue {
  constructor(private storageValue: string = '', private storageDefault: string = '') {}

  public value(): string {
    return this.storageValue
  }
  public default(): string {
    return this.storageDefault
  }
  public fromJson(json: { [s: string]: string }): IStorageValue {
    return new StorageValue(json.storageValue, json.storageDefault)
  }
}
