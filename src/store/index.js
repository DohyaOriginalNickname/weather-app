import { createStore } from 'vuex'

import { favorite } from './favorite'
import { history } from './history'
import { search } from './search'
import { share } from './share'

export default createStore({
  modules: {
    favorite,
    history,
    search,
    share
  }
})
