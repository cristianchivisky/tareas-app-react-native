import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';

interface SubjectFormProps {
  initialData?: { name: string; professor: string }; // Hacemos initialData opcional
  onSubmit: (data: { id: string; name: string; professor: string }) => void;
} 
export default function SubjectForm({ initialData, onSubmit }: SubjectFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [professor, setProfessor] = useState(initialData?.professor || '');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setProfessor(initialData.professor || '');
    }
  }, [initialData]);

  const handleSubmit = () => {
    const subject = {
      id: initialData?.id || Date.now().toString(),
      name,
      professor,
    };
    onSubmit(subject);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la materia"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre del profesor"
        value={professor}
        onChangeText={setProfessor}
      />
      <TouchableOpacity style={styles.closeButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>{initialData ? "Actualizar Materia" : "Agregar Materia"}</Text>
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
