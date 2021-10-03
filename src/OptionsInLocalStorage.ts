import { IOptionAsync, IOptionsAsync } from '@kabeleced/interface-options'
import browser from 'webextension-polyfill'
import { IStorageValue } from './IStorageValue'
import { OptionInLocalStorage } from './OptionInLocalStorage'
import { StorageValue } from './StorageValue'

export class OptionsInLocalStorage implements IOptionsAsync {
  constructor() {}
  /**
   * Get all options.
   * @returns array of all options in local storage.
   */
  public async options(): Promise<IOptionAsync[]> {
    return Object.keys(await this.localStorage().get(null)).map(
      (option) => new OptionInLocalStorage(option),
    )
  }
  /**
   * Get value of option referenced by given name from local storage. In case there is no value saved, it will be saved using given default value. If there is no default value given, internal standard default value is used.
   * @param name name of option whose referenced value is required from local storage.
   * @param defaultValue default value used in case there is no value saved yet. Option will then be saved having this default value.
   * @returns Promise with saved storage value referenced by given name.
   */
  public async option(name: string, defaultValue?: string): Promise<IOptionAsync> {
    const storageValue = await this.getOrSetStorageValue(name, defaultValue ? defaultValue : '')
    return defaultValue
      ? new OptionInLocalStorage(name, storageValue.default())
      : new OptionInLocalStorage(name)
  }
  /**
   * Get value from local storage saved by given name of option. If there is no value save in storage, it will be save using given default value.
   * @param optionName name of option value is save by in local storage.
   * @param defaultValue default value used to initially save option value in local storage by given name.
   * @returns Promise with saved storage value referenced by given name.
   */
  private async getOrSetStorageValue(
    optionName: string,
    defaultValue: string,
  ): Promise<IStorageValue> {
    let storageValue: IStorageValue
    const fromStorage = (await this.fromLocalStorage(optionName))[optionName]
    // has option been saved at all?
    if (fromStorage) {
      // yes -> return saved value
      storageValue = new StorageValue().fromJson(fromStorage)
    } else {
      // no -> return default value and save default value in storage
      storageValue = new StorageValue(defaultValue, defaultValue)
      this.toLocalStorage(optionName, storageValue)
    }
    return storageValue
  }
  /**
   * Put storageValue into local storage saved by optionName.
   * @param optionName name of option the actual value shall be saved by in local storage.
   * @param storageValue content save to storage.
   * @returns
   */
  private async toLocalStorage(optionName: string, storageValue: IStorageValue): Promise<void> {
    return this.localStorage().set({ [optionName]: storageValue })
  }
  /**
   * Get storageValue from local storage saved by optionName.
   * @param optionName name of option which is used to get actual value from local storage.
   * @returns promise of an object which should be saved in local storage by optionName.
   */
  private async fromLocalStorage(optionName: string): Promise<Record<string, {}>> {
    return this.localStorage().get(optionName)
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
