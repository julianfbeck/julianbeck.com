const store = () => new Vuex.Store({

    state: () => ({
      authUser: null
    }),
  
    mutations: {
      SET_USER: function (state, user) {
        state.authUser = user
      }
    },
  
    actions: {
      // ...
    }
  
  })
  
  export default store