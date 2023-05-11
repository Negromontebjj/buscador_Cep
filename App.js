import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard } from 'react-native';
import api from './src/services/api';

// import { Container } from './styles';

export default function buscador_Cep() {
  const [cep, setCep] = useState('')
  const [cepUser, setCepUser] = useState(null)

  const inputRef = useRef(null)

  async function buscar() {
    if (cep === '') {
      alert('Digite um CEP valido!');
      setCep('');
      return;
    }

    try {
      const response = await api.get(`/${cep}/json`)
      console.log(response.data);
      setCepUser(response.data)
      Keyboard.dismiss(); // Garantir que o teclado será fechado após a busca
    } catch (error) {
      console.log('Erro :' + error)
    }





  }


  function limpar() {
    setCep('');
    inputRef.current.focus();
    setCepUser(null);
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.text}>Digite o CEP desejado:</Text>
        <TextInput
          style={styles.input}
          placeholder='Ex: 00000000'
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          keyboardType='numeric'
          ref={inputRef}
        />
      </View>

      <View style={styles.areaBTN}>
        <TouchableOpacity style={[styles.Botao, { backgroundColor: '#1d57cd' }]} onPress={buscar}>
          <Text style={styles.textBTN}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.Botao, { backgroundColor: '#ff0000' }]} onPress={limpar}>
          <Text style={styles.textBTN}>Limpar</Text>
        </TouchableOpacity>
      </View>


      {cepUser &&
        <View style={styles.resultado}>
          <Text style={styles.itemText}> Cep: {cepUser.cep}</Text>
          <Text style={styles.itemText}> Logadouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemText}> Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemText}> Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemText}> Estado: {cepUser.uf}</Text>
          <Text style={styles.itemText}> DDD Local : {cepUser.ddd}</Text>
        </View>

      }

    </SafeAreaView>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  text: {
    fontSize: 30,
    color: '#000',
    marginTop: 25,
    marginBottom: 15
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    width: '80%',
    padding: 10,
    borderColor: '#DDD',
    margin: 10,
    fontSize: 18,
    backgroundColor: '#fff'
  },
  areaBTN: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'

  },
  textBTN: {
    color: '#fff',
    fontSize: 20,
    justifyContent: 'center',
    fontWeight: 'bold'

  },
  Botao: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 110,
    alignItems: 'center',
    padding: 10,
    borderRadius: 7
  },
  resultado: {
    flex: .6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 55,
    
  },
  itemText: {
    fontSize: 25,
    color: '#1d57cd'
  }
})
