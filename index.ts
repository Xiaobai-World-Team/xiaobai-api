declare global {
 interface Window {
  xiaobaiApi: IXiaobaiApi
 }
}

import { IContextMenuItem } from './src/types'

/*
 * because this module inside node_modules,
 * so used relative path can visit package.json of xiaobai-app instance,
 * will be bring typescript error, but on real enviorment no problem
 */

// @ts-ignore: Unreachable code error
import * as appPackage from './../../../package.json';
import { IXiaobaiWorldMessageData } from './src/types';
import { XiaobaiFileSystem } from './src/fs';

export * from './src/fs'
export * from './src/login';
export * from './src/types';

/** Xiaobai API */
export interface IXiaobaiApi {
 /* Show Popup Menu */
 TrackPopupMenu(menus: IContextMenuItem[]): void
 FileSystem: XiaobaiFileSystem
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
   // @ts-ignore: Unreachable code error
   if (!appPackage.name) {
    throw new Error('package.json must include name field')
   }
   // @ts-ignore: Unreachable code error
   if (node && node.getAttribute('name') === appPackage.name) {
    render(id)
   }
  }
  window.addEventListener('message', messageHandler)
 })
}
