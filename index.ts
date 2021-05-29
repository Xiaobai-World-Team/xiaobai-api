import { IXiaobaiWorldMessageData, IWindow } from './types'

export type {
 IXiaobaiWorldMessageData,
 IWindow
}

/**
* mount app to xiaobai or spa
*/
export function mount(render: (selector: string) => void): Promise<void> {
 if (!window.xiaobaiApi) {
  return Promise.reject()
 }
 return new Promise(function (resolve) {
  resolve()
  function messageHandler(event: MessageEvent) {
   const data: IXiaobaiWorldMessageData = event.data
   if (data.XIAOBAI_EVENT !== 'XIAOBAI_APP_JAVASCRIPT_ENTRY_LOADED') {
    return
   }
   const id = `#${data.id}`
   const node = document.querySelector(id);
   if (node && node.getAttribute('app-name') === data.appName) {
    render(id)
   }
  }
  window.addEventListener('message', messageHandler)
 })
}
