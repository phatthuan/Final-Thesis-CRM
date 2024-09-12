import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, FlatList, TouchableOpacity, Button, View, TextInput, Modal } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import call from 'react-native-phone-call';
import { Icon } from 'react-native-elements';
import { Text } from '@/components/Themed';
import API_HOST from '@/constants/ApiHost';

interface Lead {
  id: string;
  title: string;
  description: string;
  leadValue: number;
  status: boolean;
  contactNumbers: string | null;
  email: string | null;
  personId: string | null;
  // Các trường khác...
}

interface Person {
  name: string;
  emails: string;
  contactNumbers: string;
  organizationId: string;
}

export default function TabOneScreen() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [newLead, setNewLead] = useState({ title: '', description: '', leadValue: 0, status: true });
  const [modalVisible, setModalVisible] = useState(false);
  const [newPerson, setNewPerson] = useState<Person>({ name: '', emails: '', contactNumbers: '', organizationId: '' });
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      const config = {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'ngrok-skip-browser-warning': 'any'
        }
      };
      const response = await axios.get(`${API_HOST['host']}/api/v1/leads`, config);
      setLeads(response.data.data);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to fetch leads');
    }
  }

  const handleAddLead = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      const config = {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        }
      };
      const response = await axios.post(`${API_HOST['host']}/api/v1/leads`, newLead, config);
      const reload = await axios.get(`${API_HOST['host']}/api/v1/leads`, config);
      setLeads(reload.data.data);
      Alert.alert('Success', 'Lead added successfully');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to add lead');
    }
  }

  const handleOpenModal = (id: string) => {
    setSelectedLeadId(id);
    setModalVisible(true);
  }

  const handleAddPerson = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      const config = {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        }
      };
      const response = await axios.post(`${API_HOST['host']}/api/v1/persons`, newPerson, config);
      const personId = response.data.data.id;

      const leadToUpdate = leads.find(lead => lead.id === selectedLeadId);
      if (leadToUpdate) {
        const updatedLead = { ...leadToUpdate, personId };
        await axios.put(`${API_HOST['host']}/api/v1/leads/${leadToUpdate.id}`, updatedLead, config);
        const response = await axios.get(`${API_HOST['host']}/api/v1/leads`, config);
        setLeads(response.data.data);
        Alert.alert('Success', 'Lead updated with new person');
      }

      setModalVisible(false);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to add person');
    }
  }

  const handleDeleteLead = async (id: string) => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      const config = {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        }
      };
      await axios.delete(`${API_HOST['host']}/api/v1/leads/${id}`, config);
      setLeads(leads.filter(lead => lead.id !== id));
      Alert.alert('Success', 'Lead deleted successfully');
    } catch (error) {
      console
      console.log(error);
      Alert.alert('Error', 'Failed to delete lead');
    }
  }

  const makeCall = (number: string) => {
    const args = {
      number: number,
      prompt: true
    };
    call(args).catch(console.error);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Lead Title"
        value={newLead.title}
        onChangeText={text => setNewLead({ ...newLead, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={newLead.description}
        onChangeText={text => setNewLead({
          ...newLead,
          description: text
        })}
      />
      <TextInput
        style={styles.input}
        placeholder="Lead Value"
        keyboardType="numeric"
        value={newLead.leadValue.toString()}
        onChangeText={text => setNewLead({ ...newLead, leadValue: parseFloat(text) || 0 })}
      />
      <Button title="Add Lead" onPress={handleAddLead} />

      <FlatList
        data={leads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.leadItem}>
            <Text style={styles.leadName}>{item.title}</Text>
            <Text style={styles.leadEmail}>Email: {item.email || 'N/A'}</Text>
            <Text style={styles.leadValue}>Value: {item.leadValue}</Text>
            <Text style={styles.leadStatus}>Status: {item.status ? 'Open' : 'Closed'}</Text>
            <Text style={styles.leadEmail}>Phone Number: {item.contactNumbers || 'N/A'}</Text>
            <TouchableOpacity onPress={() => makeCall(item.contactNumbers ? item.contactNumbers : '')}>
              <Icon
                name='phone'
                type='font-awesome'
                color='#517fa4'
                size={24}
                containerStyle={{ marginTop: 10 }}
              />
            </TouchableOpacity>

            <View style={styles.buttonGroup}>
              <Button title="Update" onPress={() => handleOpenModal(item.id)} />
              <Button title="Delete" onPress={() => handleDeleteLead(item.id)} />
            </View>
          </View>
        )}
      />

<Modal
  animationType="fade"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(!modalVisible);
  }}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalView}>
      <Text style={styles.modalTitle}>Add New Person</Text>
      <View style={styles.modalInputContainer}>
        <TextInput
          style={styles.modalInput}
          placeholder="Name"
          value={newPerson.name}
          onChangeText={text => setNewPerson({ ...newPerson, name: text })}
        />
        <TextInput
          style={styles.modalInput}
          placeholder="Email"
          value={newPerson.emails}
          onChangeText={text => setNewPerson({ ...newPerson, emails: text })}
        />
        <TextInput
          style={styles.modalInput}
          placeholder="Contact Numbers"
          value={newPerson.contactNumbers}
          onChangeText={text => setNewPerson({ ...newPerson, contactNumbers: text })}
        />
      </View>
      <View style={styles.modalButtonContainer}>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={handleAddPerson}
        >
          <Text style={styles.modalButtonText}>Add Person</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.modalButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  leadItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  leadName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  leadEmail: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,

  },
  leadValue: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  leadStatus: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInputContainer: {
    marginBottom: 15,
  },
  modalInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
