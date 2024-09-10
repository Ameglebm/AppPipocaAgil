import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts, Urbanist_600SemiBold } from '@expo-google-fonts/urbanist'
import { Lato_400Regular } from '@expo-google-fonts/lato'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

function Inputs() {
    const [isChecked, setIsChecked] = useState(false);
    const [secureText, setSecureText] = useState(true);
    const [secureText2, setSecureText2] = useState(true);
    const [buttonColor, setButtonColor] = useState('#7A98FF');

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [nomeError, setNomeError] = useState('');
    const [sobrenomeError, setSobrenomeError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [cpfError, setCpfError] = useState('');
    const [senhaError, setSenhaError] = useState('');
    const [confirmarSenhaError, setConfirmarSenhaError] = useState('');

    const handlePress = () => {
        setIsChecked(prevState => {
            const newState = !prevState;
            setButtonColor(newState ? '#2F39D3' : '#7A98FF');
            return newState;
        });
    };

    const validateNome = (value) => {
        setNome(value);
        if (value.trim().length === 0) {
            setNomeError('Digite o nome.');
        } else {
            setNomeError('');
        }
    };

    const validateSobrenome = (value) => {
        setSobrenome(value);
        if (value.trim().length === 0) {
            setSobrenomeError('Digite o sobrenome.');
        } else {
            setSobrenomeError('');
        }
    };

    const validateEmail = (value) => {
        setEmail(value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError('E-mail já cadastrado. Tente novamente.');
        } else {
            setEmailError('');
        }
    };

    const validateCpf = (value) => {
        setCpf(value);
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!cpfRegex.test(value)) {
            setCpfError('CPF incorreto. Tente novamente.');
        } else {
            setCpfError('');
        }
    };

    const validateSenha = (value) => {
        setSenha(value);
        if (value.length < 8) {
            setSenhaError('A senha deve ter pelo menos 8 caracteres.');
        } else {
            setSenhaError('');
        }
    };

    const validateConfirmarSenha = (value) => {
        setConfirmarSenha(value);
        if (value !== senha) {
            setConfirmarSenhaError('Senhas não conferem. Tente novamente.');
        } else {
            setConfirmarSenhaError('');
        }
    };

    const handleSubmit = () => {
        if (!nome) setNomeError('O nome é obrigatório.');
        if (!sobrenome) setSobrenomeError('O sobrenome é obrigatório.');
        if (!email) setEmailError('E-mail é obrigatório.');
        if (!cpf) setCpfError('CPF é obrigatório.');
        if (!senha) setSenhaError('Senha é obrigatória.');
        if (!confirmarSenha) setConfirmarSenhaError('Confirmação de senha é obrigatória.');
        if (!isChecked) return Alert.alert('Erro', 'Você deve aceitar os Termos de uso.');

        if (!nomeError && !sobrenomeError && !emailError && !cpfError && !senhaError && !confirmarSenhaError) {
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        }
    };

    const [fonteLoaded] = useFonts({
        Urbanist_600SemiBold,
        Lato_400Regular
    });

    if (!fonteLoaded) {
        return null;
    }

    return (
        <View>
            <Text style={styles.label}>Nome*</Text>
            <TextInput
                placeholder='Digite seu nome'
                style={styles.inputDados}
                value={nome}
                onChangeText={validateNome}
            />
            {nomeError ? <Text style={styles.errorText}>{nomeError}</Text> : null}

            <Text style={styles.label}>Sobrenome*</Text>
            <TextInput
                placeholder='Digite seu sobrenome'
                style={styles.inputDados}
                value={sobrenome}
                onChangeText={validateSobrenome}
            />
            {sobrenomeError ? <Text style={styles.errorText}>{sobrenomeError}</Text> : null}

            <Text style={styles.label}>E-mail*</Text>
            <TextInput
                placeholder='Digite seu e-mail'
                style={styles.inputDados}
                value={email}
                onChangeText={validateEmail}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <Text style={styles.label}>CPF*</Text>
            <TextInput
                placeholder='000.000.000-00'
                style={styles.inputDados}
                value={cpf}
                onChangeText={validateCpf}
            />
            {cpfError ? <Text style={styles.errorText}>{cpfError}</Text> : null}

            <Text style={styles.label}>Senha*</Text>
            <View style={styles.senhaContainer}>
                <TextInput
                    placeholder='Digite sua senha'
                    style={styles.inputDados}
                    secureTextEntry={secureText}
                    value={senha}
                    onChangeText={validateSenha}
                />
                <TouchableOpacity
                    style={styles.iconBtn}
                    onPress={() => setSecureText(prevState => !prevState)}
                >
                    <Feather
                        name={secureText ? 'eye-off' : 'eye'}
                        size={17}
                        color="#B1B0AF"
                        style={styles.eyeIcon}
                    />
                </TouchableOpacity>
            </View>
            {senhaError ? <Text style={styles.errorText}>{senhaError}</Text> : null}

            <Text style={styles.label}>Confirmar a senha*</Text>
            <View style={styles.senhaContainer}>
                <TextInput
                    placeholder='Confirme sua senha'
                    style={styles.inputDados}
                    secureTextEntry={secureText2}
                    value={confirmarSenha}
                    onChangeText={validateConfirmarSenha}
                />
                <TouchableOpacity
                    style={styles.iconBtn}
                    onPress={() => setSecureText2(prevState => !prevState)}
                >
                    <Feather
                        name="eye-off"
                        size={17}
                        color="#B1B0AF"
                        style={styles.eyeIcon} />
                </TouchableOpacity>
            </View>
            {confirmarSenhaError ? <Text style={styles.errorText}>{confirmarSenhaError}</Text> : null}

            <TouchableOpacity style={styles.checkboxContainer} onPress={handlePress}>
                <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
                    {isChecked && <AntDesign name="check" size={16} color='#FDFDFD' />}
                </View>
                <Text style={styles.labelCheckBox}>Políticas de privacidade e Termos de uso</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btnContainer, { backgroundColor: buttonColor }]} onPress={handleSubmit}>
                <Text style={styles.txtBtn}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Inputs;

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Lato_400Regular',
        lineHeight: 19.6,
        paddingTop: 8,
        paddingBottom: 8,
        marginBottom: 8,

    },
    inputDados: {
        width: 320,
        height: 44,
        backgroundColor: '#FDFDFD',
        borderRadius: 8,
        paddingTop: 10,
        paddingRight: 14,
        paddingBottom: 10,
        paddingLeft: 14,
        marginBottom: 8,
        gap: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 1,
        elevation: 1,
    },
    senhaContainer: {
        position: 'relative',
    },
    iconBtn: {
        position: 'absolute',
        top: 14,
        right: 10,
    },
    checkboxContainer: {
        marginTop: 14,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: '#FFD3A8',
        gap: 10,
        marginRight: 8,
    },
    checkedCheckbox: {
        backgroundColor: '#FE6811',
    },
    btnContainer: {
        flexGrow: 1,
        width: 320,
        height: 42,
        borderRadius: 8,
        paddingTop: 8,
        paddingRight: 80,
        paddingBottom: 8,
        paddingLeft: 80,
        gap: 8,
        backgroundColor: '#7A98FF',
        alignItems: 'center',
        marginTop: 32,
    },
    txtBtn: {
        fontFamily:'Urbanist_600SemiBold',
        color: '#FDFDFD',
        fontSize: 18,
    },
    errorText: {
        color: '#DF353F',
        fontWeight: "500",
        marginBottom: 10
    }
});