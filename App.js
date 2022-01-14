import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";

import productsReducer from "./store/reducers/products";
import ShopNavigator from "./navigation/ShopNavigator";

const rootReducer = combineReducers({
  products: productsReducer,
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <PaperProvider>
      <Provider store={store}>
        <ShopNavigator />
      </Provider>
    </PaperProvider>
  );
}
