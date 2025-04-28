"use client"

import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from "react-native"

const ConfirmationModal = ({ details, onClose, onBack, onContinue }) => {
  return (
    <Modal visible={true} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.modalBackButton} onPress={onBack}>
              <Image source={require("../assets/images/trading/arrow-left.png")} />
              <Text style={styles.modalBackText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <Image source={require('../assets/images/close-icon.png')} />
            </TouchableOpacity>
          </View>

          <Text style={styles.modalTitle}>Confirmation</Text>
          <Text style={styles.modalSubtitle}>Please Check to proceed the trade</Text>

          <View style={styles.confirmationDetails}>
            {
              details.map(detail => <View style={styles.confirmationRow} key={detail.title}>
                <View>
                  <Text style={styles.confirmationLabel}>{detail.title}</Text>
                  <Text style={styles.confirmationSubLabel}>{detail.label}</Text>
                </View>
                <Text style={styles.confirmationValue}>{detail.value}</Text>
              </View>)
            }
          </View>

          <TouchableOpacity
            style={[styles.confirmButton, styles.activeConfirmButton]}
            onPress={onContinue}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.editButton} onPress={onBack}>
            <Text style={styles.editButtonText}>Edit Bill</Text>
          </TouchableOpacity>
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
    padding: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  activeConfirmButton: {
    backgroundColor: "#2563EB",
  },
})

export default ConfirmationModal


