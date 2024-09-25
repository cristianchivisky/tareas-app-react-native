import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Modal, Alert, TouchableOpacity, Image } from 'react-native';
import SubjectForm from '../components/SubjectForm';
import TaskForm from '../components/TaskForm';
import AsyncStorageService from '../data/AsyncStorageService';


export default function HomeScreen() {
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isSubjectModalVisible, setIsSubjectModalVisible] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false); 
  const [currentSubjectId, setCurrentSubjectId] = useState(null);

  useEffect(() => {
    loadSubjects();
    loadTasks()
  }, []);

  const loadSubjects = async () => {
    const storedSubjects = await AsyncStorageService.getSubjects();
    setSubjects(storedSubjects);
  };
  const loadTasks = async () => {
    const storedTasks = await AsyncStorageService.getTasks();
    setTasks(storedTasks);
  };

  const handleEditSubject = (subject) => {
    setCurrentSubject(subject);
    setIsSubjectModalVisible(true);
  };
  
  const handleAddSubject = () => {
    setCurrentSubject(null);
    setIsSubjectModalVisible(true);
  };
  
  const handleEditTask = (task) => {
    setCurrentTask(task);
    setIsTaskModalVisible(true);
  };
  
  const handleAddTask = (subjectId) => {
    setCurrentTask(null);
    setIsTaskModalVisible(true);
    setCurrentSubjectId(subjectId);
  };
  
  const closeModal = () => {
    setIsSubjectModalVisible(false);
    setIsTaskModalVisible(false);
    setCurrentSubject(null);
    setCurrentTask(null);
  };

  
  const handleDeleteSubject = (id) => {
    Alert.alert('Eliminar Materia', '¿Está seguro que quiere eliminar esta materia?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        onPress: async () => {
          await AsyncStorageService.deleteSubject(id);
          loadSubjects();
          loadTasks();
        },
      },
    ]);
  };

  const handleDeleteTask = (id) => {
    Alert.alert('Eliminar Tarea', '¿Está seguro que quiere eliminar esta tarea?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        onPress: async () => {
          await AsyncStorageService.deleteTask(id);
          loadTasks();
        },
      },
    ]);
  };

  const handleSubmitSubject = async (data) => {
    if (currentSubject) {
      await AsyncStorageService.editSubject(currentSubject.id, data);
    } else {
      await AsyncStorageService.saveSubject(data);
    }
    loadSubjects(); // Refrescar la lista de materias
    closeModal();
  };

  const handleSubmitTask = async (data) => {
    if (currentTask?.id) {
      await AsyncStorageService.editTask(currentTask.id, data);
    } else {
      await AsyncStorageService.saveTask({ ...data, subjectId: currentSubjectId });
    }
    loadTasks(); // Refrescar la lista de tareas
    closeModal();
  };
  
  const renderSubject = ({ item }) => (
    <View style={styles.subjectContainer}>
      <TouchableOpacity onPress={() => setSelectedSubject(selectedSubject === item.id ? null : item.id)}>
        <Text style={styles.subjectTitle}>{item.name}</Text>
        <Text style={styles.subjectText}>{item.professor}</Text>
      </TouchableOpacity>
      {selectedSubject !== item.id && (
        <View style={styles.subjectActions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleEditSubject(item)}>
            <Image source={require('../assets/icons/pencil.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleDeleteSubject(item.id)}>
            <Image source={require('../assets/icons/trash.png')} style={styles.iconTrash} />
          </TouchableOpacity>
        </View>
      )}
      {selectedSubject === item.id && (
        <View>
          <FlatList
            data={tasks.filter(task => task.subjectId === selectedSubject)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.taskContainer}>
                <Text style={styles.taskTitle}>{item.taskName}</Text>
                <Text style={styles.taskText}>{item.taskDescription}</Text>
                <View style={styles.taskActions}>
                  <TouchableOpacity style={styles.actionButton} onPress={() => handleEditTask(item)}>
                    <Image source={require('../assets/icons/pencil.png')} style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton} onPress={() => handleDeleteTask(item.id)}>
                    <Image source={require('../assets/icons/trash.png')} style={styles.iconTrash} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <TouchableOpacity style={styles.addButton} onPress={() => handleAddTask(item.id)}>
            <Text style={styles.addButtonText}>Agregar Tarea</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Administrador de Tareas</Text>
      <FlatList
        data={subjects}
        renderItem={renderSubject}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          <TouchableOpacity style={styles.addButton} onPress={handleAddSubject}>
            <Text style={styles.addButtonText}>Agregar Materia</Text>
          </TouchableOpacity>
        }
      />
      {/* Modal para agregar/editar materias */}
      <Modal
        visible={isSubjectModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <SubjectForm 
              initialData={currentSubject} 
              onSubmit={handleSubmitSubject}
            />
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.addButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Modal para agregar/editar tareas */}
      <Modal
        visible={isTaskModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TaskForm 
              initialTask={currentTask} 
              onSubmit={handleSubmitTask}
            />
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.addButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },
  subjectContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 5,
    padding: 16,
    elevation: 3,
  },

  subjectText: {
    color: '#666',
    marginBottom: 5,
    fontSize: 14,
  },
  subjectActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  taskActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 4,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'blue',
  },
  iconTrash: {
    width: 26,
    height: 26,
    tintColor: 'red',
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
  },
  taskContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginTop: 8,
    padding: 8,
    elevation: 2,
  },
  taskText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  subjectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  taskTitle: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  roundedButton: {
    backgroundColor: '#28a745', // Color de fondo del botón
    width: 60, // Ancho del botón
    height: 60, // Alto del botón
    borderRadius: 30, // Hace que el botón sea redondo
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
    left: 10, // Distancia desde el borde izquierdo
    bottom: 10, // Distancia desde el borde inferior (ajusta según necesidad)
    marginTop: 20,
  },
  roundedButtonText: {
    color: '#fff', // Color del texto
    fontSize: 30, // Tamaño del texto
  },
});
