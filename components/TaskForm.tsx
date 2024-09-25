import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function TaskForm({ onSubmit, initialTask, subjectId  }) {
  const [taskName, setTaskName] = useState(initialTask?.taskName || '');
  const [taskDescription, setTaskDescription] = useState(initialTask?.taskDescription || '');

  useEffect(() => {
    if (initialTask) {
      setTaskName(initialTask.taskName || '');
      setTaskDescription(initialTask.taskDescription || '');
    }
  }, [initialTask]);

  const handleSubmit = () => {
    const task = {
      id: initialTask?.id || Date.now().toString(),
      taskName,
      taskDescription,
      subjectId: initialTask?.subjectId || subjectId,
    };
    onSubmit(task);
    setTaskName('');
    setTaskDescription('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la tarea"
        value={taskName}
        onChangeText={setTaskName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción de la tarea"
        value={taskDescription}
        onChangeText={setTaskDescription}
      />
      <TouchableOpacity style={styles.closeButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>{initialTask ? "Actualizar Tarea" : "Agregar Tarea"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  closeButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

