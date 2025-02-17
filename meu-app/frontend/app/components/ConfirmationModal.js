import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ConfirmationModal = ({ visible, onClose, onConfirm, title, message }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.iconContainer}>
            <View style={styles.warningIcon}>
              <Text style={styles.warningText}>!</Text>
            </View>
          </View>
          
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{message}</Text>
          
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={onConfirm}
          >
            <Text style={styles.confirmText}>Confirmar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}
          >
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#FDFDFD',
    borderRadius: 24,
    padding: 24,
    width: 352,  
    height: '35%', 
    alignItems: 'center',
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  warningIcon: {
    backgroundColor: '#F5A623', 
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 20,
    color: '#282828',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalText: {
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
    color: '#5E5D5C',
    marginBottom: 24,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#7A98FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
    width: '100%',
    marginBottom: 12,
  },
  confirmText: {
    color: '#FDFDFD',
    fontFamily: 'Urbanist_700Bold',
    fontSize: 16,
    textAlign: 'center',
  },
  cancelButton: {
    paddingVertical: 8,
  },
  cancelText: {
    color: '#5E5D5C',
    fontFamily: 'Urbanist_700Bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ConfirmationModal;

