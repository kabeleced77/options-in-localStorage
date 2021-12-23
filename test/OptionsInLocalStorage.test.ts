import 'mockzilla-webextension'
import { StorageValue } from '../src/StorageValue'
import { OptionInLocalStorage } from '../src/OptionInLocalStorage'
import { OptionsInLocalStorage } from '../src/OptionsInLocalStorage'

describe('Options in LocalStorage', () => {
  const internalDefaultValue = ''

  describe('OptionsInLocalStorage function test', () => {
    it('0100: method option() should return option as instance of OptionInLocalStorage() and save it to localStorage using given name and default value - option was not saved yet', async () => {
      const name = 'option-name'
      const defaultValue = 'option-default-value'

      mockBrowser.storage.local.get.expect(name).andResolve({}).times(1)
      mockBrowser.storage.local.set
        .expect({
          [name]: new StorageValue(defaultValue, defaultValue),
        })
        .times(1)
      const sut = new OptionsInLocalStorage()

      expect(await sut.option(name, defaultValue)).toEqual(
        new OptionInLocalStorage(name, defaultValue),
      )
    })
    it('0200: method option() should return option as instance of OptionInLocalStorage() and save it to localStorage using given name and internal default value - option was not saved yet', async () => {
      const name = 'option-name'

      mockBrowser.storage.local.get.expect(name).andResolve({}).times(1)
      mockBrowser.storage.local.set
        .expect({
          [name]: new StorageValue(internalDefaultValue, internalDefaultValue),
        })
        .times(1)
      const sut = new OptionsInLocalStorage()

      expect(await sut.option(name, internalDefaultValue)).toEqual(
        new OptionInLocalStorage(name, internalDefaultValue),
      )
    })
    it('0300: method option() should return option as instance of OptionInLocalStorage() based on value saved in localStorage', async () => {
      const name = 'option-name'
      const value = 'option-value-in-storage'
      const storageDefaultValue = 'option-default-value-in-storage'

      mockBrowser.storage.local.get
        .expect(name)
        .andResolve({
          [name]: new StorageValue(value, storageDefaultValue),
        })
        .times(1)

      const sut = new OptionsInLocalStorage()

      expect(await sut.option(name)).toEqual(new OptionInLocalStorage(name, storageDefaultValue))
    })
    it('0400: method option() should return option as instance of OptionInLocalStorage() based on value saved in localStorage regardless of given default value', async () => {
      const name = 'option-name'
      const value = 'option-value-in-storage'
      const defaultValue = 'option-default-value'
      const storageDefaultValue = 'option-default-value-in-storage'

      mockBrowser.storage.local.get
        .expect(name)
        .andResolve({
          [name]: new StorageValue(value, storageDefaultValue),
        })
        .times(1)

      const sut = new OptionsInLocalStorage()

      expect(await sut.option(name, defaultValue)).toEqual(
        new OptionInLocalStorage(name, storageDefaultValue),
      )
    })
    it('0500: method options() should return empty array when there are no options saved in localStorage', async () => {
      mockBrowser.storage.local.get.expect().andResolve({}).times(1)

      const sut = new OptionsInLocalStorage()

      expect(await sut.options()).toEqual([])
    })
    it('0600: method options() should return array containing the option as instance of OptionInLocalStorage() based on value saved in localStorage', async () => {
      const name = 'option-name'
      const value = 'option-value-in-storage'
      const defaultValue = 'option-default-value'
      const storageDefaultValue = 'option-default-value-in-storage'

      mockBrowser.storage.local.get
        .expect()
        .andResolve({
          [name]: new StorageValue(value, storageDefaultValue),
        })
        .times(1)

      const sut = new OptionsInLocalStorage()

      expect(await sut.options()).toEqual([new OptionInLocalStorage(name, storageDefaultValue)])
    })
  })
})
