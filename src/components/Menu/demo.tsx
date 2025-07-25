import React, { useState } from "react";

import { Menu } from "./index";

const items = [
  {
    label: "Navigation One",
    key: "mail",
  },
  {
    label: "Navigation Two",
    key: "app",
    disabled: true,
  },
  {
    label: "Navigation Three - Submenu",
    key: "SubMenu",
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          { label: "Option 1", key: "setting:1" },
          { label: "Option 2", key: "setting:2" },
        ],
      },
      {
        type: "group",
        label: "Item 2",
        children: [
          { label: "Option 3", key: "setting:3" },
          { label: "Option 4", key: "setting:4" },
        ],
      },
    ],
  },
  {
    key: "alipay",
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
  },
];

const App: React.FC = () => {
  const [current, setCurrent] = useState("mail");

  const onClick = e => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <>
      <Menu
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        onClick={onClick}
      />
      <Menu
        selectedKeys={[current]}
        mode="vertical"
        items={items}
        onClick={onClick}
      />
    </>
  );
};

export default App;
