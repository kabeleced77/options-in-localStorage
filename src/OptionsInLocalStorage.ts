import { IOptionAsync, IOptionsAsync } from '@kabeleced/interface-options'
import browser from 'webextension-polyfill'
import { IStorageValue } from './IStorageValue'
import { OptionInLocalStorage } from './OptionInLocalStorage'
import { StorageValue } from './StorageValue'

export class OptionsInLocalStorage implements IOptionsAsync {
  constructor() {}
  public async options(): Promise<IOptionAsync[]> {
    return Object.keys(await this.localStorage().get(null)).map(
      (option) => new OptionInLocalStorage(option),
    )
  }
  public async option(name: string, defaultValue?: string): Promise<IOptionAsync> {
    return defaultValue
      ? new OptionInLocalStorage(
          name,
          (await this.getOrSetStorageValue(name, defaultValue)).defaultValue(),
        )
      : new OptionInLocalStorage(name)
  }
  private async getOrSetStorageValue(
    optionName: string,
    defaultValue: string,
  ): Promise<IStorageValue> {
    let storageValue: IStorageValue
    const fromStorage = (await this.localStorage().get(optionName))[optionName]
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
