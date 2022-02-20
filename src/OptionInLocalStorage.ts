import { ILocalStorage } from "./ILocalStorage"
import { IOptionAsync } from '@kabeleced/interface-options'
import { IStorageValue } from './IStorageValue'
import { StorageValue } from './StorageValue'

/**
 * Provides object oriented option management. The options are actually saved in browser's localStorage.
 */
export class OptionInLocalStorage implements IOptionAsync {
  /**
   * Creates an object holding the name and - if given - default value of the option. Actual access is provided through the object's correspondent methods.
   *
   * If no default value is given an internal value is used instead.
   * @param optionName name of option. Can be used alone providing access to the stored value. If there is no value stored the given or internal default value is stored.
   * @param [defaultValue] default value of the option. This is optional. If not given an internal default value is used instead.
   */
  constructor(
    private localStorage: ILocalStorage,
    private optionName: string,
    private defaultValue: string = '',
  ) {}
  /**
   * Provides the name of the option. Actually the same value given through constructor.
   * @returns the name of the option.
   */
  public name(): string {
    return this.optionName
  }
  /**
   * Provides the actual value of an option saved in local storage. If there is no value saved at all the default value is returned.
   *
   * @returns actual value of the option. Either the saved one or the default value - if nothing has been saved so far.
   */
  public async value(): Promise<string> {
    return (await this.getStorageValue(this.optionName, this.defaultValue)).value()
  }
  /**
   * Provides the default value of the option.
   *
   * @returns default value of the option.
   */
  public async default(): Promise<string> {
    return (await this.getStorageValue(this.optionName, this.defaultValue)).default()
  }
  /**
   * Reset the actual value of the option to its default value.
   *
   * If no option has been saved so far, it will be now using default value.
   * @returns Promise of void.
   */
  public async reset(): Promise<void> {
    const storageDefaultValue = (
      await this.getStorageValue(this.optionName, this.defaultValue)
    ).default()
    return this.toLocalStorage(
      this.optionName,
      new StorageValue(storageDefaultValue, storageDefaultValue),
    )
  }
  /**
   * Updates the actual value of the option by the value returned by the given callback. If no option hase been saved so far, it will be now using that returned value.
   * @param updateFunction callback which provides the current value of the options. It must return the new value of the option
   * @returns Promise of void.
   */
  public async update(updateFunction: (currentValue: string) => string): Promise<void> {
    const storageValue = await this.getStorageValue(this.optionName, this.defaultValue)
    return this.toLocalStorage(
      this.optionName,
      new StorageValue(updateFunction(storageValue.value()), storageValue.default()),
    )
  }
  /**
   * Provides value from localStorage referenced by given name of option. If nothing has been saved so far the default value is used.
   * @param optionName name of option the storageValue is saved by.
   * @param defaultValue default value of option
   * @returns Promise of IStorageValue which holds the actual and default value of the option.
   */
  private async getStorageValue(optionName: string, defaultValue: string): Promise<IStorageValue> {
    const fromStorage = (await this.localStorage.get(optionName))[optionName]
    // has option been saved at all?
    return fromStorage
      ? // yes -> return saved value
        new StorageValue().fromJson(fromStorage)
      : // no -> return default value and save default value in storage
        new StorageValue(defaultValue, defaultValue)
  }
  /**
   * Saves storageValue in localStorage referenced by given name.
   * @param optionName name of option the storageValue will be saved by in the localStorage.
   * @param storageValue the value saved in localStorage referenced by name.
   * @returns Promise of void.
   */
  private async toLocalStorage(optionName: string, storageValue: IStorageValue): Promise<void> {
    return this.localStorage.set({ [optionName]: storageValue })
  }
}
