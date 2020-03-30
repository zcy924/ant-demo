import React from 'react';
import {Form, DatePicker, Input, Modal, Select} from 'antd';
import {TableListItem} from '../data.d';
import moment from "moment";

export interface FormValueType extends Partial<TableListItem> {
    target?: string;
    template?: string;
    type?: string;
    time?: string;
    frequency?: string;
}

export interface UpdateFormProps {
    onCancel: (flag?: boolean, formVals?: FormValueType) => void;
    onSubmit: (values: FormValueType) => void;
    updateModalVisible: boolean;
    values: Partial<TableListItem>;
}

const FormItem = Form.Item;
const {TextArea} = Input;
const {Option} = Select;

export interface UpdateFormState {
    formVals: FormValueType;
    currentStep: number;
}

const UpdateForm: React.FC<UpdateFormProps> = props => {
    const [form] = Form.useForm();

    const {
        onSubmit: handleUpdate,
        onCancel: handleUpdateModalVisible,
        updateModalVisible,
        values,
    } = props;
    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        fieldsValue.date = moment(fieldsValue.date).format('YYYY-MM-DD');
        fieldsValue._id = props.values._id;
        form.resetFields();
        handleUpdate(fieldsValue);
    };

    return (
        <Modal
            destroyOnClose
            title="修改安全事故记录"
            visible={updateModalVisible}
            onOk={() => okHandle()}
            onCancel={() => handleUpdateModalVisible(false, values)}
            afterClose={() => handleUpdateModalVisible()}
        >
            <Form
                form={form}
                initialValues={{
                    ...props.values,
                    date:moment(props.values.date)
                }}
            >
                <FormItem
                    labelCol={{span: 5}}
                    wrapperCol={{span: 15}}
                    label="日期"
                    name="date"
                    rules={[{required: true, message: '请选择日期！'}]}
                >
                    <DatePicker style={{width: '100%'}}/>
                    {/*<Input />*/}
                </FormItem>
                <FormItem
                    labelCol={{span: 5}}
                    wrapperCol={{span: 15}}
                    label="牵涉包名"
                    name="package_names"
                    rules={[{required: true, message: '请至少选择一个包名'}]}
                >
                    <Select
                        mode='multiple'
                        placeholder='请选择包名'
                    >
                        <Option value={"anroid"}>android</Option>
                    </Select>
                </FormItem>
                <FormItem
                    labelCol={{span: 5}}
                    wrapperCol={{span: 15}}
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
                    labelCol={{span: 5}}
                    wrapperCol={{span: 15}}
                    label="描述"
                    name="desc"
                >
                    <TextArea rows={2}/>
                </FormItem>
                <FormItem
                    labelCol={{span: 5}}
                    wrapperCol={{span: 15}}
                    label="采取措施"
                    name="measure"
                >
                    <TextArea rows={2}/>
                </FormItem>
                <FormItem
                    labelCol={{span: 5}}
                    wrapperCol={{span: 15}}
                    label="结果"
                    name="result"
                >
                    <TextArea rows={2}/>
                </FormItem>
            </Form>
        </Modal>
    );
};

export default UpdateForm;
