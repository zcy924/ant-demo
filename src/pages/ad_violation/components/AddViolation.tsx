import React from "react";
import {Button, DatePicker, Form, Input, Modal, Select, Switch, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import {UploadOutlined} from "@ant-design/icons/lib";

const FormItem = Form.Item;
const Option = Select.Option;
const formLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 15},
};
const states = [
    {
        value: 0,
        label: '轻微'
    },
    {
        value: 1,
        label: '中等'
    },
    {
        value: 2,
        label: '严重'
    }
];

export interface ViolationRecordsProps {
    modalVisible: boolean;
    onSubmit: (params: { [key: string]: any }) => void;
    onCancel: () => void
}

const AddViolation: React.FC<ViolationRecordsProps> = props => {
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
            width={'40%'}
            onOk={() => handleAdd()}
            onCancel={() => onCancel()}
            title={"新增违规记录"}
        >
            <Form form={form}
                  {...formLayout}
            >
                <FormItem
                    label="处理日期"
                    name="time"
                    rules={[{required: true, message: '请选择日期!'}]}
                >
                    <DatePicker style={{width: '100%'}}/>
                </FormItem>

                <FormItem
                    label="违规类型"
                    name="tag"
                    rules={[{required: true, message: 'Package Name不可以为空!'}]}
                >
                    <Input placeholder={'请输入违规类型!'}/>
                </FormItem>

                <FormItem
                    label="牵涉包名"
                    name="package_names"
                >
                    <Input placeholder={'请输入包名!'}/>
                </FormItem>

                <FormItem
                    label="负责人类型"
                    name="owner_type"
                >
                    <Select>
                        {
                            ['产品PM', '运营PM', 'MZM', 'Dev'].map(item => (
                                <Option value={item}>{item}</Option>
                            ))
                        }
                    </Select>
                </FormItem>

                <FormItem
                    label="处理发布状态"
                    name="status"
                >
                    <Input placeholder={'请输入包名!'}/>
                </FormItem>

                <FormItem
                    label="违规内容"
                    name="content"
                >
                    <TextArea rows={2}/>
                </FormItem>

                <FormItem
                    label="描述文件"
                    name="file_url"
                >
                    <Upload>
                        <Button>
                            <UploadOutlined/> Click to Upload
                        </Button>
                    </Upload>
                </FormItem>

                <FormItem
                    label="请选择账号状态"
                    name="level"
                >
                    <Select>
                        {
                            states.map(item => (
                                <Option value={item.value}>{item.label}</Option>
                            ))
                        }
                    </Select>
                </FormItem>

                <FormItem
                    label="措施描述文件"
                    name="solve_file_url"
                >
                    <Upload>
                        <Button>
                            <UploadOutlined/> Click to Upload
                        </Button>
                    </Upload>
                </FormItem>

                <FormItem
                    label="采取措施"
                    name="measure"
                >
                    <TextArea rows={2}/>
                </FormItem>

                <FormItem
                    label="最终结果"
                    name="results"
                >
                    <TextArea rows={2}/>
                </FormItem>

                <FormItem
                    label="是否跟踪"
                    name="need_alarm"
                >
                    <Switch />
                </FormItem>

                <FormItem
                    label="已结束"
                    name="finished"
                >
                    <Switch />
                </FormItem>

                <FormItem
                    label="处理deadline"
                    name="deadline"
                    rules={[{required: true, message: '请选择日期!'}]}
                >
                    <DatePicker style={{width: '100%'}}/>
                </FormItem>

                <FormItem
                    label="报警邮箱"
                    name="alarm_emails"
                >
                    <Input />
                </FormItem>

                <FormItem
                    label="报警内容"
                    name="alarm_content"
                >
                    <TextArea rows={2}/>
                </FormItem>

                <FormItem
                    label="有关邮件"
                    name="associate_email"
                >
                    <Input />
                </FormItem>

            </Form>
        </Modal>
    )
}
export default AddViolation
