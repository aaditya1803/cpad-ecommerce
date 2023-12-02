import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { app } from '../firebaseConfig.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// import auth from '@react-native-firebase/auth';

export const Signup = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const { username, password } = data;
            const auth = getAuth()
            await createUserWithEmailAndPassword(auth, username, password);
            console.log('User signed up successfully!');
            navigation.navigate('Products');
        } catch (error) {
            console.error('Error signing up:', error.message);
        }
    };
    const onLogin = async (data) => {
        try {
            // const { username, password } = data;
            // const auth = getAuth()
            // await signInWithEmailAndPassword(auth, username, password);
            // console.log('User signed up successfully!');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error signing up:', error.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text>Signup Page: Enter your email id and password</Text>
            <Controller
                control={control}
                render={({ field }) => (
                    <TextInput
                        placeholder="Username"
                        onChangeText={text => field.onChange(text)}
                        value={field.value}
                    />
                )}
                name="username"
                rules={{ required: 'Username is required' }}
            />
            {/* {errors.username && <Text>{errors.username.message}</Text>} */}
            <Controller
                control={control}
                render={({ field }) => (
                    <TextInput
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={text => field.onChange(text)}
                        value={field.value}
                    />
                )}
                name="password"
                rules={{ required: 'Password is required' }}
            />
            {/* {errors.password && <Text>{errors.password.message}</Text>} */}
            <Button title="Sign Up" onPress={() => handleSubmit(onSubmit)()} />
            <Button title="Already a user? Login" onPress={onLogin} />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
});

// export default Signup;
