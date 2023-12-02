import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
// import auth from '@react-native-firebase/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export const Login = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const { username, password } = data;
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, username, password);
            navigation.navigate('Products');
            console.log('User logged in successfully!');
        } catch (error) {
            console.error('Error logging in:', error.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text>Login Page</Text>
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
            <Button title="Login" onPress={handleSubmit(onSubmit)} />
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

// export default Login;
