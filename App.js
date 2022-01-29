import "react-native-gesture-handler";
import React, { useState } from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { composeWithDevTools } from "redux-devtools-extension";

import ProductOverviewScreen from './screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from "./screens/shop/ProductDetailScreen";
import CartScreen from './screens/shop/CartScreen';
import OrdersScreen from "./screens/shop/OrdersScreen";

import AppBarHeader from "./components/UI/AppBarNav";

import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/order";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

// remove composeWithDevTools before releasing to prod.
const store = createStore(rootReducer, composeWithDevTools());

const fetchFont = async () => {
  await Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <PaperProvider>
        <Provider store={store}>
          <Stack.Navigator initialRouteName="All Products" screenOptions={{
            header: AppBarHeader,
          }}>
            <Stack.Screen name="All Products" component={ProductOverviewScreen} />
            <Stack.Screen name="Product Details" component={ProductDetailScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Order" component={OrdersScreen} />
          </Stack.Navigator>
        </Provider>
      </PaperProvider>
    </NavigationContainer>
  );
}
