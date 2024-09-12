import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import API_HOST from '@/constants/ApiHost';


const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_HOST['host']}/api/v1/users/login`, {
                email: username,
                password: password,
            });
            console.log('Login successful:', response.data);
            // Xử lý logic sau khi đăng nhập thành công
            const token = response.data.data.token;
            const role = response.data.data.role;
            await AsyncStorage.setItem('userToken', token);
            const storedToken = await AsyncStorage.getItem('userToken');
            if (storedToken === token && role === 2) {
                // Chuyển hướng đến màn hình lead
                router.replace('/lead');
            } else {
                throw new Error('Token storage failed');
            }
        } catch (error) {
            //console.error('Login failed:', error);
            Alert.alert('Login failed', 'Please check your email and password');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CRM</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007BFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
