import React from "react";
import {ProColumns} from "@ant-design/pro-table";
import {Product} from "@/pages/ad_violation/data";

export interface ProductsTableProps {

}

const ProductsTable: React.FC = props => {
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
            dataIndex:
        }

    ]
};
export default ProductsTable
