import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

function TelaCadastro() {
    return (
        <View style={styles.cadastroConatiner}>
            <View style={styles.containerTitulo}>
                <TouchableOpacity>
                    <Text style={styles.voltar}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.titulo}>Crie sua conta</Text>
            </View>
            <View style={styles.dadosContainer}>
                <Text style={styles.label}>Nome*</Text>
                <TextInput
                    placeholder='Digite seu nome'
                    style={styles.cadastroInput} />
                <Text style={styles.label}>Sobrenome*</Text>
                <TextInput
                    placeholder='Digite seu sobrenome'
                    style={styles.cadastroInput}
                />
                <Text style={styles.label}>E-mail*</Text>
                <TextInput
                    placeholder='Digite seu e-mail'
                    style={styles.cadastroInput} />
                <Text>CPF*</Text>
                <TextInput
                    placeholder='000.000.000-00'
                    keyboardType='numeric'
                    style={styles.cadastroInput}
                />
                <Text style={styles.label}>Senha*</Text>
                <TextInput
                    placeholder='Digite sua senha'
                    style={styles.cadastroInput} />
                <Text>Confirmar senha*</Text>
                <TextInput
                    placeholder='Confirme a senha'
                    style={styles.cadastroInput} />
                <View style={styles.checkContainer}>
                    <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
                    <Text>Políticas de privacidade e Termos de uso</Text>
                </View>
                <TouchableOpacity style={styles.containerBtn}>
                    <Text style={styles.btnCad}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TelaCadastro;

const styles = StyleSheet.create({
    cadastroConatiner: {
        padding: 4,
    },
    containerTitulo: {
        padding: 25,
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    titulo: {
        fontSize: 28,
    },
    voltar: {
        fontSize: 48,
    },
    dadosContainer: {
        backgroundColor: '#F4F3F3FC',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        paddingTop: 16,
        paddingRight: 20,
        paddingBottom: 16,
        paddingLeft: 20,
        gap:18
    },
    label:{
        color:'#333333',
        fontWeight:'500',
    },
    cadastroInput: {
        width: '100%',
        height: 44,
        borderRadius: 12,
        paddingTop: 10,
        paddingRight: 14,
        paddingBottom: 10,
        paddingLeft: 14,
        backgroundColor: '#FDFDFD',
    },
    checkContainer: {
        flexDirection: 'row',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#AFB1B6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderRadius: 4,
    },
    containerBtn:{
        flex:1,
        alignItems:'center',
    },
    btnCad:{
        backgroundColor:'#7A98FF',
        color:'#fff',
        width:300,
        height:42,
        borderRadius:50,
        textAlign:'center',
        fontSize:16,
        justifyContent:'center',
    }

})