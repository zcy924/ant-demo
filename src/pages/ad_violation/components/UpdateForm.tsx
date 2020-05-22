import React, {useState} from "react";
import {Button, Form, Input, Modal, Select} from "antd";
import ProductsTable from "@/pages/ad_violation/components/ProductsTable";
import AddProduct from "@/pages/ad_violation/components/AddProduct";
import ViolationRecordsTable from "@/pages/ad_violation/components/ViolationRecordsTable";
import AddViolation from "@/pages/ad_violation/components/AddViolation";
import EmailTable from "@/pages/ad_violation/components/EmailTable";
import AddMail from "@/pages/ad_violation/components/AddMail";
import {
    Mail,
    Product,
    TableListItem,
    ViolationRecord,
} from "@/pages/ad_violation/data";
import {guid} from "@/utils/utils";

const FormItem = Form.Item;
const Option = Select.Option;
const formLayout = {
    labelCol: {span: 3},
    wrapperCol: {span: 19},
};
const states = [
    {
        value: 0,
        label: "正常",
    },
    {
        value: 1,
        label: "轻微",
    },
    {
        value: 2,
        label: "高危",
    },
    {
        value: 3,
        label: "封禁",
    },
];

interface UpdateFormProps {
    modalVisible: boolean;
    onSubmit: (fieldsValue: { [key: string]: string }) => void;
    onCancel: () => void;
    values: TableListItem;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
    const [form] = Form.useForm();
    const {values: initValue} = props;
    const [expandProducts, setExpandProducts] = useState(false);
    const [productModal, setProductModal] = useState(false);
    const [violationModal, setViolationModal] = useState(false);
    const [mailModal, setMailModal] = useState(false);
    const [productTableData, setProductTableData] = useState<Product[]>(
        initValue.ad_products.map((item) => {
            item["key"] = guid();
            return item;
        })
    );
    const [violationTableData, setViolationTableData] = useState<ViolationRecord[]>(
        initValue.ad_violation_records.map((item) => {
            item["key"] = guid();
            return item;
        })
    );
    const [mailTableData, setMailTableData] = useState<Mail[]>(initValue.source_emails.map(item => {
        item["key"] = guid()
        return item
    }));
    const {modalVisible, onSubmit: handleAdd, onCancel} = props;
    const [modProductInfo, setModProductInfo] = useState();
    const [modViolationInfo, setModlViolationInfo] = useState();
    const [modEmailInfo, setModEmailInfo] = useState();
    const addProduct = (params: Product) => {
        // 判断列表中是否已存在相同id，存在则替换item，不存在则增加item
        let flag = true;
        productTableData.forEach((item, index) => {
            if (params["key"] === item["key"]) {
                productTableData[index] = params;
                setProductTableData([...productTableData]);
                flag = false;
            }
        });
        flag && setProductTableData([...productTableData, params]);
    };
    const delProduct = (key: string) => {
        setProductTableData([
            ...productTableData.filter((item) => item["key"] !== key),
        ]);
    };

    const modProduct = (key: string) => {
        const [tempData] = productTableData.filter((item) => item["key"] === key);
        setModProductInfo(tempData);
        setProductModal(true);
    };

    const addViolationRecord = (params: ViolationRecord) => {
        let flag = true;
        violationTableData.forEach((item, index) => {
            if (params["key"] === item["key"]) {
                violationTableData[index] = params;
                setViolationTableData([...violationTableData]);
                flag = false;
            }
        });
        flag && setViolationTableData([...violationTableData, params]);
    };
    const modViolation = (key: string) => {
        const [tempData] = violationTableData.filter((item) => item["key"] === key);
        setModlViolationInfo(tempData);
        setViolationModal(true);
    };
    const delViolation = (key: string) => {
        setViolationTableData([
            ...violationTableData.filter((item) => item["key"] !== key),
        ]);
    };

    const addMail = (params: Mail) => {
        let flag = true;
        mailTableData.forEach((item, index) => {
            if (params["key"] === item["key"]) {
                mailTableData[index] = params;
                setMailTableData([...mailTableData]);
                flag = false;
            }
        });
        flag && setMailTableData([...mailTableData, params]);
    };
    const delMail = (key: string) => {
        setMailTableData([...mailTableData.filter((item) => item["key"] !== key)]);
    };
    const modMail = (key: string) => {
        const [tempData] = mailTableData.filter((item) => item["key"] === key);
        setModEmailInfo(tempData);
        setMailModal(true);
    };

    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        // form.resetFields();
        fieldsValue.ad_products = productTableData
        fieldsValue.ad_violation_records = violationTableData
        fieldsValue.source_emails = mailTableData;
        fieldsValue['id'] = initValue.id;
        handleAdd(fieldsValue);
    };
    return (
        <Modal
            destroyOnClose
            width={"70%"}
            title="新建AddViolation"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => onCancel()}
            afterClose={() => {
                form.resetFields([]);
            }}
        >
            <Form form={form} {...formLayout} initialValues={initValue}>
                <FormItem
                    label="广告平台"
                    name="platform"
                    rules={[{required: true, message: "广告平台不可以为空！"}]}
                >
                    <Input placeholder={"请输入广告平台!"}/>
                </FormItem>
                <FormItem
                    label="广告账户"
                    name="account"
                    rules={[{required: true, message: "广告账户不可以为空!"}]}
                >
                    <Input placeholder={"请输入广告账户!"}/>
                </FormItem>
                <FormItem label="公司" name="company">
                    <Input placeholder={"请输入公司名称!"}/>
                </FormItem>
                <FormItem label="管理员" name="owner">
                    <Input placeholder={"请输入管理员名称!"}/>
                </FormItem>
                <FormItem label="账号状态" name="state">
                    <Select placeholder={"请选择账户状态"}>
                        {states.map((item) => (
                            <Option value={item.value} key={item.value}>
                                {item.label}
                            </Option>
                        ))}
                    </Select>
                </FormItem>
                <FormItem label="产品" name="ad_products">
                    <div>
                        <div>
                            <Button
                                onClick={() => {
                                    setExpandProducts(!expandProducts);
                                }}
                            >
                                {expandProducts ? "收起" : "展开"}
                            </Button>
                            <Button
                                type="primary"
                                style={{marginLeft: "16px"}}
                                onClick={() => setProductModal(true)}
                            >
                                新增产品
                            </Button>
                        </div>
                        {expandProducts ? (
                            <div style={{marginTop: "8px"}}>
                                <ProductsTable
                                    dataSource={productTableData}
                                    del={(key: string) => {
                                        delProduct(key);
                                    }}
                                    mod={(key) => {
                                        modProduct(key);
                                    }}
                                />
                            </div>
                        ) : null}
                    </div>
                </FormItem>
                <FormItem label="违规记录" name="ad_violation_records">
                    <div>
                        <div>
                            <Input
                                placeholder="输入关键字过滤(包名，违规内容)"
                                style={{width: "40%"}}
                            />
                            <Button
                                type="primary"
                                style={{marginLeft: "16px"}}
                                onClick={() => setViolationModal(true)}
                            >
                                新增违规记录
                            </Button>
                        </div>
                        <div style={{marginTop: "8px"}}>
                            <ViolationRecordsTable
                                dataSource={violationTableData}
                                del={(key: string) => delViolation(key)}
                                mod={(key: string) => {
                                    modViolation(key);
                                }}
                            />
                        </div>
                    </div>
                </FormItem>

                <FormItem label="邮件信息" name="source_emails">
                    <div>
                        <div>
                            <Button type="primary" onClick={() => setMailModal(true)}>
                                新增邮件
                            </Button>
                        </div>
                        <div style={{marginTop: "8px"}}>
                            <EmailTable
                                dataSource={mailTableData}
                                del={(key) => delMail(key)}
                                mod={(key) => modMail(key)}
                            />
                        </div>
                    </div>
                </FormItem>
            </Form>

            {productModal && (
                <AddProduct
                    modalVisible={productModal}
                    initValue={modProductInfo}
                    onSubmit={(params: Product) => {
                        addProduct(params);
                        setModProductInfo(null);
                        setProductModal(false);
                    }}
                    onCancel={() => {
                        setModProductInfo(null);
                        setProductModal(false);
                    }}
                />
            )}

            {violationModal && (
                <AddViolation
                    modalVisible={violationModal}
                    initValue={modViolationInfo}
                    onSubmit={(params: ViolationRecord) => {
                        addViolationRecord(params);
                        setModlViolationInfo(null);
                        setViolationModal(false);
                    }}
                    onCancel={() => {
                        setModlViolationInfo(null);
                        setViolationModal(false);
                    }}
                />
            )}

            {mailModal && (
                <AddMail
                    modalVisible={mailModal}
                    initValue={modEmailInfo}
                    onSubmit={(params: Mail) => {
                        addMail(params);
                        setModEmailInfo(null);
                        setMailModal(false);
                    }}
                    onCancel={() => {
                        setModEmailInfo(null);
                        setMailModal(false);
                    }}
                />
            )}
        </Modal>
    );
};

export default UpdateForm;
