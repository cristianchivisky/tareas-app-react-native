import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageService = {
  async saveSubject(subject) {
    const subjects = await this.getSubjects();
    const newSubjects = subjects ? [...subjects, { ...subject, id: Date.now().toString() }] : [{ ...subject, id: Date.now().toString() }];
    await AsyncStorage.setItem('subjects', JSON.stringify(newSubjects));
  },

  async getSubjects() {
    const subjects = await AsyncStorage.getItem('subjects');
    return subjects ? JSON.parse(subjects) : [];
  },

  async editSubject(id, updatedSubject) {
    const subjects = await this.getSubjects();
    const updatedSubjects = subjects.map((subject) =>
      subject.id === id ? { ...subject, ...updatedSubject } : subject
    );
    await AsyncStorage.setItem('subjects', JSON.stringify(updatedSubjects));
  },

  async deleteSubject(id) {
    const subjects = await this.getSubjects();
    const updatedSubjects = subjects.filter((subject) => subject.id !== id);
    await AsyncStorage.setItem('subjects', JSON.stringify(updatedSubjects));
    
    // Also remove all tasks associated with this subject
    const tasks = await this.getTasks();
    const updatedTasks = tasks.filter((task) => task.subjectId !== id);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  },

  async saveTask(task) {
    const tasks = await this.getTasks();
    const newTasks = tasks ? [...tasks, { ...task, id: Date.now().toString() }] : [{ ...task, id: Date.now().toString() }];
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
  },

  async getTasks() {
    const tasks = await AsyncStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  },

  async getTasksBySubject(subjectId) {
    const tasks = await this.getTasks();
    return tasks.filter((task) => task.subjectId === subjectId);
  },

  async editTask(id, updatedTask) {
    const tasks = await this.getTasks();
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...updatedTask } : task
    );
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  },

  async deleteTask(id) {
    const tasks = await this.getTasks();
    const updatedTasks = tasks.filter((task) => task.id !== id);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  },

  async clearData() {
    await AsyncStorage.clear();
  },
};

export default AsyncStorageService;
