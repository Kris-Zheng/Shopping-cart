import React from 'react';
import { connect } from 'dva';
import 'antd/dist/antd.css';
import { Layout, Drawer,Badge,Button } from 'antd';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import Filter from '../components/Filter';
import {
  ShoppingCartOutlined
} from '@ant-design/icons';



class Products extends React.Component {

  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   console.log('Product.js props=>',this.props)
  //   dispatch({
  //      type: 'products/query',
  //    });
  // }
  state = { visible: false };

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
    return (
      <div>
        <Layout>
          <Header></Header>
          <Layout>
            <Sider style={{ backgroundColor: 'lightgray' }}><Filter /></Sider>
            <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
              <ProductList />
            </Content>
          </Layout>
          <Footer></Footer>
        </Layout>
        <div style={{ position: 'fixed', top: 45, right: 40 }}>
          <Badge showZero>
            <Button size="large" onClick={this.showDrawer} shape="round"><ShoppingCartOutlined/></Button>
          </Badge>
        </div>
        <Drawer
          title="Your cart"
          width="700"
          placement="right"
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Cart />
        </Drawer>
      </div>
    )
  }
}


export default connect()(Products);
