import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SearchBar from "../../components/SearchBar/SearchBar";
import productsReducer from "@src/store/products/productsSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

const meta: Meta<typeof SearchBar> = {
  title: "Atoms/SearchBar",
  component: SearchBar,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const SearchBarComponent: Story = {
  args: {},
  render: () => <SearchBar />,
};