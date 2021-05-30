import axios from 'axios'

/** Xiaobai API */
export interface IXiaobaiApi {
 /* Show Popup Menu */
 TrackPopupMenu(menus: IContextMenuItem[]): void
 FileSystem: XiaobaiFileSystem
}


export interface IXiaobaiWorldMessageData {
 XIAOBAI_EVENT: "XIAOBAI_APP_JAVASCRIPT_ENTRY_LOADED",
 id: string,
 name: string,
 title: string,
}

/**
 * Right-click menu item
 */
export interface IContextMenuItem {
 /** union id */
 id: string;
 /** Make button gray */
 disable: boolean;
 /** Button icon */
 icon?: string;
 /* Button text */
 text: string;
 /** 
  * Usually positioned to the right to display shortcuts
  */
 describe?: string;
 /** callback */
 callback(event: IContextMenuItem): any;
 /** sub menu  */
 child?: IContextMenuItem[],
}

/**
 * Right-click menu
 */
export interface IContextMenu {
 /** Whether the  "right click menu" is visible */
 visible: boolean;
 /** The x coordinate of the menu  */
 x: number
 /** The y coordinate of the menu */
 y: number
 /** Menu list */
 menus: IContextMenuItem[]
}


declare global {
 interface Window {
  xiaobaiApi: IXiaobaiApi
 }
}

/** 
 * on desktop have mutiple windows, every window has below "IWindow interface",
 * each window be the body's directly child
 * */
export interface IWindow {
 /**
  * unique id of window, global unique
  */
 id: string;
 /** mount point node */
 mountPointId: string;
 /** 
  * the name of the application mounted on the window, such as:
  * notepad, photoPreview, Calendar, allow repetition in multiple windows
  */
 name: string;
 title: string,
 x: number
 y: number
 width: number
 height: number
 active: boolean
 visible: boolean
 icon: string
 animation: boolean
 /** before the window is maximized,save the window size for later recovery */
 previousWindowSize?: {
  x: number,
  y: number,
  width: number,
  height: number
 },
 /** whether the window has been consumed */
 isUsed: boolean,
 /** auto start? */
 autoStart: boolean,
 jsEntry: string,
 css: string[]
}


/*
 * because this module inside node_modules,
 * so used relative path can visit package.json of xiaobai-app instance,
 * will be bring typescript error, but on real enviorment no problem
 */

// @ts-ignore: Unreachable code error
import * as appPackage from './../../../package.json';

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
   const name = appPackage.name;
   if (node && node.getAttribute('name') === name) {
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

