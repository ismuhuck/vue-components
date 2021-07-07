/* eslint-disable */
export default {
  state: () => ({
    name: "泰植",
    age: "23",
    list: [
      {
        name: "金来沅",
        age: 34
      },
      {
        name: "玄彬",
        age: 36
      },
      {
        name: "李准基",
        age: 50
      }
    ],
    token: ""
  }),
  getters: {
    GET_LIST: (state, getters) => {
      return state.list.filter((item) => item.age <= 36);
    },
    getName: (state, getters, rootState, rootGetters) => {}
  },
  mutations: {
    SET_NAME: (state, userName) => {
      state.name = userName;
    },
    SET_AGE: (state, age) => {
      state.name = age;
    },
    SET_TOKEN: (state, token) => {
      // state.token = token
      setTimeout(() => {
        state.token = token;
      }, 2000);
    }
  },
  //  actions 接受一个与store实例具有相同方法和属性的context 对象，因此可以调用 context.commit来提交一个 mutations这里将commit 解构出来
  actions: {
    Login({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit("SET_TOKEN", "JHFIE58SASDHUENLSKAJHDHE8846A8");
        }, 3000);
        resolve();
      });
    }
  }
};
