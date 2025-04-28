"use client"

import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { X, ChevronDown } from "lucide-react-native";
import { useState } from "react";

// interface Provider {
//   id: string;
//   name: string;
// }

// interface SelectProviderModalProps {
//   onClose: () => void;
//   onSelect: (provider: Provider) => void;
//   providers: Provider[];
// }

// const SelectProviderModal: React.FC<SelectProviderModalProps> = ({ onClose, onSelect, providers }) => {
const SelectProviderModal = ({ value, onClose, onSelect, providers }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Modal animationType="slide" transparent visible onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Electricity Bill</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Select Provider</Text>

            <TouchableOpacity style={styles.dropdownTrigger} onPress={toggleDropdown}>
              {
                value ? <View style={styles.dropdownValue}>
                  <View style={styles.providerIcon} />
                  <Text style={styles.providerName}>{value.name}</Text>
                </View> : <Text style={styles.dropdownText}>Select Provider</Text>
              }
              <ChevronDown size={20} color="#000" />
              {isDropdownOpen && (
                <View style={styles.dropdownContent}>
                  {providers.map((provider) => (
                    <TouchableOpacity
                      key={provider.id}
                      style={styles.providerItem}
                      onPress={() => {
                        onSelect(provider);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <View style={styles.providerIcon} />
                      <Text style={styles.providerName}>{provider.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={onClose}
            >
              <Text
                style={styles.continueButtonText}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#000",
  },
  dropdownTrigger: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    position: 'relative',
    zIndex: 100,
  },
  dropdownText: {
    fontSize: 16,
    color: "#666",
  },
  dropdownValue: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownContent: {
    marginTop: 8,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
    position: 'absolute',
    top: 64,
    left: 0,
    width: '100%',
    zIndex: 1000,
  },
  providerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "white",
  },
  providerIcon: {
    width: 32,
    height: 32,
    backgroundColor: "#F3F4F6",
    borderRadius: 6,
    marginRight: 10,
  },
  providerName: {
    fontSize: 16,
    color: "#000",
  },
  continueButton: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#2C73FF',
    marginTop: 28,
  },
  continueButtonText: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '100%',
    color: '#FFFFFF',
    textAlign: 'center',
  }
});

export default SelectProviderModal;
