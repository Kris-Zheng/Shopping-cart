import dva from 'dva';
import './index.css';
import products from './models/productlist';
import cart from './models/cart';


// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(products);
app.model(cart);


// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

