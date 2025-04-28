"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, StyleSheet, SafeAreaView } from "react-native"
import {
  ArrowLeft,
  Search,
} from "lucide-react-native"
import PaymentMethodModal from "../components/payment-method-modal"
import SelectProviderModal from "../components/select-provider-modal"
import AccountDetailsModal from "../components/account-details-modal"
import PaymentAmountModal from "../components/payment-amount-modal"
import ConfirmationModal from "../components/confirmation-modal"
import SuccessModal from "../components/success-modal"

const payments = [
  { name: 'Mastercard', logo: require("../assets/images/payments/mastercard.png"), expDate: '06/24', default: true },
  { name: 'Visa', logo: require("../assets/images/payments/visa.png"), expDate: '06/24', checked: true },
  { name: 'Paypal', logo: require("../assets/images/payments/paypal.png"), expDate: '06/24', checked: true },
  { name: 'Apple Pay', logo: require("../assets/images/payments/applePay.png"), expDate: '06/24', default: true },
  { name: 'Google Pay', logo: require("../assets/images/payments/googlePay.png"), expDate: '06/24' },
]

const paymentHistory = [
  { method: 'mastercard', item: 'Electricity', value: '$66.00' },
  { method: 'visa', item: 'Gas', value: '$66.00' },
  { method: 'mastercard', item: 'Water', value: '$66.00' },
  { method: 'paypal', item: 'Internet', value: '$66.00' },
  { method: 'visa', item: 'Telephone', value: '$66.00' },
  { method: 'mastercard', item: 'TV', value: '$66.00' },
  { method: 'visa', item: 'Credit Card', value: '$66.00' },
  { method: 'mastercard', item: 'Insurance', value: '$66.00' },
]

const Payment = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Organization")
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    service: null,
    provider: null,
    accountDetails: null,
    paymentAmount: null,
    paymentMethod: null,
  })

  const services = [
    { id: "electricity", name: "Electricity", icon: require("../assets/images/electricityVector.png") },
    { id: "gas", name: "Gas", icon: require("../assets/images/gasVector.png") },
    { id: "water", name: "Water", icon: require("../assets/images/waterVector.png") },
    { id: "internet", name: "Internet", icon: require("../assets/images/internetVector.png") },
    { id: "telephone", name: "Telephone", icon: require("../assets/images/telephoneVector.png") },
    { id: "tv", name: "tv", icon: require("../assets/images/tvVector.png") },
    { id: "creditCard", name: "Credit Card", icon: require("../assets/images/creditCardVector.png") },
    { id: "govtFees", name: "Govt. Fees", icon: require("../assets/images/govtVector.png") },
    { id: "insurance", name: "Insurance", icon: require("../assets/images/insuranceVector.png") },
    { id: "tracker", name: "Tracker", icon: require("../assets/images/trackerVector.png") },
    { id: "others", name: "Others", icon: require("../assets/images/othersVector.png") },

  ];

  const providers = [
    { id: 1, name: "Vattenfall" },
    { id: 2, name: "EDF" },
    { id: 3, name: "E.ON for electricity" },
  ]


  const paymentMethods = [
    {
      id: "mastercard",
      name: "Mastercard",
      logo: require("../assets/images/payments/mastercard.png"),
      expDate: "06/24",
      isDefault: true,
    },
    {
      id: "visa",
      name: "Visa",
      logo: require("../assets/images/payments/visa.png"),
      expDate: "06/24",
    },
    {
      id: "paypal",
      name: "Paypal",
      logo: require("../assets/images/payments/paypal.png"),
      expDate: "06/24",
    },
    {
      id: "apple-pay",
      name: "Apple Pay",
      logo: require("../assets/images/payments/applePay.png"),
      expDate: "06/24",
    },
    {
      id: "google-pay",
      name: "Google Pay",
      logo: require("../assets/images/payments/googlePay.png"),
      expDate: "06/24",
    },

  ]

  const confirmationDetails = [
    { title: 'Bill For', label: 'Bill For', value: 'Electricity' },
    { title: 'Provider', label: 'Provider', value: 'vattenfall' },
    { title: 'Account', label: 'Account Number', value: '1234567890' },
    { title: 'Amount', label: 'Total amount', value: '$ 100' },
  ]

  const handleServiceSelect = (service) => {
    setFormData({ ...formData, service })
    setCurrentStep(1)
  }

  const handleProviderSelect = (provider) => {
    setFormData({ ...formData, provider })
  }

  const handleAccountDetails = (details) => {
    setFormData({ ...formData, accountDetails: details })
    setCurrentStep(3)
  }

  const handlePaymentAmount = ({ haveToPay, addAmount }) => {
    console.log("Payment amount:", haveToPay, addAmount) // for debugging
    setFormData((prev) => ({
      ...prev,
      paymentAmount: haveToPay,
    }))
    setCurrentStep(4)
  }

  const handlePaymentMethod = () => {
    console.log("Selected payment method:") // for debugging
    setCurrentStep(5)
  }

  const handleConfirmation = () => {
    setCurrentStep(6)
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Organization" && styles.activeTab]}
          onPress={() => setActiveTab("Organization")}
        >
          <Text style={styles.tabText}>Organization</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "History" && styles.activeTab]}
          onPress={() => setActiveTab("History")}
        >
          <Text style={[styles.tabText, activeTab === "History" && styles.activeTabText]}>History</Text>
        </TouchableOpacity>
      </View>


      {
        activeTab === 'Organization' ? <>
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Search color="#9CA3AF" size={20} style={styles.searchIcon} />
              <TextInput placeholder="Search here" style={styles.searchInput} placeholderTextColor="#6B7280" />
            </View>
          </View>

          <ScrollView style={styles.content}>
            <Text style={styles.sectionTitle}>All Organizations</Text>
            <View style={styles.servicesGrid}>
              {services.map((service, index) => {
                // Check if the last row has exactly 3 items
                const isLastRow = services.length % 4 === 3 && index >= services.length - 3;

                return (
                  <TouchableOpacity
                    key={service.id}
                    style={[styles.serviceItem, isLastRow && styles.lastRow]}
                    onPress={() => handleServiceSelect(service)}
                  >
                    <View style={styles.serviceIconContainer}>
                      <Image source={service.icon} style={{ width: 36, height: 36 }} resizeMode="contain" />
                    </View>
                    <Text style={styles.serviceName}>{service.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </> : <View style={styles.paymentListContainer}>
          {
            paymentHistory.map((payment, index) => (
              <View key={index} style={styles.paymentItem}>
                <View style={styles.paymentInfo}>
                  <View style={styles.paymentLogoContainer}>
                    <Image source={payments.find(method => method.name.toLowerCase() === payment.method).logo} style={styles.paymentIcon} resizeMode="contain" width={21} height={13} />
                  </View>
                  <View>
                    <Text style={styles.paymentPurpose}>{payment.item}</Text>
                    <Text style={styles.paymentValue}>{payment.value}</Text>
                  </View>
                </View>
                <View style={styles.paymentInfoContainer}>
                  <Text style={styles.paymentDate}>Jun 24, 2024</Text>
                  <TouchableOpacity style={styles.detailsButton} onPress={() => setShowSelectAmount(true)}>
                    <Text>Details</Text>
                    <Image source={require("../assets/images/withdrawal/arrow-square-right.png")} style={styles.arrowRightIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          }
        </View>
      }


      {/* Modals */}
      {currentStep === 1 && (
        <SelectProviderModal value={formData.provider} onClose={() => setCurrentStep(2)} onSelect={handleProviderSelect} providers={providers} />
      )}
      {currentStep === 2 && (
        <AccountDetailsModal
          onClose={() => setCurrentStep(3)}
          onBack={() => setCurrentStep(1)}
          onContinue={handleAccountDetails}
        />
      )}
      {currentStep === 3 && (
        <PaymentAmountModal
          onClose={() => setCurrentStep(4)}
          onBack={() => setCurrentStep(2)}
          onContinue={handlePaymentAmount}
          billAmount={100}
        />
      )}
      {currentStep === 4 && (
        <PaymentMethodModal
          onClose={() => setCurrentStep(5)}
          onBack={() => setCurrentStep(3)}
          onContinue={handlePaymentMethod}
          paymentMethods={paymentMethods}
        />
      )}
      {currentStep === 5 && (
        <ConfirmationModal
          onClose={() => setCurrentStep(6)}
          onBack={() => setCurrentStep(4)}
          onContinue={handleConfirmation}
          details={confirmationDetails}
        />
      )}
      {currentStep === 6 && (
        <SuccessModal
          content='Bill Payment Completed'
          onClose={() => {
            setCurrentStep(0)
            setFormData({
              service: null,
              provider: null,
              accountDetails: null,
              paymentAmount: null,
              paymentMethod: null,
            })
          }}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#10181E",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    height: 90
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    marginLeft: '25%',
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tab: {
    flex: 1,
    paddingTop: 28,
    paddingBottom: 20,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#2563eb",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#090914",
    lineHeight: '140%',
  },
  searchContainer: {
    padding: 16,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F5F7",
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 17,
    fontSize: 13,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 16,
    lineHeight: '140%',
    color: '#090914',
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Align items closely
    gap: 8, // Default spacing for most items
  },

  serviceItem: {
    width: "22%", // Fits 4 items per row
    alignItems: "center",
    marginBottom: 12, // Less vertical spacing
  },

  // Special styling for last 3 items
  lastRow: {
    width: "23%", // Make them wider so they appear closer
  },


  serviceIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  serviceName: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '100%',
    color: "#090914",
    textAlign: "center",
  },
  paymentListContainer: {
    backgroundColor: "#fff",
    paddingTop: 8,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  paymentItem: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E2E3",
  },
  paymentInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  paymentIcon: {
    width: 21,
    height: 13,
  },
  arrowRightIcon: {
    width: 20,
    height: 20,
  },
  paymentInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: 'fit-content',
  },
  paymentDate: {
    borderRadius: 4,
    padding: 4,
    backgroundColor: '#F2F2F2',
    color: '#53535B',
    fontFamily: "Outfit",
    fontWeight: 500,
    fontSize: 10,
    lineHeight: '100%',
    width: 'fit-content',
    marginBottom: 8,
  },
  detailsButton: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  paymentPurpose: {
    fontFamily: "Outfit",
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '140%',
    color: "#48484D",
    marginBottom: 2,
  },
  paymentValue: {
    fontFamily: "Outfit",
    fontSize: 20,
    fontWeight: 500,
    lineHeight: '140%',
    color: "#090914",
  },
  paymentLogoContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#E1E2E3",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Payment

