import { createStore } from 'vuex'

import { favorite } from './favorite'
import { history } from './history'
import { search } from './search'

export default createStore({
  modules: {
    favorite,
    history,
    search
  }
})
