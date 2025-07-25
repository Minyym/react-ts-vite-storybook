import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from ".";

const meta = {
  title: "Components/Menu",
  component: Menu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const Horizontal: Story = {
  args: {
    mode: "horizontal",
    items: items,
    defaultSelectedKeys: ["mail"],
  },
};

export const Vertical: Story = {
  args: {
    mode: "vertical",
    items: items,
    defaultSelectedKeys: ["mail"],
    style: { width: 256 },
  },
};

export const WithCustomStyle: Story = {
  args: {
    mode: "horizontal",
    items: items,
    defaultSelectedKeys: ["mail"],
    style: {
      backgroundColor: "#001529",
      color: "rgba(255,255,255,0.65)",
    },
  },
};
