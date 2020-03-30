import React from 'react';
import {DatePicker, Form, Modal, Select} from 'antd';
import TextArea from "antd/es/input/TextArea";
import moment from "moment";

const FormItem = Form.Item;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: {[key:string]:string }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const [form] = Form.useForm();
  const {Option} = Select;
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
      title="新建安全事故记录"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="日期"
          name="date"
          rules={[{ required: true, message: '请选择日期！' }]}
        >
          <DatePicker style={{width: '100%'}}/>
        </FormItem>
        <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="牵涉包名"
            name="package_names"
            rules={[{ required: true, message: '请至少选择一个包名' }]}
        >
          <Select
              mode='multiple'
              placeholder = '请选择包名'
          >
            <Option value={"anroid"}>android</Option>
          </Select>
        </FormItem>
        <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="事故等级"
            name="level"
        >
          <Select>
            <Option value={0}>轻微</Option>
            <Option value={1}>中等</Option>
            <Option value={2}>严重</Option>
          </Select>
        </FormItem>
        <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="描述"
            name="desc"
        >
          <TextArea rows={2}/>
        </FormItem>
        <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="采取措施"
            name="measure"
        >
          <TextArea rows={2}/>
        </FormItem>
        <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="结果"
            name="result"
        >
          <TextArea rows={2}/>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
