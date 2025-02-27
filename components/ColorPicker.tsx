import React from 'react';
import { View, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Check } from 'lucide-react-native';

interface ColorPickerProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onSelectColor,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Colors that work well in both light and dark mode
  const colors = [
    '#4A90E2', // Blue
    '#50C878', // Green
    '#FF6B6B', // Red
    '#FFD700', // Yellow
    '#9370DB', // Purple
    '#FF8C00', // Orange
    '#20B2AA', // Teal
    '#FF69B4', // Pink
    '#778899', // Slate
    '#8B4513', // Brown
    '#2E8B57', // Sea Green
    '#4682B4', // Steel Blue
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[
          styles.colorNone,
          { borderColor: isDark ? '#444444' : '#DDDDDD' },
          !selectedColor && styles.selectedColor
        ]}
        onPress={() => onSelectColor('')}
      >
        {!selectedColor && (
          <Check size={20} color={isDark ? '#FFFFFF' : '#000000'} />
        )}
      </TouchableOpacity>
      
      {colors.map(color => (
        <TouchableOpacity
          key={color}
          style={[
            styles.colorItem,
            { backgroundColor: color },
            selectedColor === color && styles.selectedColor
          ]}
          onPress={() => onSelectColor(color)}
        >
          {selectedColor === color && (
            <Check size={20} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  colorItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorNone: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});