
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

export interface IXiaobaiUser {
 avatar: string
 email: string
}

