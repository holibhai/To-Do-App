import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';

interface EditModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  currentTitle: string;
  currentDescription: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  onConfirmEdit: () => void;
  resetSelectedId: Dispatch<SetStateAction<number | null>>;
}

const EditModal: React.FC<EditModalProps> = ({
  visible,
  setVisible,
  currentTitle,
  currentDescription,
  setTitle,
  setDescription,
  onConfirmEdit,
  resetSelectedId,
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
          <View style={styles.formContainer}>
            <TextInput
              placeholder="Task Title..."
              placeholderTextColor="#AAA"
              style={styles.titleInput}
              value={currentTitle}
              onChangeText={setTitle}
            />
            <TextInput
              placeholder="Task Description..."
              placeholderTextColor="#AAA"
              style={styles.descriptionInput}
              value={currentDescription}
              onChangeText={setDescription}
              multiline
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  setVisible(false);
                  setTitle('');
                  setDescription('');
                  resetSelectedId(0);
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={onConfirmEdit}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#070707',
    opacity: 0.89,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#1B1A17',
    padding: 18,
    alignItems: 'center',
    width: 360,
    height: 451,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  formContainer: {
    backgroundColor: '#1B1A17',
    alignItems: 'center',
    width: 324,
    height: 415,
    gap: 8,
  },
  titleInput: {
    color: 'white',
    backgroundColor: '#242320',
    borderColor: '#A35709',
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: 14,
    borderRadius: 8,
    width: 324,
    marginBottom: 4,
    fontFamily: 'Roboto',
  },
  descriptionInput: {
    color: 'white',
    backgroundColor: '#242320',
    borderColor: '#A35709',
    borderWidth: 1,
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: 14,
    borderRadius: 8,
    width: 324,
    height: 343,
    fontFamily: 'Roboto',
    marginBottom: 4,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 5,
    width: '100%',
  },
  actionButton: {
    width: 64,
    height: 24,
    backgroundColor: '#242320',
    borderColor: '#A35709',
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#F0E3CA',
    fontSize: 16,
  },
});
