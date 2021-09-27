import { IStorageValue } from './IStorageValue'

export class StorageValue implements IStorageValue {
  constructor(private storageValue: string = '', private storageDefaultValue: string = '') {}

  public value(): string {
    return this.storageValue
  }
  public default(): string {
    return this.storageDefaultValue
  }
  public fromJson(json: { [s: string]: string }): IStorageValue {
    console.log(`${json}: ${JSON.stringify(json)}`)
    return new StorageValue(json.storageValue, json.storageDefaultValue)
  }
}
