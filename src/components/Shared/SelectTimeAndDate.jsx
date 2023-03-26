import { Card, DatePicker, Radio, Space } from "antd";

const SelectTimeAndDate = ({ state: { useScheduled, setUseScheduled } }) => {

    return (
        <Card style={{ cursor: "default" }} hoverable title="Select time & date">
            <Space direction="vertical">
                <Radio.Group value={useScheduled} onChange={e => setUseScheduled(e.target.value)}>
                    <Radio value={false}>Immediately</Radio>
                    <Radio value={true}>Schedule</Radio>
                </Radio.Group>
                {useScheduled && <DatePicker />}
            </Space>
        </Card>
    );
};

export default SelectTimeAndDate;