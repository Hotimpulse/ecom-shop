import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import PlusMinusItem from "../../components/Cart/PlusMinusItem/PlusMinusItem";
import productsReducer from "@src/store/products/productsSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

const meta: Meta<typeof PlusMinusItem> = {
  title: "Molecules/PlusMinusItem",
  component: PlusMinusItem,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PlusMinusItem>;

export const PlusMinusItemComponent: Story = {
  args: {
    count: 1,
  },
  render: (args) => <PlusMinusItem {...args} />,
};
