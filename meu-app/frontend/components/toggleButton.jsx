import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ToggleButton = () => {
  const [activeTab, setActiveTab] = useState('active');

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={styles.tabText}>Paciente</Text>
        </TouchableOpacity>
        <View className="w-[1px] bg-[#AFB1B6]" />
        <TouchableOpacity
          style={[styles.tab, activeTab === 'inactive' && styles.activeTab]}
          onPress={() => setActiveTab('inactive')}
        >
          <Text style={styles.tabText}>Médico</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 40,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: "#AFB1B6",
    borderRadius: 30, // Bordas arredondadas no container
    overflow: 'hidden', // Garante que as bordas arredondadas se apliquem corretamente
  },
  tabContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  tab: {
    flex: 1,
    padding: 10,
    backgroundColor: '#EFEFF0',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    color: 'black',
  },
});

export default ToggleButton;
