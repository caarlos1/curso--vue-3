import { readonly } from 'vue'
import UserModule from './user.js'
import GlobalModule from './global.js'

export default readonly({
  User: UserModule,
  Global: GlobalModule
})
