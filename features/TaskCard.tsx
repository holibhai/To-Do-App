import { StyleSheet, Text, View, Pressable, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Todo } from '../type/types';

interface TaskCardProps {
  item: Todo;
  selectedID: number | null;
  onTaskPress: (id: number) => void;
  onTaskShare: (id: number) => void;
  onTaskInfo: (id: number) => void;
  onTaskEdit: (id: number) => void;
  onTaskDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  item,
  selectedID,
  onTaskPress,
  onTaskEdit,
  onTaskInfo,
  onTaskShare,
  onTaskDelete,
}) => {
  return (
    <View style={styles.taskWrapper}>
      <View style={styles.taskRow}>
        <Pressable onPress={() => onTaskPress(item.id)} style={styles.taskTextContainer}>
          <Text
            style={[
              styles.taskTitle,
              {
                textDecorationLine: item.completed ? 'line-through' : 'none',
                color: item.completed ? 'gray' : '#F0E3CA',
              },
            ]}
          >
            {item.title}
          </Text>

          <Text
            style={[
              styles.taskDescription,
              {
                textDecorationLine: item.completed ? 'line-through' : 'none',
                color: item.completed ? 'gray' : '#F0E3CA',
              },
            ]}
          >
            {item.about}
          </Text>
        </Pressable>

        <TouchableOpacity onPress={() => onTaskDelete(item.id)} style={styles.deleteButton}>
          <Image source={require('../assets/close.png')} style={styles.deleteIcon} />
        </TouchableOpacity>
      </View>

      {selectedID === item.id && (
        <View style={styles.actionsRow}>
          <TouchableOpacity onPress={() => onTaskShare(item.id)}>
            <Image source={require('../assets/share.png')} style={styles.actionIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onTaskInfo(item.id)}>
            <Image source={require('../assets/info.png')} style={styles.actionIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onTaskEdit(item.id)}>
            <Image source={require('../assets/edit.png')} style={styles.actionIcon} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  taskWrapper: {
    flexDirection: 'column',
    width: '100%',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: '#FF8303',
    borderWidth: 2,
    backgroundColor: '#242320',
    marginBottom: 5,
    borderRadius: 8,
    width: '100%',
    padding: 16,
    paddingRight: 10,
  },
  taskTextContainer: {
    borderRadius: 8,
    flex: 2,
    width: 265,
    paddingVertical: 0,
  },
  taskTitle: {
    fontSize: 22,
    color: '#F0E3CA',
    fontWeight: '500',
    fontFamily: 'Roboto',
  },
  taskDescription: {
    fontSize: 14,
    color: '#F0E3CA',
    fontFamily: 'Roboto',
  },
  deleteButton: {
    backgroundColor: '#FF8303',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  deleteIcon: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#1B1A17',
    borderColor: '#A35709',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
    gap: 5,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A35709',
  },
});
