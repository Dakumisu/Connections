import Views from '@js/Views'
import { Store } from '@js/Store'

class Device {
   constructor() {
      this.checkDevice()
   }

   checkDevice() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
         // console.log('Mobile')
         Store.mobile = true
         Views.nodes.main_container.classList.add('mobile')
      } else {
         // console.log('Desktop')
         Store.mobile = false
         Views.nodes.mobile_view.classList.add('hide')
      }
   }
}

const out = new Device()
export default out