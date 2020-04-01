import React, {useState} from 'react';
import {Button, Form, Input, Modal, Select} from 'antd';
import moment from "moment";
import ProductsTable from "@/pages/ad_violation/components/ProductsTable";
import AddProduct from "@/pages/ad_violation/components/AddProduct";
import ViolationRecordsTable from "@/pages/ad_violation/components/ViolationRecordsTable";
import AddViolation from "@/pages/ad_violation/components/AddViolation";
import EmailTable from "@/pages/ad_violation/components/EmailTable";
import AddMail from "@/pages/ad_violation/components/AddMail";

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
    onSubmit: (fieldsValue: { [key: string]: string }) => void;
    onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = props => {
    const [form] = Form.useForm();
    const [expandProducts, setExpandProducts] = useState(false);
    const [productModal, setProductModal] = useState(false);
    const [violationModal, setViolationModal] = useState(false);
    const [mailModal, setMailModal] = useState(false);
    const {modalVisible, onSubmit: handleAdd, onCancel} = props;
    const addProduct = (params) => {
        return true
    };
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
                    rules={[{required: true, message: '广告平台不可以为空！'}]}
                >
                    <Input placeholder={'请输入广告平台!'}/>
                </FormItem>
                <FormItem
                    label="广告账户"
                    name="account"
                    rules={[{required: true, message: '广告账户不可以为空!'}]}
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
                    <Input placeholder={'请输入管理员名称!'}/>
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
                    label="产品"
                    name='products'
                >
                    <div>
                        <div>
                            <Button onClick={() => {
                                setExpandProducts(!expandProducts)
                            }}>{expandProducts ? '收起' : '展开'}</Button>
                            <Button type='primary' style={{marginLeft: '16px'}}
                                    onClick={() => setProductModal(true)}>新增产品</Button>
                        </div>
                        {
                            expandProducts ? <div style={{marginTop: '8px'}}>
                                <ProductsTable/>
                            </div> : null
                        }
                    </div>
                </FormItem>
                <FormItem
                    label="违规记录"
                    name="violation_records"
                >
                    <div>
                        <div>
                            <Input placeholder="输入关键字过滤(包名，违规内容)" style={{width: '40%'}}/>
                            <Button type="primary" style={{marginLeft: '16px'}}
                                    onClick={() => setViolationModal(true)}>新增违规记录</Button>
                        </div>
                        <div style={{marginTop: '8px'}}>
                            <ViolationRecordsTable/>
                        </div>
                    </div>
                </FormItem>

                <FormItem
                    label="邮件信息"
                    name="violation_records"
                >
                    <div>
                        <div>
                            <Button type="primary"
                                    onClick={() => setMailModal(true)}>新增邮件</Button>
                        </div>
                        <div style={{marginTop: '8px'}}>
                            <EmailTable/>
                        </div>
                    </div>

                </FormItem>

            </Form>
            <AddProduct modalVisible={productModal} onSubmit={async () => {
                addProduct('a');
                setProductModal(false);
            }} onCancel={() => {
                setProductModal(false)
            }}/>
            <AddViolation modalVisible={violationModal} onSubmit={async () => {
                setViolationModal(false)
            }} onCancel={() => setViolationModal(false)}/>
            <AddMail modalVisible={mailModal} onSubmit={async () => {
                setMailModal(false)
            }} onCancel={() => setMailModal(false)}/>
        </Modal>
    );
};

export default CreateForm;
