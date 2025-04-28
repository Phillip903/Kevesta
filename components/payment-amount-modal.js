"use client"

import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, ScrollView } from "react-native"
import { X } from "lucide-react-native"

const PaymentAmountModal = ({ onClose, onBack, onContinue }) => {
  const [haveToPay, setHaveToPay] = useState("")
  const [addAmount, setAddAmount] = useState("")

  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    // Check if all required fields are filled
    setIsValid(haveToPay.trim() !== "" && addAmount.trim() !== "")
  }, [haveToPay, addAmount])

  const handleSubmit = () => {
    if (isValid) {
      onContinue({ haveToPay, addAmount })
    }
  }

  return (
    <Modal animationType="slide" transparent={true} visible={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Electricity Bill</Text>
            <TouchableOpacity onPress={onClose} style={styles.headerButton}>
              <X size={20} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <Text style={styles.subtitle}>Enter Payment Amount</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Have to pay</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter have to pay"
                value={haveToPay}
                onChangeText={(text) => setHaveToPay(text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Add Amount</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter add amount"
                value={addAmount}
                onChangeText={(text) => setAddAmount(text)}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.continueButton, isValid ? styles.continueButtonActive : '']}
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <Text style={[styles.continueButtonText, isValid ? styles.continueButtonTextActive : '']}>Continue</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

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
})

export default PaymentAmountModal


