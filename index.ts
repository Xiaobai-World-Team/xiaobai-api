import { IXiaobaiWorldMessageData, IWindow } from './types'

/*
 * because this module inside node_modules,
 * so used relative path can visit package.json of xiaobai-app instance,
 * will be bring typescript error, but on real enviorment no problem
 */

// @ts-ignore: Unreachable code error
import * as appPackage from './../../../package.json';

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
   const appName = appPackage.appName ? appPackage.appName : appPackage.name;
   if (node && node.getAttribute('app-name') === appName) {
    render(id)
   }
  }
  window.addEventListener('message', messageHandler)
 })
}
