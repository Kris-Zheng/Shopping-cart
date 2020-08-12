import React, { PureComponent } from 'react';
import { Spin } from 'antd';

class Loading extends PureComponent {
  render() {

    return (
      <Spin size='large' style={{ textAlign: 'center', width: '100%', paddingTop: 150,paddingLeft:500, paddingBottom:150}} />
    );
  }
}

export default Loading;
