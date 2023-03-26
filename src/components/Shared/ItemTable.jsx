import { useRef, useState } from "react";
import { ExportToCsv } from "export-to-csv";
import { Button, Checkbox, Descriptions, Drawer, Image, Input, message, Radio, Skeleton, Space, Switch, Table, Tag, Typography } from "antd";
import itemData, { getRarityColor, getTagColor, itemCategories, itemRarities, itemTags } from "../../utils/itemData";

const ItemTable = () => {

  const searchInput = useRef();
  const [tableSize, setTableSize] = useState("middle");
  const [itemsToShow, setItemsToShow] = useState(itemData);
  const [item, setItem] = useState(null);
  const [itemDrawerOpen, setItemDrawerOpen] = useState(false);
  const [simulateLoading, setSimulateLoading] = useState(false);
  const [useOnInput, setUseOnInput] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const filterItems = filter => {
    if (simulateLoading) setTableLoading(true);
    setTimeout(() => {
      setItemsToShow(itemData.filter(item => [item.id, item.name.toLowerCase(), item.tag.toLowerCase()].some(item => item.includes(filter.toLowerCase().trim()))));
      setTableLoading(false);
      setTimeout(() => searchInput.current.focus(), 0);
    }, simulateLoading ? Math.floor(Math.random() * 1000 + 300) : null);
  };

  const data = itemsToShow.map(item => ({
    key: item.id,
    image: item.image,
    id: item.id,
    name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
    category: item.category,
    rarity: item.rarity,
    tag: item.tag,
    published: item.published,
    owners: item.owners
  }));

  const noData = <Typography.Text code>-</Typography.Text>;

  const columns = [
    {
      title: "Preview",
      dataIndex: "preview",
      width: 1,
      render: (_, record) => (
        <Button
          icon={<i className="fa-solid fa-search" />}
          title={`Preview item ${record.name}`}
          onClick={() => {
            setItem(itemData.find(item => item.id === record.id));
            setItemDrawerOpen(true);
          }} />
      )
    },
    {
      title: "Image",
      dataIndex: "image",
      width: 1,
      render: image => <Image width={40} src={image} placeholder={<Skeleton.Image active style={{ width: 40, height: 40 }} />} />
    },
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: "Category",
      dataIndex: "category",
      render: category => <Tag key={category}>{category}</Tag>,
      filters: itemCategories.map(x => ({ text: x, value: x })),
      onFilter: (value, record) => record.category === value,
      sorter: (a, b) => a.category.localeCompare(b.category)
    },
    {
      title: "Rarity",
      dataIndex: "rarity",
      render: rarity => <Tag key={rarity} color={getRarityColor(rarity)}>{rarity}</Tag>,
      filters: itemRarities.map(x => ({ text: x, value: x })),
      onFilter: (value, record) => record.rarity === value,
      sorter: (a, b) => a.rarity.localeCompare(b.rarity)
    },
    {
      title: "Tag",
      dataIndex: "tag",
      render: tag => tag !== "no_tag" ? <Tag key={tag} color={getTagColor(tag)}>{tag}</Tag> : noData,
      filters: itemTags.map(x => ({ text: x.replace("no_tag", "No tag"), value: x })),
      onFilter: (value, record) => record.tag === value,
      sorter: (a, b) => a.tag.localeCompare(b.tag)
    },
    {
      title: "Published",
      dataIndex: "published",
      render: date => date ? <Tag>{date.toUTCString()}</Tag> : noData,
      filters: [{ text: "Published", value: true }, { text: "Not Published", value: false }],
      onFilter: (value, record) => value ? record.published : !record.published
    },
    {
      title: "Owners",
      dataIndex: "owners",
      render: owners => owners.toLocaleString("en-US"),
      sorter: (a, b) => a.owners - b.owners
    }
  ];

  const commonSearchInputProps = {
    placeholder: "ID / Name / Tags",
    disabled: tableLoading,
    ref: searchInput,
    size: "large",
    allowClear: { clearIcon: <i className="fa-solid fa-circle-xmark" /> },
    autoFocus: true
  };

  return (
    <>
      <Space direction="horizontal" style={{ marginBottom: 10 }}>
        <Checkbox style={{ userSelect: "none" }} defaultChecked={simulateLoading} onChange={e => setSimulateLoading(e.target.checked)}>Simulate loading</Checkbox>
        <Switch defaultChecked={useOnInput} checkedChildren="onInput" unCheckedChildren="onSearch" onChange={setUseOnInput} />
        {useOnInput ? <Input {...commonSearchInputProps} onChange={e => filterItems(e.target.value)} /> : <Input.Search {...commonSearchInputProps} enterButton="Search" onSearch={filterItems} />}

        <Typography.Text>Table size:</Typography.Text>
        <Radio.Group value={tableSize} onChange={e => setTableSize(e.target.value)}>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="middle">Middle</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Space>

      <Table
        size={tableSize}
        columns={columns}
        dataSource={data}
        loading={tableLoading}
        bordered
        scroll={{ x: true }}
        pagination={{ hideOnSinglePage: true }}
        rowSelection={{ selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE], onChange: (_, selectedRows) => setSelectedRows(selectedRows) }}
        footer={() => (
          <Button
            icon={<i className="fa-solid fa-file-export" style={{ marginRight: 5 }} />}
            onClick={() => {
              message.info("Exporting file...");
              new ExportToCsv({ filename: "Items_Export", useKeysAsHeaders: true, showLabels: true }).generateCsv(data);
            }}
          >
            Export to CSV (ignores filter)
          </Button>
        )}
      />

      <Drawer title="Item preview" width="50%" open={itemDrawerOpen} onClose={() => setItemDrawerOpen(false)}>
        {item &&
          <Space direction="vertical">
            <Image src={item.image} alt={`${item.name} image`} />
            <Descriptions>
              <Descriptions.Item label="ID">{item.id}</Descriptions.Item>
              <Descriptions.Item label="Name">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Descriptions.Item>
              <Descriptions.Item label="Category"><Tag>{item.category}</Tag></Descriptions.Item>
              <Descriptions.Item label="Rarity"><Tag color={getRarityColor(item.rarity)}>{item.rarity}</Tag></Descriptions.Item>
              <Descriptions.Item label="Tag">{item.tag !== "no_tag" ? <Tag color={getTagColor(item.tag)}>{item.tag}</Tag> : "No tag"}</Descriptions.Item>
              <Descriptions.Item label="Published">{item.published ? item.published.toUTCString() : "No"}</Descriptions.Item>
              <Descriptions.Item label="Owners">{item.owners}</Descriptions.Item>
            </Descriptions>
          </Space>
        }
      </Drawer>

      {selectedRows.length > 0 &&
        <>
          <Typography.Title>Selected items ({selectedRows.length})</Typography.Title>
          <Table
            size={tableSize}
            columns={columns}
            dataSource={selectedRows}
            bordered
            scroll={{ x: true }}
            pagination={{ hideOnSinglePage: true }}
            footer={() => (
              <Button
                icon={<i className="fa-solid fa-file-export" style={{ marginRight: 5 }} />}
                onClick={() => {
                  message.info("Exporting file...");
                  new ExportToCsv({ filename: "Selected_Items_Export", useKeysAsHeaders: true, showLabels: true }).generateCsv(selectedRows);
                }}
              >
                Export to CSV (ignores filter)
              </Button>
            )}
          />
        </>
      }
    </>
  );
};

export default ItemTable;