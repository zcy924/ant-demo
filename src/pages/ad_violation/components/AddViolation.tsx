import React, {useState} from "react";
import {Form, Input, Select} from "antd";
import TextArea from "antd/es/input/TextArea";

const FormItem = Form.Item;
const Option = Select.Option;
const formLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 18},
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

const AddViolation: React.FC = props => {
    const [form] = Form.useForm();

    return (
        <div style={{backgroundColor: 'white', padding: '16px'}}>
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
                    <TextArea rows={2}/>
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
                <FormItem
                    label="结果"
                    name="result"
                >
                    <TextArea rows={2}/>
                </FormItem>
            </Form>
        </div>
    )
}
export default AddViolation
