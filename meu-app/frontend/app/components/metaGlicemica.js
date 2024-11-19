import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, KeyboardAvoidingView, Platform } from 'react-native';
import data from './slidesInfoDiabetes'; // Substitua pelo caminho correto do seu arquivo

const MetaGlicemicaScreen = () => {
  const metaGlicemica = data.find((item) => item.id === '3'); // Busca o item com id: '3'

  const [valores, setValores] = useState({ minimo: '', ideal: '', maximo: '' });

  const handleChange = (key, value) => {
    setValores({ ...valores, [key]: value });
  };

  const handleSave = () => {
    // API
    console.log('/', valores);
  };

  const text = [
        {id:'1', text: 'Em jejum'},
        {id: '2', text: 'Pré-Refeição'},
        {id: '3', text: 'Pós-Refeição'},
        {id: '4', text: 'Noturno'},
    ];

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{metaGlicemica.title}</Text>
        {metaGlicemica.description && <Text style={styles.description}>{metaGlicemica.description}</Text>}
      </View>

      {/* Inputs */}
      {text.map((item, index) => (
      <View key={item.id} style={styles.inputSet}>
        <View style={styles.inputsNumbers}>
            <View style={styles.textContainer}>
                <Text style={styles.textGroup}>
                {item.text}
                </Text>
            </View>

            <View style={styles.inputContainer}>
              {index === 0 && (
                <View style={styles.labelGroup}>
                  <Text style={styles.inputLabel}>Min</Text>
                  <Text style={styles.inputLabel}>Ideal</Text>
                  <Text style={styles.inputLabel}>Máx</Text>
                </View>
                )}
              <View style={styles.inputGroup}>
                  <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={valores.minimo}
                  onChangeText={(value) => handleChange('minimo', value)}
                  placeholder="-"
                  placeholderTextColor="#B1B0AF"
                  />  
              </View>
          
              <View style={styles.inputGroup}>
                  <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={valores.ideal}
                  onChangeText={(value) => handleChange('ideal', value)}
                  placeholder="-"
                  placeholderTextColor="#B1B0AF"
                  />
              </View>

              <View style={styles.inputGroup}>
                  <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={valores.maximo}
                  onChangeText={(value) => handleChange('maximo', value)}
                  placeholder="-"
                  placeholderTextColor="#B1B0AF"
                  />
              </View>
            </View>
        </View>
      </View>
      ))}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 352,
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 24,
    
  },
  inputContainer: {
    flexDirection:"row",
    gap: 8
  },
  header: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    alignSelf: 'stretch'
  },
  title: {
    color: "#282828",
    fontFamily: "Urbanist_700Bold",
    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 22,
  },
  description: {
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
    color: '#282828',
    lineHeight: 21,
    textAlign: 'left',
  },
  textGroup: {
    color: '#282828',
    fontFamily: 'Urbanist_400Regular',
    fontSize: 16,
    lineHeight: 17.6,
    alignItems: "center",
  },
  textContainer: {
    paddingTop: 30,
  },
  inputsNumbers: {
    flexDirection: 'row', // Itens dispostos lado a lado
    gap: 8, // Espaçamento entre os itens 
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inputGroup: {
    gap: 16,
    flexDirection: 'column',
  },
  inputLabel: {
    fontSize: 12,
    fontFamily: 'Lato_700Bold',
    lineHeight: 16,
    textAlign: 'center',
  },
  input: {
    width: 56,
    height: 40,
    textAlign: 'center',
    backgroundColor: '#FDFDFD', // Cor de fundo
    borderRadius: 8, // Raio de borda
    shadowColor: 'rgba(15, 15, 15, 0.12)', // Cor da sombra para iOS
    shadowOffset: { width: 0, height: 1 }, // Deslocamento da sombra para iOS
    shadowOpacity: 1, // Opacidade da sombra para iOS
    shadowRadius: 1, // Raio da sombra para iOS
    elevation: 5, // Elevação da sombra para Android
  },
  buttonContainer: {
    marginTop: 20,
  },
  inputSet: {
    width: '100%',  // Garante que o inputSet ocupe toda a largura
    flexDirection: 'column', // Organiza os inputs na coluna
    gap: 24, // Espaçamento entre os grupos de inputs
    alignItems: 'flex-start',  // Alinha os grupos de inputs à esquerda
  },
});

export default MetaGlicemicaScreen;
