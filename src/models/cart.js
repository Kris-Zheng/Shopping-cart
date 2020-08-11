
const initialState = {
  added: []
}

export default {

  namespace: 'cart',

  state: initialState,

  effects: {
    *addToCart({ payload }, { select, put }) {
      console.log('cart.js got payload => ', payload)
      yield put({
        type: "saveProducts",
        payload
      });
    },

    *deleteProduct({ payload: { id, size } }, { put }) {
      yield put({
        type: "Deleted",
        payload: id, size
      })
    },

    *add({ payload }, { put, call }) {
      yield put({
        type: 'modifiyProduct',
        payload
      })
    },

    *checkOut({ payload }, { put }) {
      yield put({
        type: "checkout",
      })
    },

    *initCart({ payload }, { put }) {
      yield put({
        type: "saveCart",
      })
    }
  },


  reducers: {

    modifiyProduct: (state, { payload }) => {
      const { added } = state;
      const { index, value } = payload;

      added[index].count = added[index].count + value
      if (added[index].count < 0) added[index].count = 0
      return {
        ...state,
        added
      }
    },

    saveProducts: (state, { payload }) => {
      // console.log('saveProducts has been used')
      const { added } = state
      // console.log("itemsize", payload.size);
      if (added.length === 0) {

        added.push({ ...payload, count: 1 })
        window.localStorage.setItem('added', JSON.stringify(added))
        // console.log('local storage set item => ', added)
        return {
          ...state,
          added
        }

      }
      // 1. loop find
      // let isExisted = false
      // for (let i=0; i<added.length; i++){
      //   if (add[i].id === payload.id && add[i].size === payload.size) {
      //       isExisted = true
      //   }
      // }
      // 2. find
      const isExisted = added.find(item => item.id === payload.id && item.size === payload.size)
      // console.log('isExisted => ', isExisted)
      let result = []
      if (isExisted) {
        result = added.reduce((total, currentValue) => {
          if (currentValue.id === payload.id && currentValue.size === payload.size) {
            currentValue.count = currentValue.count + 1
          }
          total.push(currentValue)
          return total;
        }, [])
      } else {
        payload.count = 1
        result = [...added, payload]
      }
      window.localStorage.setItem('added', JSON.stringify(result))
      // console.log('local storage set item => ', result)

      return {
        ...state,
        added: result
      }
    },

    Deleted: (state, { payload }) => {
      const { id, size } = payload;

      const del = state.added;

      const afterReducer = del.reduce((total, currentValue) => {
        if (currentValue.id !== id || currentValue.size !== size) {
          total.push(currentValue)
        }
        console.log('total', total);
        return total
      }, [])

      console.log("after reducer => ", afterReducer);
     
      window.localStorage.setItem('added', JSON.stringify(afterReducer))
      
      return {
        ...state,
        added: afterReducer
      }
    },

    checkout: (state, payload) => {

      const empty = state.added;
      empty.splice(0, empty.length);

      window.localStorage.setItem('added', JSON.stringify(empty));

      return {
        ...state,
        added: empty
      }
    },

    saveCart: state => {

      const added = JSON.parse(window.localStorage.getItem('added'));
      // console.log('init cart => ', added)

      return {
        ...state,
        added
      }
    }
  },
};

