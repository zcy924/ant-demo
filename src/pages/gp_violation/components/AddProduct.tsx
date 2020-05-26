import React from "react";
import {Form, Input, Modal, Select} from "antd";
import {Product} from "@/pages/ad_violation/data";
import {guid} from "@/utils/utils";

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
    onSubmit: (params: Product) => void;
    onCancel: () => void
    initValue: Product | undefined,
}

const AddProduct: React.FC<AddProductProps> = props => {
    const [form] = Form.useForm();
    const {modalVisible, onSubmit, onCancel, initValue} = props;
    const handleAdd = async () => {
        const params: any = await form.validateFields();
        params['key'] = initValue ? initValue['key'] : guid();
        onSubmit(params);
    };
    return (
        <Modal
            destroyOnClose
            width={'40%'}
            visible={modalVisible}
            key="key"
            onOk={() => handleAdd()}
            onCancel={() => {
                onCancel()
            }}
            title={"新增产品"}
        >
            <Form form={form}
                  {...formLayout}
                  initialValues={initValue}
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
                                <Option key={item.value} value={item.value}>{item.label}</Option>
                            ))
                        }
                    </Select>

                </FormItem>
            </Form>
        </Modal>
    )
};
export default AddProduct
