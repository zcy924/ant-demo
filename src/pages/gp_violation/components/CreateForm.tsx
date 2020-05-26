import React, {useState} from 'react';
import {Button, Form, Input, Modal, Select, Switch} from 'antd';
import ProductsTable from "@/pages/ad_violation/components/ProductsTable";
import AddProduct from "@/pages/ad_violation/components/AddProduct";
import ViolationRecordsTable from "@/pages/ad_violation/components/ViolationRecordsTable";
import AddViolation from "@/pages/ad_violation/components/AddViolation";
import EmailTable from "@/pages/ad_violation/components/EmailTable";
import AddMail from "@/pages/ad_violation/components/AddMail";
import AddMisuseRecord from "@/pages/gp_violation/components/AddMisuseRecord";
import {Mail, Product, ViolationRecord} from "@/pages/ad_violation/data";
import TextArea from "antd/es/input/TextArea";
import MisuseRecordTable from "@/pages/gp_violation/components/MisuseRecordTable";
import {MisuseRecord} from "@/pages/gp_violation/data";

const FormItem = Form.Item;
const Option = Select.Option;
const formLayout = {
    labelCol: {span: 3},
    wrapperCol: {span: 19},
};
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
    const [misuseModal, setMisuseModal] = useState(false);
    const [mailModal, setMailModal] = useState(false);

    const [productTableData, setProductTableData] = useState<Product[]>([]);
    const [violationTableData, setViolationTableData] = useState<ViolationRecord[]>([]);
    const [mailTableData, setMailTableData] = useState<Mail[]>([]);
    const [misuseTableData, setMisuseTableData] = useState<MisuseRecord[]>([]);

    const {modalVisible, onSubmit: handleAdd, onCancel} = props;

    const [modProductInfo, setModProductInfo] = useState();
    const [modViolationInfo, setModlViolationInfo] = useState();
    const [modEmailInfo, setModEmailInfo] = useState();
    const [modMisuseInfo, setModMisuseInfo] = useState();

    const addProduct = (params: Product) => {
        // 判断列表中是否已存在相同id，存在则替换item，不存在则增加item
        let flag = true;
        productTableData.forEach((item, index) => {
            if (params['key'] === item['key']) {
                productTableData[index] = params;
                setProductTableData([...productTableData]);
                flag = false
            }
        });
        flag && setProductTableData([...productTableData, params]);


    };
    const delProduct = (key: string) => {
        setProductTableData([...productTableData.filter(item => item['key'] !== key)])
    };

    const modProduct = (key: string) => {
        const [tempData] = productTableData.filter(item => item['key'] === key);
        setModProductInfo(tempData);
        setProductModal(true);
    };

    const addViolationRecord = (params: ViolationRecord) => {
        let flag = true;
        violationTableData.forEach((item, index) => {
            if (params['key'] === item['key']) {
                violationTableData[index] = params;
                setViolationTableData([...violationTableData]);
                flag = false
            }
        });
        flag && setViolationTableData([...violationTableData, params]);
    };
    const modViolation = (key: string) => {
        const [tempData] = violationTableData.filter(item => item['key'] === key);
        setModlViolationInfo(tempData);
        setViolationModal(true);
    };
    const delViolation = (key: string) => {
        setViolationTableData([...violationTableData.filter(item => item['key'] !== key)])
    };

    const addMail = (params: Mail) => {
        let flag = true;
        mailTableData.forEach((item, index) => {
            if (params['key'] === item['key']) {
                mailTableData[index] = params;
                setMailTableData([...mailTableData]);
                flag = false
            }
        });
        flag && setMailTableData([...mailTableData, params]);
    };
    const delMail = (key: string) => {
        setMailTableData([...mailTableData.filter(item => item['key'] !== key)]);
    };
    const modMail = (key: string) => {
        const [tempData] = mailTableData.filter(item => item['key'] === key);
        setModEmailInfo(tempData);
        setMailModal(true);
    };

    const addMisuseRecord = (params: MisuseRecord) => {
        let flag = true;
        misuseTableData.forEach((item, index) => {
            if (params['key'] === item['key']) {
                misuseTableData[index] = params;
                setMisuseTableData([...misuseTableData]);
                flag = false
            }
        });
        flag && setMisuseTableData([...misuseTableData, params]);
    }
    const delMisuseRecord = (key: string) => {
        setMisuseTableData([...misuseTableData.filter(item => item['key'] !== key)]);
    }
    const modMisuseRecord = (key: string) => {
        const [tempData] = misuseTableData.filter(item => item['key'] === key);
        setMisuseTableData(tempData);
        setMisuseModal(true);
    }

    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        // form.resetFields();
        fieldsValue.ad_products = productTableData.map(item => {
            delete item['key'];
            return item;
        });
        fieldsValue.ad_violation_records = violationTableData.map(item => {
            delete item['key'];
            return item;
        });
        fieldsValue.source_emails = mailTableData;
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
            afterClose={() => {
                form.resetFields([])
            }}
        >
            <Form form={form}
                  {...formLayout}
            >
                <FormItem
                    label="账户gmail"
                    name="account"
                    rules={[{required: true, message: 'gmail账户不可以为空！'}]}
                >
                    <Input placeholder={'请输入gmail账户!'}/>
                </FormItem>
                <FormItem
                    label="Owner"
                    name="owner"
                    rules={[{required: true, message: '负责人不可以为空!'}]}
                >
                    <Input placeholder={'请输入负责人!'}/>
                </FormItem>
                <FormItem
                    label="白名单"
                    name="in_whitelist"
                    valuePropName="checked"
                >
                    <Switch/>
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
                    label="关联污染状态"
                    name="pollution_state"
                >
                    <TextArea rows={2}></TextArea>
                </FormItem>
                <FormItem
                    label="反馈邮箱"
                    name="feedback_email"
                >
                    <Input></Input>
                </FormItem>

                <FormItem label="子账号" name="sub_accounts">
                    <Select mode="tags" placeholder="请输入子账号!">
                    </Select>
                </FormItem>


                <FormItem
                    label="产品"
                    name='ad_products'
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
                                <ProductsTable dataSource={productTableData} del={(key: string) => {
                                    delProduct(key)
                                }} mod={(key) => {
                                    modProduct(key)
                                }}/>
                            </div> : null
                        }
                    </div>
                </FormItem>
                <FormItem
                    label="违规记录"
                    name="product_violation_records"
                >
                    <div>
                        <div>
                            <Input placeholder="输入关键字过滤(包名，违规内容)" style={{width: '40%'}}/>
                            <Button type="primary" style={{marginLeft: '16px'}}
                                    onClick={() => setViolationModal(true)}>新增违规记录</Button>
                        </div>
                        <div style={{marginTop: '8px'}}>
                            <ViolationRecordsTable dataSource={violationTableData}
                                                   del={(key: string) => delViolation(key)} mod={(key: string) => {
                                modViolation(key)
                            }}/>
                        </div>
                    </div>
                </FormItem>

                <FormItem
                    label="原始邮件信息"
                    name="source_emails"
                >
                    <div>
                        <div>
                            <Button type="primary"
                                    onClick={() => setMailModal(true)}>新增邮件</Button>
                        </div>
                        <div style={{marginTop: '8px'}}>
                            <EmailTable dataSource={mailTableData} del={key => delMail(key)} mod={key => modMail(key)}/>
                        </div>
                    </div>
                </FormItem>
                <FormItem
                    label="人员误操作记录"
                    name="misuse_records"
                >
                    <div>
                        <div>
                            <Button type="primary"
                                    onClick={() => setMisuseModal(true)}>新增人员误操作记录</Button>
                        </div>
                        <div style={{marginTop: '8px'}}>
                            <MisuseRecordTable dataSource={misuseTableData} del={key => delMisuseRecord(key)}
                                               mod={key => modMisuseRecord(key)}/>
                        </div>
                    </div>
                </FormItem>

            </Form>

            {
                productModal && <AddProduct modalVisible={productModal}
                                            initValue={modProductInfo} onSubmit={(params: Product) => {
                    addProduct(params);
                    setModProductInfo(null);
                    setProductModal(false);
                }} onCancel={() => {
                    setModProductInfo(null);
                    setProductModal(false);
                }}/>
            }

            {
                violationModal && <AddViolation modalVisible={violationModal} initValue={modViolationInfo}
                                                onSubmit={(params: ViolationRecord) => {
                                                    addViolationRecord(params);
                                                    setModlViolationInfo(null);
                                                    setViolationModal(false)
                                                }} onCancel={() => {
                    setModlViolationInfo(null);
                    setViolationModal(false)
                }}/>
            }

            {
                mailModal && <AddMail modalVisible={mailModal} initValue={modEmailInfo} onSubmit={(params: Mail) => {
                    addMail(params);
                    setModEmailInfo(null);
                    setMailModal(false);
                }} onCancel={() => {
                    setModEmailInfo(null);
                    setMailModal(false);
                }}/>
            }

            {
                misuseModal &&
                <AddMisuseRecord modalVisible={misuseModal} onSubmit={(params: MisuseRecord) => {
                    addMisuseRecord(params);
                    setModMisuseInfo(null);
                    setMisuseModal(false);
                }
                } onCancel={() => {
                    setModMisuseInfo(null)
                    setMisuseModal(false)
                }
                } initValue={modMisuseInfo}/>
            }
        </Modal>
    );
};

export default CreateForm;
