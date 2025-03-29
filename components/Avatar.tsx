import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface AvatarProps {
  uri: string | null;
  name: string;
  size?: number;
  color?: string;
  emoji?: string;
  showBorder?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  uri, 
  name, 
  size = 50, 
  color, 
  emoji,
  showBorder = true
}) => {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  const borderWidth = showBorder ? 2 : 0;

  const sizeWithBorder = size + 4;
  
  return (
    <View style={[
      styles.container, 
      { 
        width: sizeWithBorder, 
        height: sizeWithBorder, 
        borderRadius: sizeWithBorder / 2,
        borderWidth: color && showBorder ? borderWidth : 0,
        borderColor: color || 'transparent'
      }
    ]}>
      {uri ? (
        <Image 
          source={{ uri }} 
          style={{ width: size, height: size, borderRadius: size / 2 }} 
        />
      ) : (
        <View style={[
          styles.placeholder, 
          { 
            width: size, 
            height: size, 
            borderRadius: size / 2,
            backgroundColor: color ? `${color}33` : '#E1E1E1'
          }
        ]}>
          <Text style={[
            styles.initials, 
            { 
              fontSize: size * 0.4,
              color: color || '#555555'
            }
          ]}>
            {initials}
          </Text>
        </View>
      )}
      
      {emoji && (
        <View style={[
          styles.emojiBadge, 
          { 
            right: -3,
            bottom: -3,
            width: size * 0.4,
            height: size * 0.4,
            borderRadius: size * 0.2,
            backgroundColor: color ? `${color}` : '#E1E1E1'
          }
        ]}>
          <Text style={{ fontSize: size * 0.25 }}>{emoji}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'visible',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontWeight: 'bold',
  },
  emojiBadge: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1,
    //borderColor: '#DDDDDD',
  },
});