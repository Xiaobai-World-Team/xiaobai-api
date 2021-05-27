import { IXiaobaiWorldMessageData, IWindow } from './types'

export type {
 IXiaobaiWorldMessageData,
 IWindow
}

/**
* mount app to xiaobai or spa
*/
export function mount(): Promise<string> {
 if (!window.xiaobaiApi) {
  return Promise.reject()
 }
 return new Promise(function (resolve) {
  function messageHandler(event: MessageEvent) {
   const data: IXiaobaiWorldMessageData = event.data
   if (data.XIAOBAI_EVENT !== 'XIAOBAI_APP_JAVASCRIPT_ENTRY_LOADED') {
    return
   }
   const id = `#${data.id}`
   if (document.querySelector(id)) {
    window.removeEventListener('message', messageHandler)
    resolve(id)
   }
  }
  window.addEventListener('message', messageHandler)
 })
}
