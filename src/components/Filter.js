import React from 'react';
import { connect } from 'dva';
import { Checkbox, Row, Col } from 'antd';

class Filter extends React.Component {
    state = {
        initProducts: []
    }

     componentDidMount() {
        this.getApi()
    }

    handleSize = size =>{
        const {initProducts} = this.state
        const {dispatch} = this.props
        dispatch({
            type: 'products/size',
            payload: { size, initProducts }
        })
    }

     getApi = async () => {
        const {dispatch} = this.props
        const {initProducts} = this.state
        await dispatch({
            type: 'products/query',
            callback:data=>{
                this.setState({initProducts:data})
            }
        });
    }

    render() {
        const allsize = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL']

        return (
            <Checkbox.Group style={{ width: '100%' }} onChange={this.handleSize}> Sizes:
                <Row>
                    {allsize.map(item => (
                        <Col span={8} key={item}>
                            <Checkbox value={item} key={item}>{item}</Checkbox>
                        </Col>
                    ))}
                </Row>
            </Checkbox.Group>
        )
    }
}

const mapStateToProps = ({ products }) => ({
    products: products
})

export default connect(mapStateToProps)(Filter);