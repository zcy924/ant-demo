import {DownOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Dropdown, Menu, message} from 'antd';
import React, {useState, useRef, useEffect} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable, {ProColumns, ActionType} from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import {TableListItem, ViolationRecord} from './data.d';
import {addOrModAdviolation, queryAdviolations} from "@/services/advertisement";

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: any) => {
    const hide = message.loading('正在添加');
    try {
        hide();
        await addOrModAdviolation(fields);
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
        await addOrModAdviolation(fields);
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
};

const Adviolation: React.FC<{}> = () => {
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
    const [isViolationView, setIsViolationView] = useState(false);
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
                            console.log(record)
                            setModFormValues(record);
                        }}
                    >
                        编辑
                    </a>
                </>
            ),
        },
    ]

    const violationColumns: ProColumns<TableListItem> = [
        {
            title: '日期',
            dataIndex: ['violation_record', 'time'],
        },
        {
            title: '违规类型',
            dataIndex: ['violation_record', 'tag'],
        },
        {
            title: '平台',
            dataIndex: 'platform'
        },
        {
            title: 'Account',
            dataIndex: 'account'
        },
        {
            title: '涉及package',
            dataIndex: ['violation_record', 'package_names'],
        },
        {
            title: '违规内容',
            dataIndex: 'violation_record.content'
        },
        {
            title: '违规等级',
            dataIndex: ['violation_record', 'level'],
            valueEnum: {
                0: {text: '轻微', status: 'Default'},
                1: {text: '中等', status: 'Warning'},
                2: {text: '严重', status: 'Error'},
            }
        },
        {
            title: '应对措施',
            dataIndex: ['violation_record', 'measure'],
        },
        {
            title: '处理结果',
            dataIndex: ['violation_record', 'results'],
        },
        {
            title: '操作',
            width: 150,
            fixed: 'right',
            render: (_, record) => (
                <>
                    <a onClick={() => console.log(record)}>编辑</a>
                </>
            )
        },];

    const acquireData = async (params: any) => {
        const res = await queryAdviolations(params);
        const dataList: { data: any[] } = {data: []};
        if (!isViolationView) {
            res.data.forEach((item: TableListItem) => {
                if (item.ad_violation_records.length > 0) {
                    item.ad_violation_records.forEach(vio => {
                        const newItem = item;
                        newItem['violation_record'] = vio;
                        dataList.data.push(newItem)
                    })
                } else {
                    dataList.data.push(item)
                }
            });
            console.log(dataList)
            return dataList;
        } else {
            return res
        }

    };

    return (
        <PageHeaderWrapper>
            <ProTable<TableListItem>
                headerTitle="AD Account Risk Management"
                actionRef={actionRef}
                dateFormatter={'string'}
                rowKey="id"
                toolBarRender={(action, {selectedRows}) => [
                    <Button icon={<PlusOutlined/>} type="primary" onClick={() => handleModalVisible(true)}>
                        新建
                    </Button>,
                    <Button
                        onClick={() => {
                            setIsViolationView(!isViolationView)
                            action.reload()
                        }}>{isViolationView ? '切换到账号编辑视图' : '切换到违规列表视图'}</Button>,
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
                request={(params: any) => acquireData(params)}
                columns={isViolationView ? violationColumns : columns}
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
