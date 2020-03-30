import React from "react";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {Product, TableListItem} from "@/pages/ad_violation/data";
import {Button, Dropdown, Menu} from "antd";
import {queryAdviolations} from "@/services/advertisement";

export interface ProductsTableProps {

}

const ProductsTable: React.FC = props => {
    const data: Product[] = [{
        _id: '1das',
        app_name: 'sdasd',
        package_name: 'dada',
        owner: 'asdadad',
        state: 1
    }]

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
        }

    ];
    return (
        <ProTable<Product>
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
export default ProductsTable
