import { Button, Space } from "antd";
import { useState } from "react";
import Page from "./Shared/Page";
import SelectTimeAndDate from "./Shared/SelectTimeAndDate";
import SelectUserSegments from "./Shared/SelectUserSegments";

const Tools1 = () => {

  const [usersSelected, setUsersSelected] = useState(0);
  const [useScheduled, setUseScheduled] = useState(false);

  return (
    <Page title="Tools 1" description="Some page with example components.">
      <Space style={{ width: "100%" }} direction="vertical">
        <SelectUserSegments state={{ usersSelected, setUsersSelected }} />
        <SelectTimeAndDate state={{ useScheduled, setUseScheduled }} />
        <Button type="primary">Do something</Button>
      </Space>
    </Page>
  );
};

export default Tools1;