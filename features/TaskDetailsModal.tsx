import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import { Todo } from '../type/types.ts';

interface TaskDetailModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  taskId: number | null;
  taskList: Todo[];
  onToggleComplete: (id: number | null) => void;
}

const TaskDetailsModal: React.FC<TaskDetailModalProps> = ({
  visible,
  setVisible,
  taskId,
  taskList,
  onToggleComplete,
}) => {
  const task = taskList.find((t) => t.id === taskId);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {task && (
            <>
              <Text style={styles.text}>Task: {task.title}</Text>
              <Text style={styles.text}>About: {task.about}</Text>

              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => onToggleComplete(taskId)}>
                  {!task.completed ? (
                    <View style={styles.row}>
                      <Text style={styles.markText}>Mark as Finish</Text>
                      <Image source={require('../assets/square.png')} style={styles.checkIcon} />
                    </View>
                  ) : (
                    <View style={styles.row}>
                      <Text style={styles.markText}>Completed</Text>
                      <Image source={require('../assets/check.png')} style={styles.checkIcon} />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </>
          )}

          <View style={styles.closeButtonContainer}>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TaskDetailsModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1B1A17',
    padding: 20,
    paddingLeft: 40,
    alignItems: 'flex-start',
    width: 280,
    borderRadius: 4,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Roboto',
    fontWeight: '400',
    lineHeight: 22,
  },
  iconContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkIcon: {
    width: 40,
    height: 40,
    marginLeft: 8,
  },
  closeButtonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  closeButton: {
    width: 64,
    height: 24,
    backgroundColor: '#1B1A17',
    borderColor: '#FF8303',
    borderWidth: 1.5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#F0E3CA',
    fontSize: 16,
  },
  markText: {
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
