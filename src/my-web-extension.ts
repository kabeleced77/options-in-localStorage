import browser from "webextension-polyfill"

export async function getActiveTabs() {
  return await browser.tabs.query({ active: true })
}

export function onBeforeRedirect(callback: () => void) {
  browser.webRequest.onBeforeRedirect.addListener(callback, { urls: [''] })
  return () => browser.webRequest.onBeforeRedirect.removeListener(callback)
}

export async function store(value: string) {
  browser.storage.local.set({ key: value })
}
