import React from 'react';
import { connect } from 'dva';
import { Card, Button, Select, Popover, List } from 'antd';
import Loading from '../components/Loading';


class ProductList extends React.Component {

  state = {
    initProduct: []
  }

  componentDidMount() {
    const { products } = this.props;
    this.setState({ initProduct: products })
  }

  render() {
    const { Option } = Select;
    const { products, handleSort, addToCart, loading } = this.props;
    const { models } = loading;

    const list = (products.productsList || []).map((item) => (
      <Card style={{ textAlign: 'center' }} key={item.id}>
        <img src={`./images/${item.sku}_1.jpg`} alt='loading' />
        <h3>{item.title}</h3>
        <h4>{item.currencyFormat}{item.price}</h4>
        <Popover
          content={
            <List
              size="small"
              dataSource={item.availableSizes}
              renderItem={size => <List.Item><Button onClick={() => addToCart(item, size)} block>{size}</Button></List.Item>}
            />
          }
          title="Selective size"
          trigger="click">
          <Button size="large" block>Add to Cart</Button>
        </Popover>
      </Card>
    ));
    return (
      models.products ?
        <div>
          <Loading />
        </div>
        :
        <div>
          <Select
            defaultValue="Default"
            onChange={handleSort}
            style={{ width: 200 }}
          >
            <Option value="Default">Default</Option>
            <Option value="Lowest to Highest">Lowest to Highest</Option>
            <Option value="Highest to Lowest">Highest to Lowest</Option>
          </Select>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {list}
          </div>
        </div>
    )
  }
}

const mapStateToProps = ({ products, loading }) => ({
  products: products,
  loading: loading
})

const mapDispatchToProps = (dispatch) => ({
  handleSort: rule => {
    dispatch({
      type: 'products/price',
      payload: { rule }
    })
  },

  addToCart: (item, size) => {
    dispatch({
      type: 'cart/addToCart',
      payload: { ...item, size }
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
