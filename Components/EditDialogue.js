import Dialog from "react-native-dialog";
import React from "react";

const EditDialogue = ({ visible, value, onChange, onCancel, onSubmit }) => (
  <Dialog.Container
    visible={visible}
    contentStyle={{
      borderRadius: 16,
      backgroundColor: "#e3f2fd", // Soft blue
      padding: 20,
      shadowColor: "#1976d2",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8, // For Android shadow
    }}
  >
    <Dialog.Title style={{ color: "#1976d2", fontWeight: "bold" }}>Edit Entry</Dialog.Title>
    <Dialog.Description style={{ color: "#333" }}>Enter new value:</Dialog.Description>
    <Dialog.Input
      value={value}
      onChangeText={onChange}
      style={{
        borderColor: "#1976d2",
        borderWidth: 1,
        borderRadius: 6,
        padding: 8,
        marginBottom: 10,
        backgroundColor: "#fff",
        color: "#333",
      }}
      placeholder="New value"
      placeholderTextColor="#aaa"
    />
    <Dialog.Button label="Cancel" onPress={onCancel} />
    <Dialog.Button label="OK" onPress={onSubmit} />
  </Dialog.Container>
);

export default EditDialogue;

//old code
//   <Dialog.Container visible={visible}>
//     <Dialog.Title>Edit Entry</Dialog.Title>
//     <Dialog.Description>Enter new value:</Dialog.Description>
//     <Dialog.Input value={value} onChangeText={onChange} />
//     <Dialog.Button label="Cancel" onPress={onCancel} />
//     <Dialog.Button label="OK" onPress={onSubmit} />
//   </Dialog.Container>
