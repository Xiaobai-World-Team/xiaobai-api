import { Subject } from 'rxjs'
import { share } from 'rxjs/operators'
import { IXiaobaiUser } from './types'

const loginSubject = new Subject()
enum ILOGINENUM {
 LOGIN = "LOGIN",
 SUCCESS = "SUCCESS",
 FAIL = "FAIL"
}

interface ILOGIN {
 event: ILOGINENUM
 data: IXiaobaiUser
}

export function login(): Promise<IXiaobaiUser> {
 console.log('call login')
 const subject = loginSubject.pipe(share())
 return new Promise((resolve, reject) => {
  const sub = subject.subscribe((_) => {
   console.log('login complete!')
   sub.unsubscribe()
   const res: ILOGIN = _ as ILOGIN;
   if (res.event === ILOGINENUM.SUCCESS) {
    console.log("login success")
    resolve(res.data)
   } else {
    console.log("login success")
    reject(ILOGINENUM.FAIL)
   }
  })
  console.log('publish login event')
  loginSubject.next({
   event: ILOGINENUM.LOGIN
  })
 })
}