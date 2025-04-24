import React, { useEffect, useState } from 'react';
import {
  Image, StyleSheet, Text, View, SafeAreaView, FlatList, Alert, Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from './type/types';
import { useTodoStore } from './store/useToDoStore';

import TaskInputSection from './features/TaskInputSection';
import TaskShareModal from './features/TaskShareModal';
import TaskEditModal from './features/TaskEditModal';
import TaskDetailsModal from './features/TaskDetailsModal';
import TaskCard from './features/TaskCard';
import TaskConfirmDeleteModal from './features/TaskConfirmDeleteModal';
import { shareTask } from './utils/shareTask';

const App: React.FC = () => {
  const todoList = useTodoStore((state) => state.todos);
  const currentId = useTodoStore((state) => state.taskId);
  const updateId = useTodoStore((state) => state.setTaskId);
  const setTodoList = useTodoStore((state) => state.setTodos);
  const insertTodo = useTodoStore((state) => state.addTodo);
  const removeTodo = useTodoStore((state) => state.deleteTodo);
  const toggleStatus = useTodoStore((state) => state.toggleComplete);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [activeTodoId, setActiveTodoId] = useState<number | null>(null);

  const [isDeleteVisible, setDeleteVisible] = useState(false);
  const [isInfoVisible, setInfoVisible] = useState(false);
  const [isShareVisible, setShareVisible] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      await fetchStoredTodos();
      await fetchStoredId();
      setIsLoading(false);
    };
    initializeData();
  }, []);

  const fetchStoredTodos = async () => {
    const stored = await AsyncStorage.getItem('todos');
    if (stored) setTodoList(JSON.parse(stored));
  };

  const fetchStoredId = async () => {
    const storedId = await AsyncStorage.getItem('taskId');
    if (storedId) updateId(parseInt(storedId));
  };

  const createNewTodo = () => {
    if (!taskTitle.trim()) {
      Alert.alert("Missing Title", "Please enter a task title before adding.");
      return;
    }

    const newEntry: Todo = {
      id: currentId,
      created: Date.now(),
      title: taskTitle.trim(),
      about: taskDescription.trim(),
      completed: false,
    };

    insertTodo(newEntry);
    setTaskTitle('');
    setTaskDescription('');
  };

  const handleAddTask = () => {
    updateId(currentId + 1);
    createNewTodo();
    Keyboard.dismiss();
  };

  const handleDelete = (id: number) => {
    removeTodo(id);
    setActiveTodoId(null);
  };

  const confirmEdit = () => {
    if (activeTodoId !== null) {
      const originalTask = todoList.find(todo => todo.id === activeTodoId);
      if (originalTask && (originalTask.title !== taskTitle || originalTask.about !== taskDescription)) {
        const updatedList = todoList.map(todo =>
          todo.id === activeTodoId ? { ...todo, title: taskTitle, about: taskDescription } : todo
        );
        setTodoList(updatedList);
      }
      setEditVisible(false);
      setTaskTitle('');
      setTaskDescription('');
      setActiveTodoId(null);
    }
  };

  const renderTaskItem = ({ item }: { item: Todo }) => (
    <TaskCard
      item={item}
      onTaskDelete={() => {
        setActiveTodoId(item.id);
        setDeleteVisible(true);
      }}
      onTaskPress={() => {
        setActiveTodoId((prevId) => (prevId === item.id ? null : item.id));
      }}
      onTaskShare={() => {
        setActiveTodoId(item.id);
        setShareVisible(true);
      }}
      onTaskInfo={() => {
        setActiveTodoId(item.id);
        setInfoVisible(true);
      }}
      onTaskEdit={() => {
        setTaskTitle(item.title);
        setTaskDescription(item.about);
        setActiveTodoId(item.id);
        setEditVisible(true);
      }}
      selectedID={activeTodoId}
    />
  );

  const TaskList = () => (
    <FlatList
      data={todoList}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderTaskItem}
      contentContainerStyle={{ padding: 10, paddingTop: 20 }}
      style={styles.item}
      ListEmptyComponent={
        <View style={styles.noTaskImage}>
          <Image source={require('./assets/noTask.png')} />
        </View>
      }
      keyboardShouldPersistTaps="handled"
    />
  );

  return (
    <SafeAreaView style={styles.view}>
      <TaskInputSection
        taskTitle={taskTitle}
        taskDescription={taskDescription}
        onTitleChange={setTaskTitle}
        onDescriptionChange={setTaskDescription}
        onTaskSubmit={handleAddTask}
      />

      {isLoading ? (
        <View style={styles.noTaskImage}>
          <Text style={{ color: 'white' }}>Loading tasks...</Text>
        </View>
      ) : (
        <TaskList />
      )}

      <TaskConfirmDeleteModal
        visible={isDeleteVisible}
        setVisible={setDeleteVisible}
        taskId={activeTodoId}
        onDeleteTask={handleDelete}
      />

      <TaskShareModal
        isVisible={isShareVisible}
        onVisibilityChange={setShareVisible}
        onShare={(platform) => {
          shareTask(platform, activeTodoId, todoList, setShareVisible);
          setActiveTodoId(null);
        }}
        selectedTaskId={activeTodoId}
      />

      <TaskDetailsModal
        visible={isInfoVisible}
        setVisible={setInfoVisible}
        taskList={todoList}
        taskId={activeTodoId}
        onToggleComplete={() => {
          if (activeTodoId !== null) toggleStatus(activeTodoId);
        }}
      />

      <TaskEditModal
        visible={isEditVisible}
        setVisible={setEditVisible}
        currentTitle={taskTitle}
        currentDescription={taskDescription}
        setTitle={setTaskTitle}
        setDescription={setTaskDescription}
        onConfirmEdit={confirmEdit}
        resetSelectedId={setActiveTodoId}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#1F1E1B',
    height: '100%',
    padding: 5,
    paddingTop: 20,
  },
  item: {
    width: '100%',
  },
  noTaskImage: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 30,
  },
});
