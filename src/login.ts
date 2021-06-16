import { Subject } from 'rxjs'
import { share } from 'rxjs/operators'
import { IXiaobaiUser } from './types'

const loginSubject = new Subject()
enum ILOGINENUM {
 LOGIN = "LOGIN"
}
interface ILOGIN {
 event: ILOGINENUM
 data: IXiaobaiUser
}

export function login(): Promise<IXiaobaiUser> {
 console.log('call login')
 const subject = loginSubject.pipe(share())
 return new Promise((resolve) => {
  const sub = subject.subscribe((_) => {
   console.log('login complete!')
   sub.unsubscribe()
   const res: ILOGIN = _ as ILOGIN;
   if (res.event === ILOGINENUM.LOGIN) {
    resolve(res.data)
   }
  })
  console.log('publish login event')
  loginSubject.next({
   event: ILOGINENUM.LOGIN
  })
 })
}