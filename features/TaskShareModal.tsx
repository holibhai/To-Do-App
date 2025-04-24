import { View, Text, Modal, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';

interface TaskShareModalProps {
  isVisible: boolean;
  onVisibilityChange: Dispatch<SetStateAction<boolean>>;
  onShare: (platform: string, taskId: number | null) => void;
  selectedTaskId: number | null;
}

const TaskShareModal: React.FC<TaskShareModalProps> = ({
  isVisible,
  onVisibilityChange,
  onShare,
  selectedTaskId,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={() => onVisibilityChange(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => onShare('clipboard', selectedTaskId)}
            >
              <Image style={styles.icon} source={require('../assets/copy.png')} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => onShare('vk', selectedTaskId)}
            >
              <Image style={styles.icon} source={require('../assets/vk.png')} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => onShare('telegram', selectedTaskId)}
            >
              <Image style={styles.icon} source={require('../assets/telegram.png')} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => onShare('whatsapp', selectedTaskId)}
            >
              <Image style={styles.icon} source={require('../assets/whatsapp.png')} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => onShare('facebook', selectedTaskId)}
            >
              <Image style={styles.iconFacebook} source={require('../assets/facebook.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TaskShareModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#070707',
    opacity: 0.89,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1B1A17',
    alignItems: 'center',
    width: 360,
    height: 76,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingTop: 14,
    paddingRight: 20,
    paddingBottom: 14,
    paddingLeft: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  shareButton: {
    width: 48,
    height: 48,
    backgroundColor: '#23221F',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 21,
    height: 'auto',
    padding: 0,
    aspectRatio: 0.9,
  },
  iconFacebook: {
    width: 21,
    height: 21,
    padding: 0,
    aspectRatio: 0.5,
  },
});
