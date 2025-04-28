"use client";

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { X } from "lucide-react-native";

// interface PaymentMethodModalProps {
//   onClose: () => void;
//   onBack: () => void;
//   onContinue: (amount: number) => void;
//   billAmount: number;
// }

// const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({

const checkImages = {
  checked: require('../assets/images/checkbox/checked.png'),
  unchecked: require('../assets/images/checkbox/unchecked.png'),
}

const PaymentMethodModal = ({
  onClose,
  onBack,
  onContinue,
}) => {
  const handleSubmit = () => {
    onContinue();
  };

  const payments = [
    { name: 'Mastercard', logo: require("../assets/images/payments/mastercard.png"), expDate: '06/24', default: true },
    { name: 'Visa', logo: require("../assets/images/payments/visa.png"), expDate: '06/24', checked: true },
    { name: 'Paypal', logo: require("../assets/images/payments/paypal.png"), expDate: '06/24', checked: true },
    { name: 'Apple Pay', logo: require("../assets/images/payments/applePay.png"), expDate: '06/24', default: true },
    { name: 'Google Pay', logo: require("../assets/images/payments/googlePay.png"), expDate: '06/24' },
  ]

  return (
    <Modal animationType="slide" transparent={true} visible={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Electricity Bill</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <Text style={styles.title}>Select Payment Method</Text>

            <View style={styles.paymentsContainer}>
              {
                payments.map(payment => <View style={styles.paymentContainer} key={payment.name}>
                  <View style={styles.paymentLeft}>
                    {
                      <Image source={payment.checked ? checkImages.checked : checkImages.unchecked} style={styles.checkImage} />
                    }
                    <View style={styles.paymentLogoContainer}>
                      <Image source={payment.logo} />
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

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.continueButton, styles.continueButtonActive]}
                onPress={handleSubmit}
              >
                <Text
                  style={[styles.continueButtonText, styles.continueButtonTextActive]}
                >
                  Continue
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    marginTop: 40,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    maxHeight: "90%",
    padding: 16,
  },
  header: {
    display: 'flex',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '140%',
    color: '#090914',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 500,
    lineHeight: '140%',
    color: '#090914',
    marginBottom: 28,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: '140%',
    color: "#48484D",
    marginBottom: 12,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingVertical: 12,
    fontSize: 16,
    color: '#8E8F96',
  },
  buttonContainer: {
    marginTop: 28,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  continueButton: {
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  continueButtonActive: {
    backgroundColor: "#2C73FF",
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#090914",
    lineHeight: '100%',
  },
  continueButtonTextActive: {
    color: "white",
  },
  backButton: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "500",
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
})

export default PaymentMethodModal