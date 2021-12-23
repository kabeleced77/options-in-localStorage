import 'mockzilla-webextension'
import { StorageValue } from '../src/StorageValue'
import { OptionInLocalStorage } from '../src/OptionInLocalStorage'

describe('Option in LocalStorage', () => {
  const internalDefaultValue = ''
  describe('OptionInLocalStorage function test', () => {
    it('method name() should return given name of option when default value is given', () => {
      const name = 'option-name'
      const defaultValue = 'option-default-value'

      const sut = new OptionInLocalStorage(name, defaultValue)

      expect(sut.name()).toEqual(name)
    })
    it('method name() should return given name of option when default value is not given', () => {
      const name = 'option-name'

      const sut = new OptionInLocalStorage(name)

      expect(sut.name()).toEqual(name)
    })
    it('method default() should return internal internal default when there is no option saved in localStorage with given name', async () => {
      const name = 'option-name'

      mockBrowser.storage.local.get.expect(name).andResolve({}).times(1)

      const sut = new OptionInLocalStorage(name)

      expect(await sut.default()).toEqual(internalDefaultValue)
    })
    it('method default() should return given default value when there is no option saved in localStorage by given name', async () => {
      const name = 'option-name'
      const defaultValue = 'option-default'

      mockBrowser.storage.local.get.expect(name).andResolve({}).times(1)

      const sut = new OptionInLocalStorage(name, defaultValue)

      expect(await sut.default()).toEqual(defaultValue)
    })
    it('method default() should return default value saved in localStorage when default value is saved in localStorage and no default value is given', async () => {
      const name = 'option-name'
      const storageDefaultValue = 'option-default-value-in-storage'
      const value = 'option-value-in-storage'

      mockBrowser.storage.local.get
        .expect(name)
        .andResolve({
          [name]: new StorageValue(value, storageDefaultValue),
        })
        .times(1)

      const sut = new OptionInLocalStorage(name)

      expect(await sut.default()).toEqual(storageDefaultValue)
    })
    it('method default() should return default value saved in localStorage regardless of given default value', async () => {
      const name = 'option-name'
      const defaultValue = 'option-default-value'
      const storageDefaultValue = 'option-default-value-in-storage'
      const value = 'option-value-in-storage'

      mockBrowser.storage.local.get
        .expect(name)
        .andResolve({
          [name]: new StorageValue(value, storageDefaultValue),
        })
        .times(1)

      const sut = new OptionInLocalStorage(name, defaultValue)

      expect(await sut.default()).toEqual(storageDefaultValue)
    })
    it('method value() should return internal default when there is no option saved in localStorage by given name', async () => {
      const name = 'option-name'

      mockBrowser.storage.local.get.expect(name).andResolve({}).times(1)

      const sut = new OptionInLocalStorage(name)

      expect(await sut.value()).toEqual(internalDefaultValue)
    })
    it('method value() should return given default value when there is no option saved in localStorage by given name', async () => {
      const name = 'option-name'
      const defaultValue = 'option-default-value'

      mockBrowser.storage.local.get.expect(name).andResolve({}).times(1)

      const sut = new OptionInLocalStorage(name, defaultValue)

      expect(await sut.value()).toEqual(defaultValue)
    })
    it('method value() should return value saved in localStorage when no default value is given', async () => {
      const name = 'option-name'
      const storageDefaultValue = 'option-default-value-in-storage'
      const value = 'option-value-in-storage'

      mockBrowser.storage.local.get
        .expect(name)
        .andResolve({
          [name]: new StorageValue(value, storageDefaultValue),
        })
        .times(1)

      const sut = new OptionInLocalStorage(name)

      expect(await sut.value()).toEqual(value)
    })
    it('method value() should return value saved in localStorage regardless of given default value', async () => {
      const name = 'option-name'
      const defaultValue = 'option-default-value'
      const storageDefaultValue = 'option-default-value-in-storage'
      const value = 'option-value-in-storage'

      mockBrowser.storage.local.get
        .expect(name)
        .andResolve({
          [name]: new StorageValue(value, storageDefaultValue),
        })
        .times(1)

      const sut = new OptionInLocalStorage(name, defaultValue)

      expect(await sut.value()).toEqual(value)
    })
    it('method update() should save returned value from callback and internal default value when there is no option saved in localStorage by given name', async () => {
      const name = 'option-name'
      const value = 'option-value-in-storage'

      mockBrowser.storage.local.get.expect(name).andResolve({}).times(1)
      mockBrowser.storage.local.set
        .expect({
          [name]: new StorageValue(value, internalDefaultValue),
        })
        .times(1)

      const sut = new OptionInLocalStorage(name)

      await sut.update((currentValue) => {
        expect(currentValue).toEqual(internalDefaultValue)
        return value
      })
    })
    it('method update() should save returned value from callback and given default value when there is no option saved in localStorage by given name', async () => {
      const name = 'option-name'
      const defaultValue = 'option-default-value'
      const value = 'option-value-in-storage'

      mockBrowser.storage.local.get.expect(name).andResolve({}).times(1)
      mockBrowser.storage.local.set
        .expect({
          [name]: new StorageValue(value, defaultValue),
        })
        .times(1)

      const sut = new OptionInLocalStorage(name, defaultValue)

      await sut.update((currentValue) => {
        expect(currentValue).toEqual(defaultValue)
        return value
      })
    })
    it('method reset() should reset current value of option saved in localStorage to default value', async () => {
      const name = 'option-name'
      const defaultValue = 'option-default-value'
      const value = 'option-value-in-storage'

      mockBrowser.storage.local.get
        .expect(name)
        .andResolve({
          [name]: new StorageValue(value, defaultValue),
        })
        .times(1)
      mockBrowser.storage.local.set
        .expect({
          [name]: new StorageValue(defaultValue, defaultValue),
        })
        .times(1)

      const sut = new OptionInLocalStorage(name, defaultValue)

      await sut.reset()
    })
    it('method reset() should actually save option in localStorage when not saved, yet.', async () => {
      const name = 'option-name'
      const defaultValue = 'option-default-value'

      mockBrowser.storage.local.get.expect(name).andResolve({}).times(1)
      mockBrowser.storage.local.set
        .expect({
          [name]: new StorageValue(defaultValue, defaultValue),
        })
        .times(1)

      const sut = new OptionInLocalStorage(name, defaultValue)

      await sut.reset()
    })
  })
})
