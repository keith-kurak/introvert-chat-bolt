import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { X, Pencil, Trash2, Download, Star, Save } from 'lucide-react-native';

interface HeaderOptionsProps {
  isEditing?: boolean;
  onCancel: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onExport?: () => void;
  onToggleFavorite?: () => void;
  onSave?: () => void;
  isDark: boolean;
}

export const HeaderOptions: React.FC<HeaderOptionsProps> = ({
  isEditing = false,
  onCancel,
  onEdit,
  onDelete,
  onExport,
  onToggleFavorite,
  onSave,
  isDark,
}) => {
  return (
    <>
      <TouchableOpacity onPress={onCancel} style={styles.headerButton}>
        <X size={24} color={isDark ? '#FFFFFF' : '#000000'} />
      </TouchableOpacity>
      <View style={styles.headerActions}>
        {isEditing ? (
          onSave && (
            <TouchableOpacity onPress={onSave} style={styles.headerButton}>
              <Save size={24} color={isDark ? '#FFFFFF' : '#000000'} />
            </TouchableOpacity>
          )
        ) : (
          <>
            {onToggleFavorite && (
              <TouchableOpacity onPress={onToggleFavorite} style={styles.headerButton}>
                <Star size={24} color={isDark ? '#FFFFFF' : '#000000'} />
              </TouchableOpacity>
            )}
            {onEdit && (
              <TouchableOpacity onPress={onEdit} style={styles.headerButton}>
                <Pencil size={24} color={isDark ? '#FFFFFF' : '#000000'} />
              </TouchableOpacity>
            )}
            {onDelete && (
              <TouchableOpacity onPress={onDelete} style={styles.headerButton}>
                <Trash2 size={24} color={isDark ? '#FFFFFF' : '#000000'} />
              </TouchableOpacity>
            )}
            {onExport && (
              <TouchableOpacity onPress={onExport} style={styles.headerButton}>
                <Download size={24} color={isDark ? '#FFFFFF' : '#000000'} />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
  },
});