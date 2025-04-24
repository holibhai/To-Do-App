import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';

interface DeleteConfirmationModalProps {
  visible: boolean | undefined;
  setVisible: Dispatch<SetStateAction<boolean>>;
  taskId: number | null;
  onDeleteTask: (id: number) => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  visible,
  setVisible,
  taskId,
  onDeleteTask,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.confirmText}>Delete this task?</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              onPress={() => {
                if (taskId !== null) onDeleteTask(taskId);
                setVisible(false);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteConfirmationModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#070707',
    opacity: 0.89,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#1B1A17',
    padding: 20,
    borderRadius: 4,
    alignItems: 'center',
    borderTopWidth: 2,
    borderColor: '#FF8303',
    width: 281,
    height: 143,
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'Roboto',
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    width: 64,
    height: 24,
    backgroundColor: '#1B1A17',
    borderColor: '#FF8303',
    borderWidth: 1.5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#F0E3CA',
    fontSize: 16,
  },
});
