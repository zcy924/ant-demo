import React from "react";
import {Form, Input, Modal, Select} from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
const formLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 15},
};
const states = [
    {
        value: 0,
        label: '正常'
    },
    {
        value: 1,
        label: '下架'
    },
];

export interface AddProductProps {
    modalVisible: boolean;
    onSubmit: (params: { [key: string]: any }) => void;
    onCancel: () => void
}

const AddProduct: React.FC<AddProductProps> = props => {
    const [form] = Form.useForm();
    const {modalVisible, onSubmit, onCancel} = props;
    const handleAdd = async () => {
        const params = await form.validateFields();
        form.resetFields();
        onSubmit(params);
    }
    return (
        <Modal
            destroyOnClose
            width={'40%'}
            visible={modalVisible}
            onOk={() => handleAdd()}
            onCancel={() => onCancel()}
            title={"新增产品"}
        >
            <Form form={form}
                  {...formLayout}
            >
                <FormItem
                    label="App Name"
                    name="app_name"
                    rules={[{required: true, message: 'app name不可以为空!'}]}
                >
                    <Input placeholder={'请输入App Name!'}/>
                </FormItem>
                <FormItem
                    label="Package Name"
                    name="package_name"
                    rules={[{required: true, message: 'Package Name不可以为空!'}]}
                >
                    <Input placeholder={'请输入Package Name!'}/>
                </FormItem>
                <FormItem
                    label="Owner"
                    name="owner"
                >
                    <Input placeholder={'请输入管理员!'}/>
                </FormItem>
                <FormItem
                    label="状态"
                    name="state"
                >
                    <Select>
                        {
                            states.map(item => (
                                <Option value={item.value}>{item.label}</Option>
                            ))
                        }
                    </Select>

                </FormItem>
            </Form>
        </Modal>
    )
}
export default AddProduct
