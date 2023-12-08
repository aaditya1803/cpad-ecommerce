import React from 'react';
import { View, Text, TextInput,TouchableOpacity, Button, StyleSheet } from 'react-native';
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
        <SafeAreaView style={styles.root}>
            <Text style={styles.title}>Create an account</Text>
            <Controller
                control={control}
                render={({ field }) => (
                    <TextInput
                        style={styles.input}
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
                        style={styles.input}
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
            <TouchableOpacity style={styles.button} onPress={() => handleSubmit(onSubmit)()}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Register</Text>
            </TouchableOpacity>
            <Text style={styles.text}>By registering, you confirm that you accept our <Text style={styles.link}>Terms of use </Text>and <Text style={styles.link}>Privacy Policy</Text></Text>
            <TouchableOpacity  onPress={onLogin}>
                <Text style={styles.text}>Have an account? Sign in</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root:{
        flex: 1,
        alignItems:'center',
        padding:20,
        backgroundColor:"#ccf0ef"
    },
    title:{
        fontSize:24,
        fontWeight:"bold",
        color:"#051C60",
        margin: 10
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8,
        marginBottom: 8,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    text:{
        color:"gray",
        marginVertical:10,
        fontWeight:"bold",

    },
    button: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#3498db',
    },
    link:{
        color:"#FDB075"
    }

});

// export default Signup;
