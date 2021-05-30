
export interface IXiaobaiWorldMessageData {
 XIAOBAI_EVENT: "XIAOBAI_APP_JAVASCRIPT_ENTRY_LOADED",
 id: string,
 appName: string,
 title: string,
}

declare global {
 interface Window {
  /** Xiaobai API */
  xiaobaiApi: any;
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

