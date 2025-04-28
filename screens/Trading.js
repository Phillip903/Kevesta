"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native"
import { ArrowLeft, X, Check } from "lucide-react-native"
import * as Font from "expo-font"


const assetImages = {
  bitcoin: require("../assets/images/coins/btc.png"),
  ethereum: require("../assets/images/coins/eth.png"),
  bnb: require("../assets/images/coins/bnb.png"),
  usdt: require("../assets/images/coins/tether.png"),
  xrp: require("../assets/images/coins/xrp.png"),
}

export default function Trading({ navigation }) {
  const [activeTab, setActiveTab] = useState("buy")
  const [price, setPrice] = useState("")
  const [amount, setAmount] = useState("")
  const [showVerification, setShowVerification] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")

  const [fontsLoaded, setFontsLoaded] = useState(false)

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
    return null
  }

  const assets = [
    { symbol: "BTC", name: "Bitcoin", value: "$184248.00", rate: "1.08005000", image: "bitcoin", color: "#F7931A" },
    { symbol: "ETH", name: "Ethereum", value: "$2,000.00", rate: "1.08005000", image: "ethereum", color: "#627EEA" },
    { symbol: "BNB", name: "BNB", value: "$200.00", rate: "1.08005000", image: "bnb", color: "#F3BA2F" },
    { symbol: "USDT", name: "USDT", value: "$200.00", rate: "1.08005000", image: "usdt", color: "#26A17B" },
    { symbol: "XRP", name: "XRP", value: "$100.00", rate: "1.08005000", image: "xrp", color: "#000000" },
  ]

  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  const handleConfirm = () => {
    setShowConfirmation(false)
    setShowSuccess(true)
  }

  const handleVerificationSubmit = () => {
    setShowVerification(false)
    setShowConfirmation(true)
  }

  const navigateToDashboard = () => {
    navigation.navigate("MainNavigator")
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
          >
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigateToDashboard()}>
                <ArrowLeft size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Trading</Text>
              <View style={{ width: 24 }} />
            </View>

            {/* Total Value Section */}
            <View style={styles.valueSection}>
              <Text style={styles.valueLabel}>Total Crypto Value</Text>
              <View style={styles.aprContainer}>
                <Text style={styles.aprText}>+7.46% APR</Text>
              </View>
              <Text style={styles.totalValue}>$10,500</Text>
              <View style={styles.cryptoIcons}>
                <Image source={assetImages.bitcoin} style={styles.cryptoIcon} />
                <Image source={assetImages.ethereum} style={styles.cryptoIcon} />
                <Image source={assetImages.bnb} style={styles.cryptoIcon} />
                <Image source={assetImages.usdt} style={styles.cryptoIcon} />
                <Image source={assetImages.xrp} style={styles.cryptoIcon} />
              </View>
            </View>

            {/* Trading Section */}
            <View style={styles.tradingSection}>
              {/* Tabs */}
              <View style={styles.tabs}>
                <TouchableOpacity
                  style={[styles.tab, activeTab === "buy" && styles.activeTab]}
                  onPress={() => setActiveTab("buy")}
                >
                  <Text style={styles.tabText}>Buy LTC/BTC</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tab, activeTab === "sell" && styles.activeTab]}
                  onPress={() => setActiveTab("sell")}
                >
                  <Text style={styles.tabText}>Sell LTC/BTC</Text>
                </TouchableOpacity>
              </View>

              {/* Trading Form */}
              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Price</Text>
                  <TextInput
                    style={styles.input}
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="decimal-pad"
                    placeholder="0.0"
                    placeholderTextColor="#8E8F96"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Amount</Text>
                  <TextInput
                    style={styles.input}
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="decimal-pad"
                    placeholder="0.0"
                    placeholderTextColor="#8E8F96"
                  />
                </View>

                <TouchableOpacity
                  style={[styles.buyButton, activeTab === "sell" && styles.sellButton]}
                  onPress={() => {
                    dismissKeyboard()
                    setShowVerification(true)
                  }}
                >
                  <Text style={styles.buyButtonText}>{activeTab === "buy" ? "Buy" : "Sell"}</Text>
                </TouchableOpacity>
              </View>

              {/* Assets List */}
              <View style={styles.assetsListContainer}>
                <Text style={styles.assetsTitle}>List of Assets</Text>
                {assets.map((asset, index) => (
                  <View key={index} style={styles.assetItem}>
                    <View style={styles.assetInfo}>
                      <Image source={assetImages[asset.image]} style={styles.assetIcon} resizeMode="contain" />
                      <View>
                        <Text style={styles.assetSymbol}>{asset.symbol}</Text>
                        <Text style={styles.assetValue}>{asset.value}</Text>
                      </View>
                    </View>
                    <Text style={styles.assetRate}>{asset.rate}</Text>
                  </View>
                ))}
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>

      {/* Verification Modal */}
      <Modal visible={showVerification} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.modalTopPosition]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity style={styles.modalBackButton} onPress={() => setShowVerification(false)}>
                <ArrowLeft size={20} color="#000" />
                <Text style={styles.modalBackText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowVerification(false)}>
                <Image source={require('../assets/images/close-icon.png')} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalTitle}>Verification</Text>

            <View style={styles.verificationNotice}>
              <Text style={styles.verificationNoticeText}>
                We have sent a verification code to your email demoemail@gmail.com
              </Text>
            </View>

            <Text style={styles.verificationLabel}>Verification Code</Text>

            <TextInput
              style={styles.verificationInput}
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="numeric"
              placeholder="Enter verification code"
              placeholderTextColor="#9CA3AF"
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleVerificationSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resendButton}>
              <Text style={styles.resendButtonText}>Resend</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Confirmation Modal */}
      <Modal visible={showConfirmation} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.modalTopPosition]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity style={styles.modalBackButton} onPress={() => setShowConfirmation(false)}>
                <Image source={require("../assets/images/trading/arrow-left.png")} style={styles.cryptoGroupImage} />
                <Text style={styles.modalBackText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowConfirmation(false)}>
                <Image source={require('../assets/images/close-icon.png')} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalTitle}>Confirmation</Text>
            <Text style={styles.modalSubtitle}>Please Check to proceed the trade</Text>

            <View style={styles.confirmationDetails}>
              <View style={styles.confirmationRow}>
                <View>
                  <Text style={styles.confirmationLabel}>Price</Text>
                  <Text style={styles.confirmationSubLabel}>Bitcoin (BTC)</Text>
                </View>
                <Text style={styles.confirmationValue}>$140.00</Text>
              </View>

              <View style={styles.confirmationRow}>
                <View>
                  <Text style={styles.confirmationLabel}>Type</Text>
                  <Text style={styles.confirmationSubLabel}>Transaction Type</Text>
                </View>
                <Text style={styles.confirmationValue}>{activeTab === "buy" ? "Buy" : "Sell"}</Text>
              </View>

              <View style={styles.confirmationRow}>
                <View>
                  <Text style={styles.confirmationLabel}>Amount</Text>
                  <Text style={styles.confirmationSubLabel}>Total amount</Text>
                </View>
                <Text style={styles.confirmationValue}>184248.00</Text>
              </View>

              <View style={styles.confirmationRow}>
                <View>
                  <Text style={styles.confirmationLabel}>Fee</Text>
                  <Text style={styles.confirmationSubLabel}>Transaction Fees</Text>
                </View>
                <Text style={styles.confirmationValue}>$10.00</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.confirmButton, activeTab === "sell" && styles.sellButton]}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.editButton} onPress={() => setShowConfirmation(false)}>
              <Text style={styles.editButtonText}>Edit Trade</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.modalTopPosition, styles.successModalContent]}>
            <View style={styles.completedModalHeader}>
              <TouchableOpacity onPress={() => setShowSuccess(false)}>
                <Image source={require('../assets/images/close-icon.png')} />
              </TouchableOpacity>
            </View>

            <View style={styles.successContent}>
              <View style={styles.successIcon}>
                <Image source={require('../assets/images/round-check.png')} />
              </View>
              <Text style={styles.successTitle}>Trade Completed</Text>
              <TouchableOpacity style={styles.viewInvoiceButton}>
                <Text style={styles.viewInvoiceText}>View Invoice</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 0,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: StatusBar.currentHeight || 0,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: '140%',
    color: "#fff",
    fontFamily: "Outfit",
  },
  valueSection: {
    alignItems: "center",
    paddingVertical: 32,
  },
  valueLabel: {
    fontFamily: "Outfit",
    fontWeight: 600,
    color: "#8E8F96",
    fontSize: 16,
    lineHeight: '140%',
    marginBottom: 16,
  },
  aprContainer: {
    backgroundColor: "#34B86D",
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 4,
  },
  aprText: {
    fontFamily: "Outfit",
    color: "#fff",
    fontSize: 10,
    fontWeight: 500,
    lineHeight: '100%',
  },
  totalValue: {
    fontSize: 48,
    fontWeight: 600,
    lineHeight: '100%',
    color: "#fff",
    fontFamily: "Outfit",
    marginBottom: 4,
  },
  cryptoIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: -8,
  },
  cryptoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#000000",
  },
  tradingSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  tab: {
    flex: 1,
    paddingTop: 28,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#2C73FF",
  },
  activeTab: {
    borderBottomColor: "#E1E2E3",
  },
  tabText: {
    textAlign: 'center',
    fontFamily: "Outfit",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '140%',
    color: '#090914',
  },
  form: {
    backgroundColor: "#fff",
    padding: 20,
  },
  inputContainer: {
    marginVertical: 20,
  },
  inputLabel: {
    fontFamily: "Outfit",
    fontSize: 18,
    fontWeight: 500,
    lineHeight: '140%',
    marginBottom: 16,
    color: "#48484D",
  },
  input: {
    fontFamily: "Outfit",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '140%',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E0",
    color: "#090914",
  },
  buyButton: {
    backgroundColor: "#2C73FF",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
    fontFamily: "Outfit",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '150%',
    color: '#fff',
  },
  sellButton: {
    backgroundColor: "#2563EB",
  },
  buyButtonText: {
    fontFamily: "Outfit",
    color: "#fff",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '150%',
    textAlign: 'center',
  },
  assetsListContainer: {
    backgroundColor: "#fff",
    padding: 20,
  },
  assetsTitle: {
    fontFamily: "Outfit",
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '140%',
    marginBottom: 12,
    color: "#090914",
  },
  assetItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E2E3",
  },
  assetInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  assetIcon: {
    width: 44,
    height: 44,
  },
  assetSymbol: {
    fontFamily: "Outfit",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '140%',
    color: "#090914",
  },
  assetValue: {
    fontFamily: "Outfit",
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '140%',
    color: "#48484D",
  },
  assetRate: {
    fontFamily: "Outfit",
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '140%',
    color: "#090914",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    width: "92%",
    maxWidth: 390,
  },
  modalTopPosition: {
    marginTop: Platform.OS === "ios" ? 100 : 80,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
    paddingTop: 4,
  },
  completedModalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 28,
    paddingTop: 4,
  },
  modalBackButton: {
    marginRight: 8,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  modalBackText: {
    fontFamily: "Outfit",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '140%',
    color: "#090914",
  },
  modalTitle: {
    fontFamily: "Outfit",
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '140%',
    color: '#090914',
  },
  modalSubtitle: {
    fontFamily: "Outfit",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '150%',
    color: "#48484D",
    marginBottom: 28,
    marginTop: 4,
  },
  confirmationDetails: {
    gap: 16,
    marginBottom: 28,
  },
  confirmationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  confirmationLabel: {
    fontFamily: "Outfit",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '140%',
    color: "#090914",
    marginBottom: 4,
  },
  confirmationSubLabel: {
    fontFamily: "Outfit",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '150%',
    color: "#48484D",
  },
  confirmationValue: {
    fontFamily: "Outfit",
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '140%',
    color: "#090914",
    marginTop: 24,
    marginLeft: "auto",
  },
  confirmButton: {
    backgroundColor: "#2C73FF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  confirmButtonText: {
    fontFamily: "Outfit",
    fontWeight: 500,
    lineHeight: '100%',
    color: "#fff",
    fontSize: 16,
  },
  editButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1E2E3",
  },
  editButtonText: {
    fontFamily: "Outfit",
    color: "#48484D",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '100%',
  },
  successModalContent: {
    padding: 16,
  },
  successContent: {
    alignItems: "center",
  },
  successIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  successTitle: {
    fontFamily: "Outfit",
    fontWeight: 500,
    fontSize: 20,
    lineHeight: '140%',
    color: "#090914",
    marginBottom: 40,
  },
  viewInvoiceButton: {
    backgroundColor: "#2C73FF",
    width: "100%",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  viewInvoiceText: {
    fontFamily: "Outfit",
    lineHeight: '100%',
    color: "#fff",
    fontSize: 16,
    fontWeight: 500,
  },
  verificationNotice: {
    backgroundColor: "#34B86D1A",
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginBottom: 40,
    marginTop: 16,
  },
  verificationNoticeText: {
    fontFamily: 'Outfit',
    fontWeight: 400,
    color: "#34B86D",
    fontSize: 14,
    lineHeight: '150%',
    borderRadius: 4,
  },
  verificationLabel: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: 500,
    lineHeight: '140%',
    color: "#48484D",
    marginBottom: 16,
  },
  verificationInput: {
    fontFamily: 'Outfit',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '140%',
    color: '#090914',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginBottom: 28,
  },
  submitButton: {
    backgroundColor: "#2C73FF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    height: 48,
  },
  submitButtonText: {
    fontFamily: 'Outfit',
    color: "#fff",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '100%',
  },
  resendButton: {
    alignItems: "center",
    padding: 16,
  },
  resendButtonText: {
    fontFamily: 'Outfit',
    color: "#2C73FF",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '100%',
  },
})

