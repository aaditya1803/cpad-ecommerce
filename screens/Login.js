import React from 'react';
import { View, Text, TextInput,TouchableOpacity, Button, StyleSheet,useWindowDimensions,Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import favicon from '../assets/ecommerce.png'
// import auth from '@react-native-firebase/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export const Login = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const {height} = useWindowDimensions();

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
        <SafeAreaView style={styles.root}>
            <Text style={styles.title}>Login Page</Text>
            <Image source={favicon} style={[styles.logo,{height:height*0.3}]} resizeMode="contain" />
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
            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Login</Text>
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
        margin: 5
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 4,
        marginBottom: 8,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },

    button: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#3498db',
    },
    logo:{
        width:"80%",
        maxWidth: 300,
        maxHeight:200,
    },
});

// export default Login;
