import dva from 'dva';
import './index.css';
import products from './models/productlist';
import cart from './models/cart';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva();
app.use(createLoading())
// 3. Model
app.model(products);
app.model(cart);


// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

