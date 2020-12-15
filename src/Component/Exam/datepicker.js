import React from 'react';
// import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
// import '../../index.css';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

function onChange(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}

function onOk(value) {
  console.log('onOk: ', value);
}

export default function DP(props){
  return (
  <Space direction="vertical" size={12}>    
    <RangePicker
      showPanels={['year', 'year']}
      showTime={{ format: 'HH:mm' }}
      format="YYYY-MM-DD HH:mm"
      onChange={onChange}
      onOk={onOk}
    />
  </Space>
  );
}