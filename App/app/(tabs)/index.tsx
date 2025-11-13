import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';

export default function HomeScreen() {
  const [current, setCurrent] = useState('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const [history, setHistory] = useState(''); // ← Histórico de entrada

  const handleNumber = (num: string) => {
    if (current === '0') setCurrent(num);
    else setCurrent(current + num);

    setHistory(prev => prev + num); // Atualiza histórico
  };

  const handleOperator = (op: string) => {
    setOperator(op);
    setPrevious(current);
    setCurrent('0');

    setHistory(prev => prev + ' ' + op + ' '); // Adiciona operador no histórico
  };

  const handleEquals = () => {
    if (!operator || !previous) return;

    const prev = parseFloat(previous);
    const curr = parseFloat(current);
    let result = 0;

    switch (operator) {
      case '+':
        result = prev + curr;
        break;
      case '-':
        result = prev - curr;
        break;
      case '×':
        result = prev * curr;
        break;
      case '÷':
        result = curr !== 0 ? prev / curr : 0;
        break;
    }

    setCurrent(result.toString());
    setOperator(null);
    setPrevious(null);
    setHistory(''); // Limpa histórico após calcular
  };

  const handleClear = () => {
    setCurrent('0');
    setPrevious(null);
    setOperator(null);
    setHistory('');
  };

  // Função para renderizar botões com key única
  const renderButton = (label: string, onPress: () => void, style?: any) => (
    <Pressable key={label} onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Display */}
      <View style={styles.display}>
        <Text style={styles.historyText}>{history}</Text>
        <Text style={styles.displayText}>{current}</Text>
      </View>

      {/* Números e Operadores */}
      <View style={styles.row}>
        {['7','8','9'].map(n => renderButton(n, () => handleNumber(n)))}
        {renderButton('÷', () => handleOperator('÷'), styles.operator)}
      </View>

      <View style={styles.row}>
        {['4','5','6'].map(n => renderButton(n, () => handleNumber(n)))}
        {renderButton('×', () => handleOperator('×'), styles.operator)}
      </View>

      <View style={styles.row}>
        {['1','2','3'].map(n => renderButton(n, () => handleNumber(n)))}
        {renderButton('-', () => handleOperator('-'), styles.operator)}
      </View>

      <View style={styles.row}>
        {['0'].map(n => renderButton(n, () => handleNumber(n), styles.zero))}
        {renderButton('.', () => handleNumber('.'))}
        {renderButton('+', () => handleOperator('+'), styles.operator)}
      </View>

      <View style={styles.row}>
        {renderButton('C', handleClear, { backgroundColor: '#8b2525ff' })}
        {renderButton('=', handleEquals, styles.operator)}
      </View>


      <Text style={styles.developed}>Developed by Layo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 0,
    backgroundColor: '#000000ff',
  },
  display: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#afafafff',
    padding:10,
    marginBottom: 20,
    borderRadius: 8,
  },
  displayText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  historyText: {
    fontSize: 18,
    color: '#444444ff',
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#444444ff',
    margin: 5,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  zero: {
    flex: 2, 
  },
  operator: {
    backgroundColor: '#b46900ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 44,
    fontWeight: 'bold',
  },
  developed: {
        color: '#fff',
        textAlign: 'right',

  }
});
