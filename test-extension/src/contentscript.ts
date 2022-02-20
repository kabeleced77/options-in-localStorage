import browser from 'webextension-polyfill'
import {
  LocalStorage,
  OptionInLocalStorage,
  OptionsInLocalStorage,
} from '@kabeleced/options-in-localstorage'

/**
 * Following the entry point for the background script of this WebExtension.
 */
;(async () => {
  try {
    browser.storage.local.clear()
    let optionNameContentScript = 'option-name-cs'
    const optionDefaultValue = 'default-value'
    console.log(
      `Test-Extension: content script: Cleared localStorage. Values: ${JSON.stringify(
        await browser.storage.local.get(),
      )}`,
    )
    let options = new OptionsInLocalStorage(new LocalStorage())
    let s = await options.option(optionNameContentScript, optionDefaultValue)
    console.log(
      `Test-Extension: content script: created option with default value '${optionDefaultValue}'. Name: ${s.name()}; default: '${await s.default()}'; value: '${await s.value()}'`,
    )
    console.assert(
      (await s.name()) === optionNameContentScript,
      `Option name is not set: ${optionNameContentScript}`,
    )
    console.assert(
      (await s.value()) === optionDefaultValue,
      `Option's value is not set: ${optionDefaultValue}`,
    )
    console.assert(
      (await s.default()) === optionDefaultValue,
      `Option's default value is not set: ${optionDefaultValue}`,
    )
    const updatedValue = `${optionDefaultValue}-updated`
    await s.update((v) => `${v}-updated`)
    console.log(
      `Test-Extension: content script: updated option's value to '${updatedValue}'. Name: ${s.name()}; default: '${await s.default()}'; value: '${await s.value()}'`,
    )
    console.assert(
      (await s.value()) === `${updatedValue}`,
      `Option's value is not updated: ${updatedValue}`,
    )
    await s.reset()
    console.log(
      `Test-Extension: content script: reset option's value to default value. Name: ${s.name()}; default: '${await s.default()}'; value: '${await s.value()}'`,
    )
    console.assert(
      (await s.value()) === optionDefaultValue,
      `Option's value is not reset: ${optionDefaultValue}`,
    )
    console.log(
      `Test-Extension: content script: values in localStorage: ${JSON.stringify(
        await browser.storage.local.get(),
      )}`,
    )
    await options.remove(optionNameContentScript)
    console.log(
      `Test-Extension: content script: removed option ${optionNameContentScript}. Name: ${s.name()}; default: '${await s.default()}'; value: '${await s.value()}'`,
    )
    console.assert(
      (await s.value()) === optionDefaultValue,
      `Option's value is not removed: ${optionDefaultValue}`,
    )
    console.log(
      `Test-Extension: content script: values in localStorage: ${JSON.stringify(
        await browser.storage.local.get(),
      )}`,
    )
    s = await options.option(optionNameContentScript)
    console.log(
      `Test-Extension: content script: created option without default. Name: ${s.name()}; default: '${await s.default()}'; value: '${await s.value()}'`,
    )
  } catch (error) {
    console.error(`Content script error: ${error} ${error.stack}`)
  }
})()
