import { View, Text, TouchableOpacity, Modal, StyleSheet, Platform, Image } from "react-native"

const SuccessModal = ({ content, onClose }) => {
  return (
    <Modal visible={true} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, styles.modalTopPosition, styles.successModalContent]}>
          <View style={styles.completedModalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Image source={require('../assets/images/close-icon.png')} />
            </TouchableOpacity>
          </View>

          <View style={styles.successContent}>
            <View style={styles.successIcon}>
              <Image source={require('../assets/images/round-check.png')} />
            </View>
            <Text style={styles.successTitle}>{content}</Text>
            <TouchableOpacity style={styles.viewInvoiceButton}>
              <Text style={styles.viewInvoiceText}>View Invoice</Text>
            </TouchableOpacity>
          </View>
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
})

export default SuccessModal

