/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on('before:browser:launch', (browser, launchOptions) => {
    // supply the absolute path to an unpacked extension's folder
    // NOTE: extensions cannot be loaded in headless Chrome
    launchOptions.extensions.push(
      'C:/Users/jkremp/Documents/9999_Meins/Projects/options-in-localStorage/test-extension',
    )

    if (browser.name === 'chrome') {
      launchOptions.args.push('--load-extension=../test-extension')
    }

    return launchOptions
  })
}

/*
const extensionLoader = require('cypress-browser-extension-plugin/loader');
module.exports = (on) => {
   on('before:browser:launch', extensionLoader.load('/Users/jkremp/Documents/9999_Meins/Projects/options-in-localStorage/test-extension/'));
 }
*/