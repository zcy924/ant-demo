import React from "react";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {Mail} from "@/pages/ad_violation/data";
import {Divider} from "antd";

interface EmailTableProps {
    dataSource: Mail[];
    del: (id: string) => void;
    mod: (id: string) => void;
}

const EmailTable: React.FC<EmailTableProps> = props => {
    // const data: Mail[] = [{
    //     content: 'string',
    //     title: 'string',
    //     id: 'sdsada'
    // }];
    const {dataSource, del, mod} = props;

    const columns: ProColumns<Mail>[] = [
        {
            title: '标题',
            dataIndex: 'title'
        },
        {
            title: '内容',
            dataIndex: 'content'
        },
        {
            title: '操作',
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
        <ProTable<Mail>
            search={false}
            toolBarRender={false}
            rowKey="id"
            tableAlertRender={false}
            dataSource={dataSource}
            columns={columns}
            bordered
            size='small'
            pagination={false}
        />
    )
};
export default EmailTable
