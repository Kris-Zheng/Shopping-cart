import shop from '../API/shop';

export default {

  namespace: 'products',

  state: {
    productsList: [],
    bySize: [],
  },

  effects: {
    *query({payload,callback}, { call, put }) {
      const res = yield call(shop.getProducts);
      yield put({
        type: "setAllProducts",
        payload: res.data.products
      });
      if (callback) callback(res.data.products);
    },


    *price({ payload: { rule } }, { call, put }) {
      yield put({
        type: "sortedByprice",
        payload: rule
      });
    },

    *size({ payload }, { call, put }) {
      yield put({
        type: "sortedBysize",
        payload
      });
    }
  },

  reducers: {
    setAllProducts: (state, { payload }) => {
      console.log('fetch products and reduce => ',payload)
      return {
        ...state,
        productsList: payload
      }
    },

    sortedByprice: (state, { payload }) => {
      const { productsList } = state;

      if (payload === 'Lowest to Highest') {
        productsList.sort((a, b) => a.price - b.price)
      }

      else if (payload === 'Highest to Lowest') {
        productsList.sort((a, b) => b.price - a.price)
      }
      else {
        productsList.sort((a, b) => a.id - b.id)
      }

      return {
        ...state,
        productsList
      }
    },

    sortedBysize: (state, { payload }) => {
      const { productsList } = state;
      console.log('products got payload => ',payload)
      console.log(payload.initProducts)

      const result = payload.initProducts.reduce((total, currentValue) =>{
        console.log('current value => ',currentValue)
        for (let i = 0; i < payload.size.length; i++) {
          if (currentValue.availableSizes.includes(payload.size[i])) {
            console.log('current size=>',payload.size[i])
            console.log('currentValue.availableSizes',currentValue.availableSizes)
            total.push(currentValue);
          }
          
        }
        console.log("total",total)
        return total
      },[])

      console.log('result=>',result)


      const uniqueSet = new Set(result);
      const backToArray = ( uniqueSet.size === 0 ? payload.initProducts : [...uniqueSet]);

      return {
        ...state,
        productsList: backToArray
      }
    },
  },
};

