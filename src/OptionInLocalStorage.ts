import { IOptionAsync } from '@kabeleced/interface-options'
import browser from 'webextension-polyfill'
import { IStorageValue } from './IStorageValue'
import { StorageValue } from './StorageValue'

/**
 * Provides object oriented option management. The options are actually saved in browser's localStorage.
 */
export class OptionInLocalStorage implements IOptionAsync {
  /**
   * Creates an object holding the name and - if given - default value of the option. Actual access is provided through the object's correspondent methods. 
   * @param optionName name of option. Can be used alone providing access to the stored value. If there is no value stored the given or standard-default value is stored.
   * @param defaultValue default value of the option. This is optional. If not given standard-default value is used otherwise the given one.
   */
  constructor(private optionName: string, private defaultValue: string = '') {}
  /**
   * Provides the name of the option. Actually the same value given through construction of object.
   * @returns the name of the option.
   */
  public name(): string {
    return this.optionName
  }
  /**
   * 
   * @returns the actual value of the option. Either the saved one or the - if given default value - if nothing has been saved so far. The 
   */
  public async value(): Promise<string> {
    return (await this.getStorageValue(this.optionName, this.defaultValue)).value()
  }
  /**
   *
   * @returns default value save in storage; if nothing has been saved so far given default value is saved and returned.
   */
  public async default(): Promise<string> {
    return (await this.getStorageValue(this.optionName, this.defaultValue)).default()
  }
  public async reset(): Promise<void> {
    const storageDefaultValue = (
      await this.getStorageValue(this.optionName, this.defaultValue)
    ).default()
    return this.toLocalStorage(
      this.optionName,
      new StorageValue(storageDefaultValue, storageDefaultValue),
    )
  }
  public async update(updateFunction: (currentValue: string) => string): Promise<void> {
    const storageValue = await this.getStorageValue(this.optionName, this.defaultValue)
    return this.toLocalStorage(
      this.optionName,
      new StorageValue(updateFunction(storageValue.value()), storageValue.default()),
    )
  }
  private async getStorageValue(optionName: string, defaultValue: string): Promise<IStorageValue> {
    let storageValue: IStorageValue
    const fromStorage = (await this.localStorage().get(optionName))[optionName]
    // has option been saved at all?
    if (fromStorage) {
      // yes -> return saved value
      storageValue = new StorageValue().fromJson(fromStorage)
    } else {
      // no -> return default value and save default value in storage
      storageValue = new StorageValue(defaultValue, defaultValue)
    }
    return storageValue
  }
  private async toLocalStorage(optionName: string, storageValue: IStorageValue): Promise<void> {
    return this.localStorage().set({ [optionName]: storageValue })
  }
  /**
   * Check and return localStorage. If not available in current context throw exception.
   * @returns browser's localStorage.
   */
  private localStorage(): browser.Storage.LocalStorageArea {
    if (browser?.storage && browser.storage?.local) {
      return browser.storage.local
    } else {
      throw new Error(
        "No local storage (browser.storage.local) available. Has the following permission been set: 'storage'?",
      )
    }
  }
}
