import React from "react";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {Divider} from "antd";
import {MisuseRecord} from "../data";

interface EmailTableProps {
    dataSource: MisuseRecord[];
    del: (key: string) => void;
    mod: (key: string) => void;
}

const MisuseRecordTable: React.FC<EmailTableProps> = props => {
    const {dataSource, del, mod} = props;

    const columns: ProColumns<MisuseRecord>[] = [
        {
            title: '时间',
            dataIndex: 'title'
        },
        {
            title: '操作者',
            dataIndex: 'operator'
        },
        {
            title: '操作内容',
            dataIndex: 'content'
        },
        {
            title: '风险预估',
            dataIndex: 'risk_assessment'
        },
        {
            title: '可能关联的账户',
            dataIndex: 'may_associate_accounts'
        },
        {
            title: '内容',
            dataIndex: 'content'
        },
        {
            title: '操作',
            render: (_, record) => (
                <>
                    <a onClick={() => mod(record['key'])}>编辑</a>
                    <Divider type="vertical"/>
                    <a onClick={() => del(record['key'])}>删除</a>
                </>
            )
        },
    ];
    return (
        <ProTable<MisuseRecord>
            search={false}
            toolBarRender={false}
            rowKey="key"
            tableAlertRender={false}
            dataSource={dataSource}
            columns={columns}
            bordered
            size='small'
            pagination={false}
        />
    )
};
export default MisuseRecordTable
