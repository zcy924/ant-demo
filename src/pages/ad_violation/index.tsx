import {DownOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Dropdown, Menu, message} from 'antd';
import React, {useState, useRef} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable, {ProColumns, ActionType} from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import {TableListItem} from './data.d';
import {addAdviolation, modAdviolation, queryAdviolations} from "@/services/advertisement";

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: any) => {
    const hide = message.loading('正在添加');
    try {
        hide();
        await addAdviolation(fields);
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
const handleUpdate = async (fields: any) => {
    const hide = message.loading('正在修改');
    try {
        console.log(fields);
        hide();
        await modAdviolation(fields);
        message.success('修改成功');
        return true;
    } catch (error) {
        hide();
        message.error('修改失败请重试！');
        return false;
    }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (id: string) => {
    // const hide = message.loading('正在删除');
    // if (!id) return true;
    // try {
    //     await delSecurityIncident(id);
    //     hide();
    //     message.success('删除成功，即将刷新');
    //     return true;
    // } catch (error) {
    //     hide();
    //     message.error('删除失败，请重试');
    //     return false;
    // }
};

const Adviolation: React.FC<{}> = () => {
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
    const [modFormValues, setModFormValues] = useState<TableListItem | any>({});
    const actionRef = useRef<ActionType>();
    const columns: ProColumns<TableListItem>[] = [
        {
            title: 'Platform',
            dataIndex: 'platform',
            sorter: true,
        },
        {
            title: 'Account',
            dataIndex: 'account',
            hideInSearch: true
        },
        {
            title: 'State',
            dataIndex: 'state',
            valueEnum: {
                0: {text: '正常', status: 'Success'},
                1: {text: '轻微', status: 'Default'},
                2: {text: '高危', status: 'Warning'},
                3: {text: '封禁', status: 'Error'},
            },
        },
        {
            title: 'Company',
            dataIndex: 'company',
        },
        {
            title: '管理员',
            dataIndex: 'owner'
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
                            setModFormValues(record);
                        }}
                    >
                        编辑
                    </a>
                    {/*<Divider type="vertical"/>*/}
                    {/*<a onClick={async () => {*/}
                    {/*    await handleRemove(record._id);*/}
                    {/*    actionRef.current?.reload()*/}
                    {/*}}>删除</a>*/}
                </>
            ),
        },
    ];

    return (
        <PageHeaderWrapper>
            <ProTable<TableListItem>
                headerTitle="AD Account Risk Management"
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
                request={(params: any) => queryAdviolations(params)}
                columns={columns}
                // rowSelection={{}}
            />
            {
                createModalVisible && <CreateForm
                    onSubmit={async value => {
                        const response = await handleAdd(value);
                        if (response) {
                            handleModalVisible(false);
                            if (actionRef.current) {
                                actionRef.current.reload();
                            }
                        }
                    }}
                    onCancel={() => handleModalVisible(false)}
                    modalVisible={createModalVisible}
                />
            }
            {modFormValues && Object.keys(modFormValues).length ? (
                <UpdateForm
                    onSubmit={async value => {
                        const success = await handleUpdate(value);
                        if (success) {
                            handleModalVisible(false);
                            setModFormValues({});
                            if (actionRef.current) {
                                actionRef.current.reload();
                            }
                        }
                    }}
                    onCancel={() => {
                        handleUpdateModalVisible(false);
                        setModFormValues({});
                    }}
                    modalVisible={updateModalVisible}
                    values={modFormValues}
                />
            ) : null}
        </PageHeaderWrapper>
    );
};

export default Adviolation;
