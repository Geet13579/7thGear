import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Keyboard,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "./text";
import Label from "./Label";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label?: string;
  value: string | null;
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  multiple?: boolean;
};

const CustomDropdown = ({
  label,
  value,
  options,
  placeholder = "Select an option",
  onChange,
  isOpen,
  setIsOpen,
  multiple = false,
}: Props) => {
  const buttonRef = useRef<View>(null);
  const [layout, setLayout] = useState({ top: 0, left: 0, width: 0 });

  const handleOpen = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setLayout({ top: y + height, left: x, width });
      setIsOpen(true);
    });
  };

  const selectedLabel = multiple
    ? options
        .filter((o) => Array.isArray(value) && value.includes(o.value))
        .map((o) => o.label)
        .join(", ")
    : options.find((o) => o.value === value)?.label;

  const isSelected = (val: string) => {
    if (multiple && Array.isArray(value)) {
      return value.includes(val);
    }
    return value === val;
  };

  const handleSelect = (val: string) => {
    Keyboard.dismiss(); // ⬅️ again

    if (!multiple) {
      onChange(val);
      setIsOpen(false);
      return;
    }

    const current = Array.isArray(value) ? value : [];

    if (current.includes(val)) {
      onChange(current.filter((v) => v !== val));
    } else {
      onChange([...current, val]);
    }
  };

  return (
    <View style={styles.wrapper}>
      {label && <Label label={label} />}

      <TouchableOpacity
        ref={buttonRef}
        style={styles.button}
        activeOpacity={0.8}
        onPress={handleOpen}
      >
        <CustomText
          style={[
            styles.buttonText,
            (!value || (Array.isArray(value) && value.length === 0)) &&
              styles.placeholderText,
          ]}
          numberOfLines={1}
        >
          {selectedLabel || placeholder}
        </CustomText>
        <Ionicons name="chevron-down" size={20} color="#64748B" />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={() => setIsOpen(false)}
        
      >
        <Pressable
          style={[styles.modalBackdrop,{marginTop: 5}]}
          onPress={() => setIsOpen(false)}
        >
          <View
            style={[
              styles.dropdown,
              {
                top: layout.top,
                left: layout.left,
                width: layout.width,
              },
            ]}
          >
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
            >
              {options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.option}
                  onPress={() => handleSelect(option.value)}
                >
                  <CustomText style={styles.optionText}>
                    {option.label}
                  </CustomText>

                  {isSelected(option.value) && (
                    <Ionicons name="checkmark" size={18} color="#EF3053" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    marginBottom: 16,
    zIndex: 10,
  },

  label: {
    marginBottom: 6,
    color: "#0F172A",
    fontSize: 14,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },

  buttonText: {
    fontSize: 14,
    color: "#0F172A",
    fontFamily: 'Geist-Regular'
  },

  placeholderText: {
    color: "#94A3B8",
  },

  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    elevation: 5,
    maxHeight: 250,
    overflow: "hidden",
  },

  option: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  optionText: {
    fontSize: 14,
    color: "#0F172A",
    fontFamily: 'Geist-Regular'
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "transparent",
  },
});

export default CustomDropdown;
