import { Card, Checkbox, Space, Tooltip } from "antd";
import { useRef } from "react";

// Yes, I know the numbers don't really make much sense
const SelectUserSegments = ({ state: { usersSelected, setUsersSelected } }) => {

    const _all = useRef();
    const _new = useRef();
    const _old = useRef();
    const _returning = useRef();
    const _churned = useRef();

    const onCheckChange = () => {
        const checks = [_new.current.input.checked, _old.current.input.checked, _returning.current.input.checked, _churned.current.input.checked];
        const amounts = [20_000, 80_000, 5_000, 40_000, 500];

        if (_all.current.input.checked) return setUsersSelected(amounts.reduce((a, b) => a + b, 0));

        let num = 0;
        checks.forEach((checked, index) => {
            if (checked) num += amounts[index];
        });
        setUsersSelected(num);
    };

    return (
        <Card style={{ cursor: "default" }} hoverable title="Select user segments">
            <Space direction="vertical">
                <Checkbox style={{ userSelect: "none" }} ref={_all} onChange={onCheckChange}>All users</Checkbox>
                <Tooltip placement="right" title="Users with accounts newer than 2 weeks.">
                    <><Checkbox style={{ userSelect: "none" }} ref={_new} onChange={onCheckChange}>New users</Checkbox></>
                </Tooltip>
                <Tooltip placement="right" title="Users with accounts older than 2 weeks.">
                    <><Checkbox style={{ userSelect: "none" }} ref={_old} onChange={onCheckChange}>Old users</Checkbox></>
                </Tooltip>
                <Tooltip placement="right" title="Users who recently logged in after 2 weeks.">
                    <><Checkbox style={{ userSelect: "none" }} ref={_returning} onChange={onCheckChange}>Returning users</Checkbox></>
                </Tooltip>
                <Tooltip placement="right" title="Users who have not logged in for 2 weeks.">
                    <><Checkbox style={{ userSelect: "none" }} ref={_churned} onChange={onCheckChange}>Churned users</Checkbox></>
                </Tooltip>
                <span>{usersSelected.toLocaleString("en-US")} users selected</span>
            </Space>
        </Card>
    );
};

export default SelectUserSegments;