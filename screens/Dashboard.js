"use client"

import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native"
import { Bell, Search } from "lucide-react-native"
import * as Font from "expo-font"
import { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { chunkArray } from "../utils"

const { width } = Dimensions.get("window")


const GRID_SPACING = 16
const GRID_COLUMNS = 4
const actionButtonWidth = (width - 32 - GRID_SPACING * (GRID_COLUMNS - 1)) / GRID_COLUMNS

export default function Dashboard() {
  const [fontsLoaded, setFontsLoaded] = useState(true)
  const navigation = useNavigation()

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Outfit: require("../assets/fonts/Outfit.ttf"),
      })
      setFontsLoaded(true)
    }

    loadFonts()
  }, [])

  if (!fontsLoaded) {
    // You might want to return a loading indicator here
    return null
  }

  const actionButtons = [
    { image: require("../assets/images/dashboard/actions/Trading.png"), label: "Trading" },
    { image: require("../assets/images/dashboard/actions/Withdrawal.png"), label: "Withdrawal" },
    { image: require("../assets/images/dashboard/actions/Payment.png"), label: "Payments" },
    { image: require("../assets/images/dashboard/actions/Subscription.png"), label: "Subscription" },
    { image: require("../assets/images/dashboard/actions/Settings.png"), label: "Settings" },
    { image: require("../assets/images/dashboard/actions/Rewards.png"), label: "Rewards" },
    { image: require("../assets/images/dashboard/actions/Help.png"), label: "Help" },
    { image: require("../assets/images/dashboard/actions/Terms.png"), label: "Terms" },
  ]

  const keySections = [
    {
      icon: require("../assets/images/dashboard/keySections/chart.png"),
      title: "Trading",
      action: "Start Trading",
      bgColor: "#EFF6FF",
    },
    {
      icon: require("../assets/images/dashboard/keySections/dollar.png"),
      title: "Withdraw",
      action: "Withdraw Now",
      bgColor: "#EFF6FF",
    },
    {
      icon: require("../assets/images/dashboard/keySections/wallet.png"),
      title: "Payment",
      action: "Make a Payment",
      bgColor: "#F5F3FF",
    },
    {
      icon: require("../assets/images/dashboard/keySections/calendar.png"),
      title: "Subscription",
      action: "Book Now",
      bgColor: "#F5F3FF",
    },
  ]

  const handleNavigation = (label) => {
    if (label === "Trading") {
      navigation.navigate("Trading")
    } else if (label === "Subscription") {
      navigation.navigate("BillsPage")
    } else if (label === "Payments") {
      console.log('Payments Label clicked')
      navigation.navigate("Payment")
    } else if (label === "Withdrawal") {
      navigation.navigate("Withdrawal")
    }
  }

  const handleSeeFavorites = () => {
    navigation.navigate("Favorites")
  }

  const handleKeySectionAction = (title) => {
    if (title === "Trading") {
      navigation.navigate("Trading")
    } else if (title === "Withdraw") {
      navigation.navigate("Trading")
    } else if (title === "Payments") {
      navigation.navigate("Payment")
    } else if (title === "Subscription") {
      navigation.navigate("BillsPage")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>LOGO</Text>
          <View style={styles.notificationContainer}>
            <Bell size={24} color="#000" />
            <View style={styles.notificationDot} />
          </View>
        </View>

        {/* Total Crypto Value */}
        <View style={styles.valueContainer}>
          <Text style={styles.valueLabel}>Total Crypto Value</Text>
          <View style={styles.aprContainer}>
            <Text style={styles.aprText}>+7.46% APR</Text>
          </View>
          <Text style={styles.totalValue}>$10,500</Text>
          <Image source={require("../assets/images/cryptogroup.png")} style={styles.cryptoGroupImage} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#48484D" style={styles.searchIcon} />
          <TextInput style={styles.searchInput} placeholder="Search here" placeholderTextColor="#48484D" placeholderTextSize={14} />
        </View>

        {/* Action Buttons Grid */}
        <View style={styles.actionGridContainer}>
          {actionButtons.map((item, index) => (
            <View key={index} style={styles.actionButtonWrapper}>
              <TouchableOpacity style={styles.actionButton} onPress={() => handleNavigation(item.label)}>
                <Image source={item.image} style={styles.actionButtonIcon} />
              </TouchableOpacity>
              <Text style={styles.actionButtonText}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.favoritesCard}>
          <Text style={styles.favoritesTitle}>See Your Favorites</Text>
          <Text style={styles.favoritesDescription}>
            Access your favorites instantly for a faster, more convenient experience!
          </Text>
          <TouchableOpacity style={styles.favoritesButton} onPress={handleSeeFavorites}>
            <Text style={styles.favoritesButtonText}>See Favorites</Text>
            <Image source={require("../assets/images/dashboard/favorites-arrow-right.png")} style={styles.favoritesArrow} />
          </TouchableOpacity>
        </View>

        {/* Key Sections */}
        <Text style={styles.sectionTitle}>Key Sections</Text>
        {chunkArray(keySections, 2).map((arr, index) => (
          <View style={styles.keySectionsRow} key={index}>
            {
              arr.map((section, index) => <TouchableOpacity
                key={index}
                style={styles.keySectionCard}
                onPress={() => handleKeySectionAction(section.title)}
              >
                <View style={styles.keySectionContent}>
                  <Image source={section.icon} style={styles.keySectionIcon} />
                  <Text style={styles.keySectionTitle}>{section.title}</Text>
                </View>
                <View style={styles.keySectionAction}>
                  <Text style={styles.keySectionActionText}>{section.action}</Text>
                  <Image source={require("../assets/images/dashboard/favorites-arrow-right.png")} style={styles.favoritesArrow} />
                </View>
              </TouchableOpacity>)
            }
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    statusBarTranslucent: true,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    fontFamily: "Outfit",
    fontSize: 20,
    fontWeight: 600,
    lineHeight: '140%',
    color: '#090914'
  },
  notificationContainer: {
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: -5,
    right: -3,
    width: 13,
    height: 13,
    backgroundColor: "#2563EB",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },
  valueContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  valueLabel: {
    color: "#48484D",
    fontFamily: "Outfit",
    fontWeight: 600,
    marginBottom: 12,
    fontSize: 16,
    lineHeight: '140%',
  },
  aprText: {
    borderRadius: 4,
    padding: 4,
    color: "#fff",
    fontFamily: "Outfit",
    fontSize: 10,
    fontWeight: 500,
  },
  cryptoGroupImage: {
    marginBottom: 40,
    resizeMode: "contain",
  },
  searchContainer: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F5F7",
    borderRadius: 30,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#48484D",
    fontFamily: "Outfit",
  },
  actionGridContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  actionButtonWrapper: {
    width: actionButtonWidth,
    alignItems: "center",
    marginBottom: 20,
  },
  actionButton: {
    padding: 22,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E1E2E3",
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  actionButtonIcon: {
    width: 24,
    height: 24,
  },
  actionButtonText: {
    fontFamily: "Outfit",
    fontSize: 12,
    fontWeight: 400,
    color: "#090914",
    textAlign: "center",
  },
  favoritesCard: {
    backgroundColor: "#FEF9E3",
    borderRadius: 12,
    padding: 16,
    marginBottom: 40,
  },
  favoritesTitle: {
    fontFamily: "Outfit",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '140%',
    marginBottom: 8,
    color: "#090914",
  },
  favoritesDescription: {
    fontFamily: "Outfit",
    fontWeight: 400,
    color: "#4B5563",
    fontSize: 14,
    lineHeight: '150%',
    marginBottom: 16,
  },
  favoritesButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  favoritesButtonText: {
    fontFamily: "Outfit",
    color: "#2C73FF",
    marginRight: 4,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '140%',
  },
  favoritesArrow: {
    width: 20,
    height: 20
  },
  sectionTitle: {
    fontFamily: "Outfit",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '140%',
    marginBottom: 16,
    color: "#090914",
  },
  keySectionsRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 16,
  },
  keySectionCard: {
    width: 0,
    flexGrow: 1,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: "#E1E2E3",
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 16,
  },
  keySectionContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    padding: 12,
    borderBottomColor: '#A9ABB1',
    borderBottomWidth: 1,
  },
  keySectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: ''
  },
  keySectionTitle: {
    fontFamily: "Outfit",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '150%',
    color: "#48484D",
  },
  keySectionUnderline: {
    height: 1,
    backgroundColor: "#E5E7EB",
    alignSelf: "stretch",
    marginVertical: 8,
  },
  keySectionAction: {
    display: 'flex',
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  keySectionActionText: {
    fontFamily: 'Outfit',
    color: "#2C73FF",
    fontSize: 14,
    lineHeight: 14,
    fontWeight: 500,
  },
  aprContainer: {
    width: 68,
    height: 18,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    alignSelf: "center",
    marginBottom: 12,
  },
  totalValue: {
    fontSize: 48,
    fontWeight: 600,
    lineHeight: '100%',
    color: "#090914",
    fontFamily: "Outfit",
    marginBottom: 4
  },
})

