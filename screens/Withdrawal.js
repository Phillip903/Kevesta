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
  trx: require("../assets/images/coins/trx.png"),
  link: require("../assets/images/coins/link.png"),
  ada: require("../assets/images/coins/ada.png"),
}

const checkImages = {
  checked: require('../assets/images/checkbox/checked.png'),
  unchecked: require('../assets/images/checkbox/unchecked.png'),
}

export default function Withdrawal({ navigation }) {
  const [activeTab, setActiveTab] = useState("crypto")
  const [showSelectAmount, setShowSelectAmount] = useState(false)
  const [showVerification, setShowVerification] = useState(false)
  const [showSelectAssetModal, setShowSelectAssetModal] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
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
    { symbol: "BTC", name: "Bitcoin", value: "$184248.00", image: "bitcoin", apr: 7.46 }, 
    { symbol: "ETH", name: "Ethereum", value: "$2,000.00", image: "ethereum", apr: 7.46 },
    { symbol: "BNB", name: "BNB", value: "$200.00", image: "bnb", apr: 7.46 },
    { symbol: "USDT", name: "USDT", value: "$200.00", image: "usdt", apr: 7.46 },
    { symbol: "XRP", name: "XRP", value: "$100.00", image: "xrp", apr: 7.46 },
    { symbol: "TRX", name: "TRX", value: "$00", image: "trx", apr: -40.1 },
    { symbol: "LINK", name: "LINK", value: "$00", image: "link", apr: -40.1 },
    { symbol: "ADA", name: "ADA", value: "$00", image: "ada", apr: -40.1 },
  ]
  
  const payments = [
    { name: 'Mastercard', logo: require("../assets/images/payments/mastercard.png"), expDate: '06/24', default: true },
    { name: 'Visa', logo: require("../assets/images/payments/visa.png"), expDate: '06/24', checked: true },
    { name: 'Paypal', logo: require("../assets/images/payments/paypal.png"), expDate: '06/24', checked: true },
    { name: 'Apple Pay', logo: require("../assets/images/payments/applePay.png"), expDate: '06/24', default: true },
    { name: 'Google Pay', logo: require("../assets/images/payments/googlePay.png"), expDate: '06/24' },
  ]

  const txHistory = [
    { symbol: 'BTC', image: assetImages.bitcoin, date: 'Jun 24, 2025', amount: '$66.00', status: 'Complete' },
    { symbol: 'ETH', image: assetImages.ethereum, date: 'Jun 24, 2025', amount: '$66.00', status: 'Pending' },
    { symbol: 'BNB', image: assetImages.bnb, date: 'Jun 24, 2025', amount: '$66.00', status: 'Failed' },
    { symbol: 'USDT', image: assetImages.usdt, date: 'Jun 24, 2025', amount: '$66.00', status: 'Complete' },
    { symbol: 'XRP', image: assetImages.xrp, date: 'Jun 24, 2025', amount: '$66.00', status: 'Complete' },
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

  const handleSelectAmountSubmit = () => {
    setShowSelectAmount(false)
    setShowSelectAssetModal(true)
  }

  const handleSelectAssetSubmit = () => {
    setShowSelectAssetModal(false)
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
              <Text style={styles.headerTitle}>Withdrawal</Text>
              <View style={{ width: 24 }} />
            </View>

            {/* Trading Section */}
            <View style={styles.withdrawalSection}>
              {/* Tabs */}
              <View style={styles.tabs}>
                <TouchableOpacity
                  style={[styles.tab, activeTab === "crypto" && styles.activeTab]}
                  onPress={() => setActiveTab("crypto")}
                >
                  <Text style={styles.tabText}>Crypto</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tab, activeTab === "bankAccounts" && styles.activeTab]}
                  onPress={() => setActiveTab("bankAccounts")}
                >
                  <Text style={styles.tabText}>Bank Accounts</Text>
                </TouchableOpacity>
              </View>

              {/* Assets List */}
              {
                activeTab === 'crypto' && <View style={styles.assetsListContainer}>
                  {assets.map((asset, index) => (
                    <View key={index} style={styles.assetItem}>
                      <View style={styles.assetInfo}>
                        <Image source={assetImages[asset.image]} style={styles.assetIcon} resizeMode="contain" />
                        <View>
                          <Text style={styles.assetSymbol}>{asset.symbol}</Text>
                          <Text style={styles.assetValue}>{asset.value}</Text>
                        </View>
                      </View>
                      <View style={styles.assetAprContainer}>
                        <Text style={asset.apr >= 0 ? styles.assetPlusApr : styles.assetMinusApr}>{asset.apr > 0 ? `+${asset.apr}% APR` : `${asset.apr}% APR`}</Text>
                        <TouchableOpacity style={styles.withdrawButton} onPress={() => setShowSelectAmount(true)}>
                          <Text>Withdraw</Text>
                          <Image source={require("../assets/images/withdrawal/arrow-square-right.png")} style={styles.arrowRightIcon} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              }
              {
                activeTab === 'bankAccounts' && <View style={styles.bankAccountsPanel}>
                  <View style={styles.paymentList}>
                    {
                      payments.map(payment => <TouchableOpacity style={styles.bankPaymentContainer} map={payment.name} key={payment.name} onPress={() => setShowDetails(true)}>
                        <View style={styles.bankPaymentLeftContainer}>
                          <View style={styles.greenCircle}></View>
                          <Text style={styles.paymentActiveText}>Active</Text>
                          <View style={styles.bankPaymentLogoContainer}>
                            <Image source={payment.logo}/>
                          </View>
                          <View style={styles.bankPaymentNameContainer}>
                            <Text style={styles.bankPaymentName}>BTC</Text>
                            <Text style={styles.bankPaymentDate}>06/2024</Text>
                          </View>
                        </View>
                        <Text style={styles.bankPaymentBalance}>1,598,000</Text>
                      </TouchableOpacity>)
                    }
                  </View>
                  <Text style={styles.transactionHistory}>Transaction History</Text>
                  <View style={styles.txHistoryContainer}>
                    {
                      txHistory.map(tx => <TouchableOpacity style={styles.txHistory} key={tx.symbol}>
                        <View style={styles.txCoinContainer}>
                          <Image source={tx.image}/>
                          <View style={styles.txCoinNameContainer}>
                            <Text style={styles.txCoinName}>{tx.symbol}</Text>
                            <Text style={styles.txDate}>{tx.date}</Text>
                          </View>
                        </View>
                        <Text style={styles.txAmount}>{tx.amount}</Text>
                        <View style={styles.txStatus}>
                          <View style={tx.status === 'Complete' ? styles.txComplete : (tx.status === 'Pending' ? styles.txPending : styles.txFailed)}/>
                          <Text style={styles.tsStatusText}>{tx.status}</Text>
                        </View>
                      </TouchableOpacity>)
                    }
                  </View>
                </View>
              }
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
                <Image source={require('../assets/images/close-icon.png')}/>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalTitle}>Verification</Text>

            <View style={styles.verificationNotice}>
              <Text style={styles.verificationNoticeText}>
                We have sent a verification code to your email demoemail@gmail.com
              </Text>
            </View>

            <Text style={styles.addAmountLabel}>Verification Code</Text>

            <TextInput
              style={styles.amountInput}
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

      {/* Select Amount Modal */}
      <Modal visible={showSelectAmount} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.modalTopPosition]}>
            <View style={styles.modalHeader}>
              <Text style={styles.selectAmountLabel}>Select Amount</Text>
              <TouchableOpacity onPress={() => setShowSelectAmount(false)}>
                <Image source={require('../assets/images/close-icon.png')}/>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalTitle}>Amount You have</Text>
            <View style={styles.coinBox}>
              <View style={styles.coinContainer}>
                <Image source={assetImages.bitcoin} style={styles.coinImage} />
                <Text style={styles.coinName}>Bitcoin (BTC)</Text>
              </View>
              <Text style={styles.coinPrice}>$8,000</Text>
            </View>

            <Text style={styles.addAmountLabel}>Add Amount</Text>

            <TextInput
              style={styles.amountInput}
              keyboardType="numeric"
              placeholder="Add Amount"
              placeholderTextColor="#8E8F96"
            />

            <TouchableOpacity
              style={[styles.confirmButton, activeTab === "sell" && styles.sellButton]}
              onPress={handleSelectAmountSubmit}
            >
              <Text style={styles.confirmButtonText}>Next</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.editButton} onPress={() => setShowConfirmation(false)}>
              <Text style={styles.editButtonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Select Asset Modal */}
      <Modal visible={showSelectAssetModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.modalTopPosition]}>
            <View style={styles.modalHeader}>
              <Text style={styles.selectAmountLabel}>Select Amount</Text>
              <TouchableOpacity onPress={() => setShowSelectAssetModal(false)}>
                <Image source={require('../assets/images/close-icon.png')}/>
              </TouchableOpacity>
            </View>

            <View style={styles.assetTitleContainer}>
              <Text style={styles.modalTitle}>Select your asset</Text>
              <TouchableOpacity style={styles.plusButtonContainer}>
                <Image source={require("../assets/images/plus.png")} />
              </TouchableOpacity>
            </View>

            <View style={styles.paymentsContainer}>
              {
                payments.map(payment => <View style={styles.paymentContainer} key={payment.name}>
                  <View style={styles.paymentLeft}>
                    {
                      <Image source={payment.checked ? checkImages.checked : checkImages.unchecked} style={styles.checkImage} />
                    }
                    <View style={styles.paymentLogoContainer}>
                      <Image source={payment.logo}/>
                    </View>
                    <View style={styles.paymentInfoContainer}>
                      <Text style={styles.paymentName}>{payment.name}</Text>
                      <Text style={styles.paymentExpDate}>Exp.date {payment.expDate}</Text>
                    </View>
                  </View>
                  {
                    payment.default && <View style={styles.defaultContainer}>
                      <Text style={styles.defaultText}>Default</Text>
                    </View>
                  }
                </View>)
              }
            </View>

            <TouchableOpacity
              style={[styles.confirmButton, activeTab === "sell" && styles.sellButton]}
              onPress={handleSelectAssetSubmit}
            >
              <Text style={styles.confirmButtonText}>Request Payment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.editButton} onPress={() => setShowSelectAssetModal(false)}>
              <Text style={styles.editButtonText}>Back</Text>
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
                <Image source={require('../assets/images/close-icon.png')}/>
              </TouchableOpacity>
            </View>

            <Text style={styles.confirmModalTitle}>Confirmation</Text>
            <Text style={styles.modalSubtitle}>Please Check to proceed the trade</Text>

            <View style={styles.confirmationDetails}>
              <View style={styles.confirmationRow}>
                <View>
                  <Text style={styles.confirmationLabel}>Asset</Text>
                  <Text style={styles.confirmationSubLabel}>Bitcoin (BTC)</Text>
                </View>
                <Text style={styles.confirmationValue}>$4,000</Text>
              </View>

              <View style={styles.confirmationRow}>
                <View>
                  <Text style={styles.confirmationLabel}>Payment Method</Text>
                  <Text style={styles.confirmationSubLabel}>Mastercard</Text>
                </View>
                <Text style={styles.confirmationValue}>1116 **** ****</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.confirmButton, activeTab === "sell" && styles.sellButton]}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowConfirmation(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
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
                <Image source={require('../assets/images/close-icon.png')}/>
              </TouchableOpacity>
            </View>

            <View style={styles.successContent}>
              <View style={styles.successIcon}>
                <Image source={require('../assets/images/round-check.png')}/>
              </View>
              <Text style={styles.successTitle}>Payment Completed</Text>
              <TouchableOpacity style={styles.viewInvoiceButton}>
                <Text style={styles.viewInvoiceText}>View Invoice</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Transaction Detail Modal */}
      <Modal visible={showDetails} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.modalTopPosition]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity style={styles.modalBackButton} onPress={() => setShowDetails(false)}>
                <Text style={styles.modalBackText}>Details</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowDetails(false)}>
                <Image source={require('../assets/images/close-icon.png')} />
              </TouchableOpacity>
            </View>

            <View style={styles.txDetailPaymentContainer}>
              <View style={styles.txDetailCardContainer}>
                <Text style={styles.txDetailCoinSymbol}>BTC</Text>
                <Text style={styles.txDetailCardNumber}>1116 **** ****</Text>
              </View>
              <View style={styles.defaultContainer}>
                <Text style={styles.defaultText}>Default</Text>
              </View>
            </View>

            <View style={styles.txInfoPanel}>
              <View style={styles.txInfoRow}>
                <View style={styles.txInfoGroup}>
                  <Text style={styles.txInfoLabel}>Card</Text>
                  <Text style={styles.txInfoValue}>Bitcoin (BTC)</Text>
                </View>
                <View style={styles.txInfoGroup}>
                  <Text style={styles.txInfoLabel}>Type</Text>
                  <Text style={styles.txInfoValue}>Debit</Text>
                </View>
              </View>

              <View style={styles.txInfoRow}>
                <View style={styles.txInfoGroup}>
                  <Text style={styles.txInfoLabel}>Status</Text>
                  <Text style={styles.txInfoValue}>Active</Text>
                </View>
                <View style={styles.txInfoGroup}>
                  <Text style={styles.txInfoLabel}>Exp. Date</Text>
                  <Text style={styles.txInfoValue}>06/2024</Text>
                </View>
              </View>

              <View style={styles.txInfoRow}>
                <View style={styles.txInfoGroup}>
                  <Text style={styles.txInfoLabel}>Currency</Text>
                  <Text style={styles.txInfoValue}>USD</Text>
                </View>
                <View style={styles.txInfoGroup}>
                  <Text style={styles.txInfoLabel}>Balance</Text>
                  <Text style={styles.txInfoValue}>1,598,000</Text>
                </View>
              </View>
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
    marginBottom: 28,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: '140%',
    color: "#fff",
    fontFamily: "Outfit",
  },
  headerRight: {
    width: 24,
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
  withdrawalSection: {
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
    borderBottomColor: "#E1E2E3",
  },
  activeTab: {
    borderBottomColor: "#2C73FF",
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
    paddingTop: 8,
    paddingBottom: 20,
    paddingHorizontal: 20,
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
    paddingVertical: 20,
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
  arrowRightIcon: {
    width: 20,
    height: 20,
  },
  assetAprContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  assetPlusApr: {
    borderRadius: 4,
    padding: 4,
    backgroundColor: '#EBF8F1',
    color: '#34B86D',
    fontFamily: "Outfit",
    fontWeight: 500,
    fontSize: 10,
    lineHeight: '100%',
    width: 'fit-content',
    marginBottom: 8,
  },
  assetMinusApr: {
    borderRadius: 4,
    padding: 4,
    backgroundColor: '#FFEEEB',
    color: '#FA5014',
    fontFamily: "Outfit",
    fontWeight: 500,
    fontSize: 10,
    lineHeight: '100%',
    width: 'fit-content',
    marginBottom: 8,
  },
  withdrawButton: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  assetSymbol: {
    fontFamily: "Outfit",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '140%',
    color: "#48484D",
    marginBottom: 2,
  },
  assetValue: {
    fontFamily: "Outfit",
    fontSize: 20,
    fontWeight: 500,
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
  assetTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontFamily: "Outfit",
    fontWeight: 500,
    fontSize: 20,
    lineHeight: '140%',
    color: '#090914',
  },
  confirmModalTitle: {
    fontFamily: "Outfit",
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '140%',
    color: '#090914',
    marginBottom: 4,
  },
  plusButtonContainer: {
    width: 32,
    height: 32,
    borderRadius: 56,
    backgroundColor: '#F2F2F2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSubtitle: {
    fontFamily: "Outfit",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '150%',
    color: "#48484D",
    marginBottom: 28,
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
    padding: 16,
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
  cancelButton: {
    backgroundColor: "#FA5014",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    fontFamily: "Outfit",
    color: "#FFFFFF",
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
  addAmountLabel: {
    fontFamily: 'Outfit',
    fontSize: 18,
    fontWeight: 500,
    lineHeight: '140%',
    color: "#48484D",
    marginBottom: 16,
  },
  amountInput: {
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
  selectAmountLabel: {
    fontFamily: 'Outfit',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '140%',
    color: '#090914',
  },
  coinImage: {
    width: 28,
    height: 28,
  },
  coinBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#E1E2E3',
    padding: 12,
    borderRadius: 8,
  },
  coinContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  coinName: {
    fontFamily: 'Outfit',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '140%',
    color: '#48484D',
  },
  coinPrice: {
    fontFamily: 'Outfit',
    fontWeight: 600,
    fontSize: 20,
    lineHeight: '140%',
    color: '#090914'
  },
  paymentsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom: 28,
  },
  paymentContainer: {
    borderWidth: 1,
    borderColor: '#E1E2E3',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  paymentLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkImage: {
    marginRight: 12,
  },
  paymentLogoContainer: {
    width: 46,
    height: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E1E2E3',
    marginRight: 10,
  },
  paymentInfoContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  paymentName: {
    fontFamily: 'Outfit',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '140%',
    color: '#090914',
  },
  paymentExpDate: {
    fontFamily: 'Outfit',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '140%',
    color: '#48484D'
  },
  defaultContainer: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#53535B',
    height: 'fitContent',
  },
  defaultText: {
    fontFamily: 'Outfit',
    fontWeight: 500,
    fontSize: 12,
    lineHeight: '140%',
    color: '#FFFFFF',
  },
  paymentList: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 40,
  },
  bankPaymentContainer: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E2E3',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankPaymentLeftContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenCircle: {
    width: 12,
    height: 12,
    backgroundColor: '#34B86D',
    borderRadius: 6,
    marginRight: 8,
  },
  paymentActiveText: {
    fontFamily: 'Outfit',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '140%',
    color: '#48484D',
    marginRight: 20,
  },
  bankPaymentLogoContainer: {
    width: 52,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E2E3',
    borderRadius: 6,
    marginRight: 12,
  },
  bankPaymentNameContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  bankPaymentName: {
    fontFamily: 'Outfit',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '140%',
    color: '#090914',
  },
  bankPaymentDate: {
    fontFamily: 'Outfit',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '140%',
    color: '#48484D',
  },
  bankPaymentBalance: {
    fontFamily: 'Outfit',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '140%',
    color: '#090914',
  },
  bankAccountsPanel: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  transactionHistory: {
    fontFamily: 'Outfit',
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',
    color: '#090914',
    marginBottom: 8,
  },
  txHistoryContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  txHistory: {
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txCoinContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  txCoinNameContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  txCoinName: {
    fontFamily: 'Outfit',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '140%',
    color: '#090914',
  },
  txDate: {
    fontFamily: 'Outfit',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '140%',
    color: '#48484D',
  },
  txAmount: {
    fontFamily: 'Outfit',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '140%',
    color: '#090914',
  },
  txStatus: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 72,
  },
  txComplete: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#34B86D',
  },
  txPending: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F3BA2F',
  },
  txFailed: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FA5014',
  },
  tsStatusText: {
    fontFamily: 'Outfit',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '140%',
    color: '#48484D',
  },
  txDetailPaymentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  txDetailCardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  txDetailCoinSymbol: {
    fontFamily: 'Outfit',
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '140%',
    color: '#090914',
  },
  txDetailCardNumber: {
    fontFamily: 'Outfit',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '150%',
    color: '#48484D',
  },
  txInfoPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  txInfoRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  txInfoGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    flexGrow: 1,
    width: 0,
  },
  txInfoLabel: {
    fontFamily: 'Outfit',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '140%',
    color: '#090914',
  },
  txInfoValue: {
    fontFamily: 'Outfit',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '150%',
    color: '#48484D',
  }
})

