import React from "react";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {ViolationRecord} from "@/pages/ad_violation/data";

export interface ProductsTableProps {

}

const ViolationRecordsTable: React.FC = props => {
    const data: ViolationRecord[] = [{
        _id: '1das',
        alarm_content: 'string',
        alarm_emails: ['any[]'],
        associate_email: ['string[]'],
        content: 'sasdad',
        deadline: 'string',
        finished: true,
        level: 1,
        measure: 'string',
        need_alarm: false,
        owner: ['string[]'],
        owner_type: 'string;',
        package_names: ['.dsadada'],
        solve_file_url: 'string;',
        file_url: 'string;',
        results: ',sadadad',
        status: 'string;',
        time: 'string;'
    }];

    const columns: ProColumns<ViolationRecord>[] = [
        {
            title: '时间',
            dataIndex: 'app_name',
        },
        {
            title: '违规类型',
            dataIndex: 'package_name',
        },
        {
            title: '涉及package',
            dataIndex: 'owner',
        },
        {
            title: '处理Owner',
            dataIndex: 'owner',
        },
        {
            title: '责任人',
            dataIndex: 'owner'
        },
        {
            title: '状态',
            dataIndex: 'state',
            valueEnum: {
                0: {text: '正常', status: 'Success'},
                1: {text: '下架', status: 'Error'},
            },
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
        },
        {
            title: '是否结束',
            dataIndex: 'finished',
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
            width: 100,
            fixed: 'right',
        },

    ];
    return (
        <ProTable<ViolationRecord>
            search={false}
            toolBarRender={false}
            rowKey="_id"
            tableAlertRender={false}
            dataSource={data}
            columns={columns}
            bordered
            scroll={{x:'200%'}}
            size='small'
            pagination={false}
        />
    )
};
export default ViolationRecordsTable
