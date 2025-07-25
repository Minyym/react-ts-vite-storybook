import type { Meta, StoryObj } from "@storybook/react";
import Icon from "./index";

const meta = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["ai", "bi", "bs", "ci", "di", "fi", "gi", "hi", "fa"],
      description: "Icon library type",
    },
    color: {
      control: "color",
      description: "Icon color",
    },
    size: {
      control: { type: "number", min: 12, max: 96, step: 4 },
      description: "Icon size in pixels",
    },
    icon: {
      control: "text",
      description: "Icon name from the selected library",
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic examples with different icon libraries
export const BiIcon: Story = {
  args: {
    type: "bi",
    icon: "BiHome",
    color: "#1890ff",
    size: 24,
  },
};

export const AiIcon: Story = {
  args: {
    type: "ai",
    icon: "AiFillHeart",
    color: "#ff4d4f",
    size: 24,
  },
};

export const FaIcon: Story = {
  args: {
    type: "fa",
    icon: "FaReact",
    color: "#61dafb",
    size: 24,
  },
};

// Size variations
export const SmallIcon: Story = {
  args: {
    type: "bi",
    icon: "BiStar",
    color: "#faad14",
    size: 16,
  },
};

export const LargeIcon: Story = {
  args: {
    type: "bi",
    icon: "BiStar",
    color: "#faad14",
    size: 48,
  },
};

// Different colors
export const SuccessIcon: Story = {
  args: {
    type: "bi",
    icon: "BiCheckCircle",
    color: "#52c41a",
    size: 24,
  },
};

export const WarningIcon: Story = {
  args: {
    type: "bi",
    icon: "BiErrorCircle",
    color: "#faad14",
    size: 24,
  },
};

export const DangerIcon: Story = {
  args: {
    type: "bi",
    icon: "BiXCircle",
    color: "#ff4d4f",
    size: 24,
  },
};

// With custom style
export const StyledIcon: Story = {
  args: {
    type: "bi",
    icon: "BiCube",
    color: "#722ed1",
    size: 32,
    style: {
      padding: "8px",
      backgroundColor: "#f0f0f0",
      borderRadius: "8px",
    },
  },
};
