import React from 'react';
import {DatePicker, Form, Input, Modal, Select} from 'antd';
import TextArea from "antd/es/input/TextArea";
import moment from "moment";

const FormItem = Form.Item;
const Option = Select.Option;
const formLayout = {
  labelCol: {span: 3},
  wrapperCol: {span: 19},
}
const states = [
  {
    value: 0,
    label: '正常'
  },
  {
    value: 1,
    label: '轻微'
  },
  {
    value: 2,
    label: '高危'
  },
  {
    value: 3,
    label: '封禁'
  }
];

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: {[key:string]:string }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const [form] = Form.useForm();

  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    fieldsValue.date = moment(fieldsValue.data).format('YYYY-MM-DD');
    form.resetFields();
    handleAdd(fieldsValue);
  };
  return (
    <Modal
      destroyOnClose
      width={'70%'}
      title="新建AddViolation"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}
            {...formLayout}
      >
        <FormItem
            label="广告平台"
            name="platform"
            rules={[{required: true, message: '请选择日期！'}]}
        >
          <Input placeholder={'请输入广告平台!'}/>
        </FormItem>
        <FormItem
            label="广告账户"
            name="account"
            rules={[{required: true, message: '请至少选择一个包名'}]}
        >
          <Input placeholder={'请输入广告账户!'}/>
        </FormItem>
        <FormItem
            label="公司"
            name="company"
        >
          <Input placeholder={'请输入公司名称!'}/>
        </FormItem>
        <FormItem
            label="管理员"
            name="owner"
        >
          <Input placeholder={'请输入管理员名称!'} />
        </FormItem>
        <FormItem
            label="账号状态"
            name="state"
        >
          <Select placeholder={'请选择账户状态'}>
            {states.map(item => (
                <Option value={item.value} key={item.value}>{item.label}</Option>
            ))}
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
