import { GestureHandlerRootView } from "react-native-gesture-handler"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { Image, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native"
import { useFonts } from "expo-font"

// Import all screens
import Trading from "./screens/Trading"
import Favorites from "./screens/Favorites"
import Withdrawal from "./screens/Withdrawal"
import Payment from "./screens/Payment"
import Dashboard from "./screens/Dashboard"
import Faq from "./screens/Faq"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const tabs = [
  { image: require('./assets/images/tabs/menu.png'), label: "Dashboard" },
  { image: require('./assets/images/tabs/deals.png'), label: "Trading" },
  { image: require('./assets/images/tabs/card.png'), label: "Deposit" },
  { image: require('./assets/images/tabs/notification.png'), label: "Favorites" },
  { image: require('./assets/images/tabs/profile.png'), label: "Settings" },
]

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const getIcon = (routeName, isFocused) => {

    const color = routeName === "Dashboard" ? (isFocused ? "#0066FF" : "#71717A") : "#BDBDBD"
    const size = 24

    try {
      for (let i = 0; i < tabs.length; ++i) {
        if (tabs[i].label === routeName) {
          return <Image source={tabs[i].image} />
        }
      }
    } catch (error) {
      console.error("Error loading tab icon:", error)
    }
    return null;
  }

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label = options.tabBarLabel || route.name
        const isFocused = state.index === index
        const isDisabled = route.name !== "Dashboard"


        const onPress = () => {
          if (!isDisabled) {
            navigation.navigate(route.name)
          }
        }

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={[styles.tabItem, isDisabled && styles.disabledTab]}
            activeOpacity={isDisabled ? 1 : 0.7}
          >
            {getIcon(route.name, isFocused)}
            <Text
              style={{
                ...styles.tabLabel,
                color: route.name === "Dashboard" ? (isFocused ? "#0066FF" : "#71717A") : "#BDBDBD",
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const TabNavigator = () => (
  <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Dashboard" component={Dashboard} options={{ tabBarLabel: "Menu" }} />
    {/* <Tab.Screen name="Trading" component={Trading} options={{ tabBarLabel: "Deals" }} /> */}
    <Tab.Screen name="Deposit" component={Dashboard} options={{ tabBarLabel: "Card" }} />
    <Tab.Screen name="Favorites" component={Favorites} options={{ tabBarLabel: "Notification" }} />
    <Tab.Screen name="Settings" component={Dashboard} options={{ tabBarLabel: "Profile" }} />
  </Tab.Navigator>
)

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    Outfit: require("./assets/fonts/Outfit.ttf"),
    "Plus Jakarta Sans": require("./assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Plus Jakarta Sans Medium": require("./assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Plus Jakarta Sans SemiBold": require("./assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    "Plus Jakarta Sans Bold": require("./assets/fonts/PlusJakartaSans-Bold.ttf"),
  })

  if (!fontsLoaded && !fontError) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066FF" />
      </View>
    )
  }

  if (fontError) {
    console.error("Font loading error:", fontError)
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load fonts. Please restart the app.</Text>
      </View>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="MainNavigator" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainNavigator" component={TabNavigator} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Trading" component={Trading} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Favorites" component={Favorites} />
            <Stack.Screen name="Withdrawal" component={Withdrawal} />
            <Stack.Screen name="Faq" component={Faq} />
          </Stack.Navigator>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    display: 'flex',
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 24,
    paddingTop: 12,
    paddingRight: 8,
    paddingBottom: 12,
    paddingLeft: 8,
  },
  tabItem: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 8,
    paddingLeft: 12,
    gap: 2,
    paddingVertical: 4,
  },
  disabledTab: {
    opacity: 0.7,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 2,
    fontWeight: 400,
    lineHeight: '100%',
    color: '#48484D',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
})

export default App

