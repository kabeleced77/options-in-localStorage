import { LocalStorage, OptionInLocalStorage } from '@kabeleced/options-in-localstorage'

/**
 * Following the entry point for the background script of this WebExtension.
 */
;(() => {
  try {
    console.log('Test-Extension: background script started')
    let s = new OptionInLocalStorage(new LocalStorage(), 'option-name-bs')
  } catch (error) {
    console.error(`Background script error: ${error} ${error.stack}`)
  }
})()
