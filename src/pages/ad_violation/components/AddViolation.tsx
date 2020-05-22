import React from "react";
import {Button, DatePicker, Form, Input, Modal, Select, Switch, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import {UploadOutlined} from "@ant-design/icons/lib";
import moment from "moment";
import {ViolationRecord} from "@/pages/ad_violation/data";
import {guid} from "@/utils/utils";

const FormItem = Form.Item;
const Option = Select.Option;
const formLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 15},
};
const states = [
    {
        value: 0,
        label: '轻微'
    },
    {
        value: 1,
        label: '中等'
    },
    {
        value: 2,
        label: '严重'
    }
];

export interface ViolationRecordsProps {
    modalVisible: boolean;
    onSubmit: (params: ViolationRecord) => void;
    onCancel: () => void
    initValue: ViolationRecord
}

const AddViolation: React.FC<ViolationRecordsProps> = props => {
    const [form] = Form.useForm();
    const {modalVisible, onSubmit, onCancel, initValue} = props;
    const handleAdd = async () => {
        const params: any = await form.validateFields();
        params.time = moment(params.time).format('YYYY-MM-DD');
        params.deadline = moment(params.deadline).format('YYYY-MM-DD');
        params['key'] = initValue ? initValue['key'] : guid();
        form.resetFields();
        onSubmit(params);
    };
    return (
        <Modal
            destroyOnClose
            visible={modalVisible}
            width={'40%'}
            onOk={() => handleAdd()}
            onCancel={() => {
                onCancel()
            }}
            title={"新增违规记录"}
        >
            <Form form={form}
                  initialValues={
                      {
                          ...initValue,
                          time: initValue ? moment(initValue.time) : '',
                          deadline: initValue ? moment(initValue.deadline) : ''
                      }
                  }
                  {...formLayout}
            >
                <FormItem
                    label="处理日期"
                    name="time"
                    rules={[{required: true, message: '请选择日期!'}]}
                >
                    <DatePicker style={{width: '100%'}}/>
                </FormItem>

                <FormItem
                    label="违规类型"
                    name="tag"
                >
                    <Input placeholder={'请输入违规类型!'}/>
                </FormItem>

                <FormItem
                    label="牵涉包名"
                    name="package_names"
                    rules={[{required: true, message: '请填写牵涉包名!'}]}

                >
                    <Select mode="tags" style={{width: '100%'}} placeholder="请输入牵涉包名!">
                    </Select>
                </FormItem>

                <FormItem
                    label="处理人"
                    name="owner"
                >
                    <Select mode="tags" placeholder="请输入负责人名称!">
                    </Select>
                </FormItem>

                <FormItem
                    label="负责人类型"
                    name="owner_type"
                >
                    <Select placeholder={'请选择负责人类型!'}>
                        {
                            ['产品PM', '运营PM', 'MZM', 'Dev'].map(item => (
                                <Option key={item} value={item}>{item}</Option>
                            ))
                        }
                    </Select>
                </FormItem>

                <FormItem
                    label="处理或发布状态"
                    name="status"
                >
                    <Input placeholder={'请输入处理或发布状态!'}/>
                </FormItem>

                <FormItem
                    label="违规内容"
                    name="content"
                >
                    <TextArea rows={2} placeholder={'请填写违规内容!'}/>
                </FormItem>

                <FormItem
                    label="描述文件"
                    // name="file_url"
                >
                    <Upload>
                        <Button>
                            <UploadOutlined/> 点击上传
                        </Button>
                    </Upload>
                </FormItem>

                <FormItem
                    label="违规等级"
                    name="level"
                    rules={[{required: true, message: '违规等级不可以为空!'}]}

                >
                    <Select placeholder={'请选择违规等级'}>
                        {
                            states.map(item => (
                                <Option key={item.value} value={item.value}>{item.label}</Option>
                            ))
                        }
                    </Select>
                </FormItem>

                <FormItem
                    label="措施描述文件"
                    // name="solve_file_url"
                >
                    <Upload>
                        <Button>
                            <UploadOutlined/> 点击上传
                        </Button>
                    </Upload>
                </FormItem>

                <FormItem
                    label="采取措施"
                    name="measure"
                    rules={[{required: true, message: '采取措施不可以为空!'}]}
                >
                    <TextArea rows={2} placeholder={'请填写采取措施!'}/>
                </FormItem>

                <FormItem
                    label="最终结果"
                    name="results"
                    rules={[{required: true, message: '最终结果不可以为空!'}]}

                >
                    <TextArea rows={2} placeholder={'请填写最终结果!'}/>
                </FormItem>

                <FormItem
                    label="是否跟踪"
                    name="need_alarm"
                    valuePropName="checked"
                >
                    <Switch/>
                </FormItem>

                <FormItem
                    label="已结束"
                    name="finished"
                    valuePropName="checked"
                >
                    <Switch/>
                </FormItem>

                <FormItem
                    label="处理deadline"
                    name="deadline"
                    rules={[{required: true, message: '日期不可以为空!'}]}
                >
                    <DatePicker style={{width: '100%'}}/>
                </FormItem>

                <FormItem
                    label="报警邮箱"
                    name="alarm_emails"
                    rules={[{required:true,message:'报警邮箱不可以为空!'}]}
                >
                    <Select mode="tags" placeholder="请添加报警邮箱!">
                    </Select>
                </FormItem>

                <FormItem
                    label="报警内容"
                    name="alarm_content"
                    rules={[{required:true, message:'报警内容不可以为空!'}]}
                >
                    <TextArea rows={2} placeholder='请输入报警内容!'/>
                </FormItem>

                <FormItem
                    label="有关邮件"
                    name="associate_email"
                    rules={[{required: true, message: '有关邮件不可以为空!'}]}

                >
                    <Select mode="tags" placeholder="请添加有关邮件!">
                    </Select>
                </FormItem>

            </Form>
        </Modal>
    )
};
export default AddViolation
