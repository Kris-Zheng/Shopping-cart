import React from 'react';
import { connect } from 'dva';
import 'antd/dist/antd.css';
import { Layout, Drawer, Badge, Button } from 'antd';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import Filter from '../components/Filter';
import {
  ShoppingCartOutlined
} from '@ant-design/icons';

class Products extends React.Component {

  state = { visible: false, a: '' };

  componentDidMount(){
    const { saveCart } = this.props;
    saveCart();
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { Header, Footer, Content, Sider } = Layout; 
    const { cart } = this.props
    const number = cart.added.length;

    console.log('props',this.props);

    return (
      <div>
        <Layout>
          <Header>
            <div style={{ position: 'fixed', top: 45, right: 40 }}>
              <Badge count={number} showZero>
                <Button size="large" onClick={this.showDrawer} shape="round"><ShoppingCartOutlined /></Button>
              </Badge>
            </div>
          </Header>
          <Layout>
            <Sider style={{ backgroundColor: 'lightgray' }}><Filter /></Sider>
            <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
              <ProductList />
              <Drawer
                title="Your cart"
                width="700"
                placement="right"
                onClose={this.onClose}
                visible={this.state.visible}
              >
                <Cart />
              </Drawer>
            </Content>
          </Layout>
          <Footer></Footer>
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = ({ cart }) => ({ cart })

const mapDispatchToProps = (dispatch) => ({
  saveCart: () => {
    dispatch({
      type: 'cart/initCart',
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Products);
