import type { Meta, StoryObj } from "@storybook/react";
import DefaultButton from "../../ui/Buttons/DefaultButton";

const meta: Meta<typeof DefaultButton> = {
  title: "Atoms/DefaultButton",
  component: DefaultButton,
};

export default meta;
type Story = StoryObj<typeof DefaultButton>;

export const Primary: Story = {
  args: {
    children: "Go to shopping",
  },
  render: (args) => <DefaultButton {...args} />,
};
export const Disabled: Story = {
  args: {
    children: "I am Disabled",
    disabled: true,
  },
  render: (args) => <DefaultButton {...args} />,
};

export const Hover: Story = {
  args: {
    children: "Hover over me",
  },
  render: (args) => <DefaultButton {...args} />,
  parameters: {
    pseudo: { hover: true },
  },
};
