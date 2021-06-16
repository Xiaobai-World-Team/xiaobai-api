import axios from 'axios'

declare global {
 interface Window {
  xiaobaiApi: IXiaobaiApi
 }
}

/*
 * because this module inside node_modules,
 * so used relative path can visit package.json of xiaobai-app instance,
 * will be bring typescript error, but on real enviorment no problem
 */

// @ts-ignore: Unreachable code error
import * as appPackage from './../../../package.json';
import { login } from './src/login';
import { IXiaobaiApi, IXiaobaiWorldMessageData } from './src/types';

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


/**
 * virtual disk api;
 * avoid some users using cloud disk,because the priceis hard to bear. so matain target is save of small size file.
 */

/**
 * file system
 */
export class XiaobaiFileSystem {
 /** read dir file list */
 async readDir(path: String) {
  return (await axios.post('/storage/fileSystem/readDir', {
   path
  })).data.data
 }
 /** mkdir */
 async mkDir(path: String) {
  return (await axios.post('/storage/fileSystem/mkdir', {
   path
  })).data.data
 }
}

export {
 login
}
