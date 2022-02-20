import browser from 'webextension-polyfill'
import { ILocalStorage } from './ILocalStorage'

export class LocalStorage implements ILocalStorage {
  /**
   *
   */
  constructor() {}

  public set(items: Record<string, any>): Promise<void> {
    return this.storageArea().set(items)
  }
  public get(key: string): Promise<Record<string, any>> {
    return this.storageArea().get(key)
  }
  public remove(key: string): Promise<void> {
    return this.storageArea().remove(key)
  }
  public all(): Promise<Record<string, any>> {
    return this.storageArea().get(undefined)
  }
  /**
   * Check and return localStorage. If not available in current context throw exception.
   * @returns browser's localStorage.
   */
  private storageArea(): browser.Storage.StorageArea {
    if (browser && browser.storage && browser.storage.local) {
      return browser.storage.local
    } else {
      throw new Error(
        "No local storage (browser.storage.local) available. Has the following permission been set: 'storage'?",
      )
    }
  }
}
