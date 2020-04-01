import React from "react";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {Mail} from "@/pages/ad_violation/data";


const EmailTable: React.FC = props => {
    const data: Mail[] = [{
        _id: '1das',
        content: 'string',
        title: 'string',
        id: 'sdsada'
    }]

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
            dataIndex: 'owner'
        },
    ];
    return (
        <ProTable<Mail>
            search={false}
            toolBarRender={false}
            rowKey="_id"
            tableAlertRender={false}
            dataSource={data}
            columns={columns}
            bordered
            size='small'
            pagination = {false}
        />
    )
};
export default EmailTable
