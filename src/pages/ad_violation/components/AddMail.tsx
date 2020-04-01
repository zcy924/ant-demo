import React from "react";
import {Form, Input, Modal, Select} from "antd";
import TextArea from "antd/es/input/TextArea";

const FormItem = Form.Item;
const formLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 15},
};

export interface AddMailProps {
    modalVisible: boolean;
    onSubmit: (params: { [key: string]: any }) => void;
    onCancel: () => void
}

const AddMail: React.FC<AddMailProps> = props => {
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
            visible={modalVisible}
            onOk={() => handleAdd()}
            width={'40%'}
            onCancel={() => onCancel()}
            title={"新增邮件"}
        >
            <Form form={form}
                  {...formLayout}
            >
                <FormItem
                    label="标题或简述"
                    name="title"
                    rules={[{required: true, message: '标题不可以为空!'}]}
                >
                    <Input placeholder={'请输入标题!'}/>
                </FormItem>
                <FormItem
                    label="内容"
                    name="content"
                >
                    <TextArea rows={8} placeholder={'请输入内容'} />
                </FormItem>
            </Form>
        </Modal>
    )
}
export default AddMail
