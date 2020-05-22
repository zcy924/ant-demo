import React from "react";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {Product} from "@/pages/ad_violation/data";
import {Divider} from "antd";

export interface ProductsTableProps {
    dataSource: Product[]
    del: (key: string) => void
    mod: (key: string) => void
}

const ProductsTable: React.FC<ProductsTableProps> = props => {
    const {dataSource, del, mod} = props;
    const columns: ProColumns<Product>[] = [
        {
            title: 'app名称',
            dataIndex: 'app_name'
        },
        {
            title: '包名',
            dataIndex: 'package_name'
        },
        {
            title: '产品owner',
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
            title: '操作',
            width: 150,
            render: (_, record) => (
                <>
                    <a onClick={() => mod(record['key'])}>编辑</a>
                    <Divider type='vertical'/>
                    <a onClick={() => del(record['key'])}>删除</a>
                </>
            )
        }

    ];
    return (
        <ProTable<Product>
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
export default ProductsTable
