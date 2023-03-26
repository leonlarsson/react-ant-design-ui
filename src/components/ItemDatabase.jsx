import Page from "./Shared/Page";
import ItemTable from "./Shared/ItemTable";

const ItemDatabase = () => {
  return (
    <Page title="Item Database" description={<>An example item database. Data is generated in <code>/utils/itemData.js</code></>}>
      <ItemTable />
    </Page >
  );
};

export default ItemDatabase;