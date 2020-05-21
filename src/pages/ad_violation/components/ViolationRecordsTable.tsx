import React from "react";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {ViolationRecord} from "@/pages/ad_violation/data";
import {Divider} from "antd";

export interface ProductsTableProps {
    dataSource: ViolationRecord[]
    del: (id: string) => void
    mod: (id: string) => void
}

const ViolationRecordsTable: React.FC<ProductsTableProps> = props => {
    const {dataSource, del, mod} = props;
    const columns: ProColumns<ViolationRecord>[] = [
        {
            title: '时间',
            dataIndex: 'time',
        },
        {
            title: '违规类型',
            dataIndex: 'tag',
        },
        {
            title: '涉及package',
            dataIndex: 'package_names',
        },
        {
            title: '处理Owner',
            dataIndex: 'owner',
        },
        {
            title: '负责人类型',
            dataIndex: 'owner_type'
        },
        {
            title: '发布或处理状态',
            dataIndex: 'status',
        },
        {
            title: '违规内容',
            dataIndex: 'content'
        },
        {
            title: '素材文件',
            dataIndex: 'file_url',
        },
        {
            title: '违规等级',
            dataIndex: 'level',
            valueEnum: {
                0: {text: '轻微', status: 'Default'},
                1: {text: '中等', status: 'Warning'},
                2: {text: '严重', status: 'Error'},
            }
        },
        {
            title: '措施描述文件',
            dataIndex: 'solve_file_url',
        },
        {
            title: '应对措施',
            dataIndex: 'measure',
        },
        {
            title: '结果',
            dataIndex: 'results',
        },
        {
            title: '是否跟踪',
            dataIndex: 'need_alarm',
            render: (_, record) => (
                record['need_alarm'] ? '是' : '否'
            )
        },
        {
            title: '是否结束',
            dataIndex: 'finished',
            render: (_, record) => (
                record['finished'] ? '是' : '否'
            )
        },
        {
            title: 'deadline',
            dataIndex: 'deadline',
        },
        {
            title: '提醒邮箱',
            dataIndex: 'alarm_emails',
        },
        {
            title: '提醒内容',
            dataIndex: 'alarm_content',
        },
        {
            title: '有关邮件',
            dataIndex: 'associate_email',
        },
        {
            title: '操作',
            dataIndex: 'owner',
            width: 150,
            fixed: 'right',
            render: (_, record) => (
                <>
                    <a onClick={() => mod(record['id'])}>编辑</a>
                    <Divider type="vertical"/>
                    <a onClick={() => del(record['id'])}>删除</a>
                </>
            )
        },

    ];
    return (
        <ProTable<ViolationRecord>
            search={false}
            toolBarRender={false}
            rowKey="id"
            tableAlertRender={false}
            dataSource={dataSource}
            columns={columns}
            bordered
            scroll={{x: '230%'}}
            size='small'
            pagination={false}
        />
    )
};
export default ViolationRecordsTable
