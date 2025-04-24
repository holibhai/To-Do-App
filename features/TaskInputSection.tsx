import React, { Dispatch, SetStateAction } from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

interface TaskInputSectionProps {
  taskTitle: string;
  taskDescription: string;
  onTitleChange: Dispatch<SetStateAction<string>>;
  onDescriptionChange: Dispatch<SetStateAction<string>>;
  onTaskSubmit: () => void;
}

const TaskInputSection: React.FC<TaskInputSectionProps> = ({
  taskTitle,
  taskDescription,
  onTitleChange,
  onDescriptionChange,
  onTaskSubmit,
}) => {
  return (
    <View style={styles.inputWrapper}>
      <View style={styles.inputs}>
        <TextInput
          placeholder="Title..."
          placeholderTextColor="#AAA"
          style={styles.textInput}
          value={taskTitle}
          onChangeText={onTitleChange}
        />
        <TextInput
          placeholder="Description..."
          placeholderTextColor="#F0E3CAA3"
          style={styles.textInput}
          value={taskDescription}
          onChangeText={onDescriptionChange}
        />
      </View>

      <TouchableOpacity
        onPress={onTaskSubmit}
        disabled={!taskTitle.trim()}
        style={styles.submitButton}
      >
        <Image source={require('../assets/plus.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default TaskInputSection;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5,
    paddingTop: 20
  },
  inputs: {
    flex: 1,
  },
  textInput: {
  color: '#FFFFFF',
  backgroundColor: '#1F1E1B',
  borderColor: '#FF8303',
  borderWidth: 1.5,
  paddingLeft: 10,
  paddingVertical: 4, 
  fontSize: 16,
  borderRadius: 8,
  width: 295,
  fontFamily: 'Roboto',
  marginBottom: 4,
  height: 42, 
},

  submitButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    borderColor: '#FF8303',
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 2,
  },
});
