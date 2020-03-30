import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import {Col, Row, Spin} from 'antd';
import styles from './index.less';

export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <PageHeaderWrapper>
        <div>
            <Row>
                <Col span={12}>haha</Col>
                <Col span={12}>xixi</Col>
            </Row>
        </div>
    </PageHeaderWrapper>
  );
};
