import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginRegister() {
    const [view, setView] = useState('main');
    const [country, setCountry] = useState('Vietnam');
    const [agreed, setAgreed] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleBack = () => setView('main');
    const handleAuth = () => {
        if (view === 'login') {
            console.log('Login:', 'Username:', username, 'Password:', password);
            fetch('http://192.168.48.111:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    } else {
                        alert('Login failed');
                    }
                })
                .then(async data => {
                    console.log(data);
                    console.log('Login success');
                    await AsyncStorage.setItem('token', data.token);
                    Alert.alert('Đăng nhập thành công', 'Bạn sẽ được chuyển đến dashboard.');
                    // Note: React Native doesn't have localStorage, use AsyncStorage instead
                    // AsyncStorage.setItem('token', data.token);
                    // Navigation to dashboard should be handled differently in React Native
                    // navigation.navigate('Dashboard');
                })
                .catch(err => console.log(err));
        } else {
            console.log('Register');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {view === 'main' && (
                <View style={styles.mainView}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/logo.jpg')}
                            style={styles.logo}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => setView('login')}
                            style={styles.loginButton}
                        >
                            <Text style={styles.loginButtonText}>Đăng nhập</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setView('register')}
                            style={styles.registerButton}
                        >
                            <Text style={styles.registerButtonText}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {(view === 'login' || view === 'register') && (
                <View style={styles.authView}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <ChevronLeft color="black" size={24} />
                    </TouchableOpacity>
                    <Text style={styles.title}>{view === 'login' ? 'Đăng nhập' : 'Đăng ký'}</Text>
                    <View style={styles.inputContainer}>
                        {view === 'login' ? (
                            <>
                                <TextInput
                                    value={username}
                                    onChangeText={setUsername}
                                    placeholder="Vui lòng nhập tài khoản"
                                    style={styles.input}
                                />
                                <TextInput
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Mật khẩu"
                                    secureTextEntry
                                    style={styles.input}
                                />
                            </>
                        ) : (
                            <TextInput
                                placeholder="Số điện thoại/Email"
                                style={styles.input}
                            />
                        )}
                        <View style={styles.checkboxContainer}>
                            <TouchableOpacity
                                onPress={() => setAgreed(!agreed)}
                                style={styles.checkbox}
                            >
                                {agreed && <View style={styles.checkboxInner} />}
                            </TouchableOpacity>
                            <Text style={styles.checkboxLabel}>
                                Tôi đồng ý{' '}
                                <Text style={styles.link}>Chính sách bảo mật</Text> Và{' '}
                                <Text style={styles.link}>Đồng ý dịch vụ</Text>
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.authButton, !agreed && styles.authButtonDisabled]}
                            disabled={!agreed}
                            onPress={handleAuth}
                        >
                            <Text style={styles.authButtonText}>
                                {view === 'login' ? 'Đăng nhập' : 'Lấy mã xác minh'}
                            </Text>
                        </TouchableOpacity>
                        {view === 'login' && (
                            <TouchableOpacity>
                                <Text style={styles.forgotPassword}>Quên mật khẩu</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
    },
    mainView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 32,
    },
    logoContainer: {
        width: 176,
        height: 176,
        borderRadius: 16,
        overflow: 'hidden',
        marginTop: 48,
    },
    logo: {
        width: '100%',
        height: '100%',
        borderRadius: 88,
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 48,
    },
    loginButton: {
        width: '100%',
        padding: 12,
        backgroundColor: '#10b981',
        borderRadius: 8,
        marginBottom: 16,
    },
    loginButtonText: {
        color: 'white',
        fontWeight: '600',
        textAlign: 'center',
    },
    registerButton: {
        width: '100%',
        padding: 12,
        backgroundColor: 'white',
        borderColor: '#10b981',
        borderWidth: 1,
        borderRadius: 8,
    },
    registerButtonText: {
        color: '#10b981',
        fontWeight: '600',
        textAlign: 'center',
    },
    authView: {
        flex: 1,
        padding: 24,
        backgroundColor: 'white',
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    inputContainer: {
        gap: 16,
    },
    input: {
        width: '100%',
        padding: 12,
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 4,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxInner: {
        width: 12,
        height: 12,
        backgroundColor: '#10b981',
        borderRadius: 2,
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#4b5563',
    },
    link: {
        color: '#3b82f6',
    },
    authButton: {
        width: '100%',
        padding: 12,
        backgroundColor: '#10b981',
        borderRadius: 8,
    },
    authButtonDisabled: {
        backgroundColor: '#d1d5db',
    },
    authButtonText: {
        color: 'white',
        fontWeight: '600',
        textAlign: 'center',
    },
    forgotPassword: {
        color: '#3b82f6',
        textAlign: 'center',
    },
});