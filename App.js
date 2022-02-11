import "react-native-gesture-handler";
import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import ReduxThunk from "redux-thunk";

import AuthScreen from "./screens/user/AuthScreen";
import ProductOverviewScreen from './screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from "./screens/shop/ProductDetailScreen";
import CartScreen from './screens/shop/CartScreen';
import OrdersScreen from "./screens/shop/OrdersScreen";
import UserProductScreen from "./screens/user/UserProductsScreen";
import EditProductScreen from "./screens/user/EditProductScreen";

import AppBarHeader from "./components/UI/AppBarNav";
import AppBarBottom from "./components/UI/AppBarBottom";

import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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
          <Stack.Navigator initialRouteName="Auth Login" screenOptions={{
            header: AppBarHeader,
          }}>
            <Stack.Screen name="Auth Login" component={AuthScreen} />
            <Stack.Screen name="All Products" component={ProductOverviewScreen} />
            <Stack.Screen name="Product Details" component={ProductDetailScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Orders" component={OrdersScreen} />
            <Stack.Screen name="User Products" component={UserProductScreen} />
            <Stack.Screen name="Edit Product" component={EditProductScreen} />
          </Stack.Navigator>
        </Provider>
      </PaperProvider>
    </NavigationContainer>
  );
}
