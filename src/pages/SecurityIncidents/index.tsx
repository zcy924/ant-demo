import {DownOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Dropdown, Menu, message} from 'antd';
import React, {useState, useRef} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable, {ProColumns, ActionType} from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, {FormValueType} from './components/UpdateForm';
import {TableListItem} from './data.d';
import {
    modSecurityIncident,
    delSecurityIncident,
    querySecurityIncidents,
    addSecurityIncident
} from "@/services/securityIncidents";

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
    const hide = message.loading('正在添加');
    try {
        await addSecurityIncident(fields);
        hide();
        message.success('添加成功');
        return true;
    } catch (error) {
        hide();
        message.error('添加失败请重试！');
        return false;
    }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
    const hide = message.loading('正在配置');
    try {
        console.log(fields)
        await modSecurityIncident(fields);
        hide();
        message.success('配置成功');
        return true;
    } catch (error) {
        hide();
        message.error('配置失败请重试！');
        return false;
    }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (id: string) => {
    const hide = message.loading('正在删除');
    if (!id) return true;
    try {
        await delSecurityIncident(id);
        hide();
        message.success('删除成功，即将刷新');
        return true;
    } catch (error) {
        hide();
        message.error('删除失败，请重试');
        return false;
    }
};

const SecurityIncidents: React.FC<{}> = () => {
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
    const [stepFormValues, setStepFormValues] = useState({});
    const actionRef = useRef<ActionType>();
    const columns: ProColumns<TableListItem>[] = [
        {
            title: 'Date',
            dataIndex: 'date',
            sorter: true,
            valueType: 'date',
        },
        {
            title: 'Desc',
            dataIndex: 'desc',
            hideInSearch: true
        },
        {
            title: 'level',
            dataIndex: 'level',
            valueEnum: {
                0: {text: '轻微', status: 'Default'},
                1: {text: '中等', status: 'Warning'},
                2: {text: '严重', status: 'Error'},
            },
        },
        {
            title: '涉及package',
            dataIndex: 'package_names',
        },
        {
            title: 'Measure',
            dataIndex: 'measure'
        },
        {
            title: 'Result',
            dataIndex: 'result',
            hideInSearch: true
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => (
                <>
                    <a
                        onClick={() => {
                            handleUpdateModalVisible(true);
                            setStepFormValues(record);
                        }}
                    >
                        编辑
                    </a>
                    <Divider type="vertical"/>
                    <a onClick={async () => {
                        await handleRemove(record._id);
                        actionRef.current?.reload()
                    }}>删除</a>
                </>
            ),
        },
    ];

    return (
        <PageHeaderWrapper>
            <ProTable<TableListItem>
                headerTitle="Security Incidents Records"
                actionRef={actionRef}
                dateFormatter={'string'}
                rowKey="_id"
                toolBarRender={(action, {selectedRows}) => [
                    <Button icon={<PlusOutlined/>} type="primary" onClick={() => handleModalVisible(true)}>
                        新建
                    </Button>,
                    selectedRows && selectedRows.length > 0 && (
                        <Dropdown
                            overlay={
                                <Menu
                                    onClick={async e => {
                                        if (e.key === 'remove') {
                                            await handleRemove(selectedRows.map(data => data._id).toString());
                                            action.reload();
                                        }
                                    }}
                                    selectedKeys={[]}
                                >
                                    <Menu.Item key="remove">批量删除</Menu.Item>
                                </Menu>
                            }
                        >
                            <Button>
                                批量操作 <DownOutlined/>
                            </Button>
                        </Dropdown>
                    ),
                ]}
                tableAlertRender={false}
                request={(params: any) => querySecurityIncidents(params)}
                columns={columns}
                rowSelection={{}}
            />
            <CreateForm
                onSubmit={async value => {
                    const success = await handleAdd(value);
                    if (success) {
                        handleModalVisible(false);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
                onCancel={() => handleModalVisible(false)}
                modalVisible={createModalVisible}
            />
            {stepFormValues && Object.keys(stepFormValues).length ? (
                <UpdateForm
                    onSubmit={async value => {
                        const success = await handleUpdate(value);
                        if (success) {
                            handleModalVisible(false);
                            setStepFormValues({});
                            if (actionRef.current) {
                                actionRef.current.reload();
                            }
                        }
                    }}
                    onCancel={() => {
                        handleUpdateModalVisible(false);
                        setStepFormValues({});
                    }}
                    updateModalVisible={updateModalVisible}
                    values={stepFormValues}
                />
            ) : null}
        </PageHeaderWrapper>
    );
};

export default SecurityIncidents;
