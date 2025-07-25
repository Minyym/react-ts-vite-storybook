import type { Meta, StoryObj } from "@storybook/react";
import Button from "./index";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["primary", "default", "danger", "link"],
    },
    size: {
      control: "select",
      options: ["small", "middle", "large"],
    },
    loading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    type: "default",
    children: "Default Button",
  },
};

export const Danger: Story = {
  args: {
    type: "danger",
    children: "Danger Button",
  },
};

export const Link: Story = {
  args: {
    type: "link",
    href: "https://example.com",
    children: "Link Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    type: "primary",
    children: "Large Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    type: "primary",
    children: "Small Button",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    type: "primary",
    children: "Loading Button",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    type: "primary",
    children: "Disabled Button",
  },
};
