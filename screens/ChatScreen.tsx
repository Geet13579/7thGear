import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
  increment,
  getDoc,
} from "firebase/firestore";

import { db, auth } from "../firebaseConfig";

export default function ChatScreen({ route }) {
  const { eventId } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const user = auth.currentUser;

  // 🔴 Listen to messages
  useEffect(() => {
    const q = query(
      collection(db, "eventChats", eventId, "messages"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(list);
    });

    // Mark chat as read when screen opens
    markAsRead();

    return unsubscribe;
  }, []);

  // ✅ Mark messages as read
  const markAsRead = async () => {
    await updateDoc(doc(db, "eventChats", eventId), {
      [`members.${user.uid}.lastReadAt`]: serverTimestamp(),
      [`members.${user.uid}.unreadCount`]: 0,
    });
  };

  async function sendMessage(eventId, text, sender) {
    const chatRef = doc(db, "eventChats", eventId);

    // 1️⃣ Add message
    await addDoc(collection(chatRef, "messages"), {
      text,
      senderId: sender.uid,
      senderName: sender.displayName || "User",
      createdAt: serverTimestamp(),
    });

    // 2️⃣ Get chat members
    const chatSnap = await getDoc(chatRef);
    const members = chatSnap.data().members;

    const updates = {
      lastMessage: text,
      lastMessageAt: serverTimestamp(),
    };

    // 3️⃣ Increment unread for everyone except sender
    Object.keys(members).forEach((uid) => {
      if (uid !== sender.uid) {
        updates[`members.${uid}.unreadCount`] = increment(1);
      }
    });

    // 4️⃣ Reset sender unread
    updates[`members.${sender.uid}.unreadCount`] = 0;
    updates[`members.${sender.uid}.lastReadAt`] = serverTimestamp();

    await updateDoc(chatRef, updates);
  }

  // 📩 Send message
  const handleSend = async () => {
    if (!text.trim()) return;

    await sendMessage(eventId, text.trim(), user);
    setText("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        inverted
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.senderId === user.uid
                ? styles.myMessage
                : styles.otherMessage,
            ]}
          >
            {item.senderId !== user.uid && (
              <Text style={styles.sender}>{item.senderName}</Text>
            )}
            <Text>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message"
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
          <Text style={{ color: "#fff" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },

  message: {
    margin: 8,
    padding: 10,
    borderRadius: 8,
    maxWidth: "75%",
  },

  myMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },

  otherMessage: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },

  sender: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },

  inputRow: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#fff",
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 10,
  },

  sendBtn: {
    marginLeft: 8,
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 6,
  },
});
