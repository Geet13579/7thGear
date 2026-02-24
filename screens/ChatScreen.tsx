import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  ScrollView,
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
  setDoc,
} from "firebase/firestore";

import { db, auth } from "../firebaseConfig";
import { LoadingPopup } from "../universal/popup";
import useAuthStore from "../store/authenticationStore";
import { colors } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Container from "../universal/Container";
import moment from "moment";
import Header from "../components/chatscreen/Header";
import { SEND_CHAT_ROOM_NOTIFICATIONS } from "../constants/apiEndpoints";
import { postRequest } from "../api/commonQuery";

export default function ChatScreen({ route }) {
  const tokenUser = useAuthStore.getState().user;
  const { full_name, id } = tokenUser;
  const { eventUid, eventTitle, eventId } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const scrollViewRef = useRef(null);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const user = auth.currentUser;

  // 🔴 Listen to messages
  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, "eventChats", eventUid, "messages"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(list.reverse());
    });

    // Mark chat as read when screen opens
    markAsRead();
    setLoading(false);

    return unsubscribe;
  }, [eventUid]);

  // ✅ Mark messages as read
  const markAsRead = async () => {
    await updateDoc(doc(db, "eventChats", eventUid), {
      [`members.${user.uid}.lastReadAt`]: serverTimestamp(),
      [`members.${user.uid}.unreadCount`]: 0,
    });
  };

  async function sendMessage(eventUid, text, sender) {
    try {
      setSendLoading(true);
      const chatRef = doc(db, "eventChats", eventUid);

      // 1️⃣ Add message
      await addDoc(collection(chatRef, "messages"), {
        text,
        senderId: sender.uid,
        senderName: full_name || "User",
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

      const res = await postRequest(SEND_CHAT_ROOM_NOTIFICATIONS, {
        title: "New Message in " + eventTitle,
        body: text,
        event_id: eventId,
      });

      console.log(res, {
        title: "New Message in " + eventTitle,
        body: text,
        event_id: eventId,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSendLoading(false);
    }
  }

  // 📩 Send message
  const handleSend = async () => {
    if (!text.trim()) return;

    setText("");
    await sendMessage(eventUid, text.trim(), user);
  };

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [messages]);

  useEffect(() => {
    const setActiveChat = async () => {
      try {
        await setDoc(doc(db, "users", user.uid), {
          activeChatRoom: eventId,
          lastSeen: serverTimestamp(),
        }, { merge: true });
        
      } catch (error) {
        console.log(error)
      }
    };

    const clearActiveChat = async () => {
      await setDoc(doc(db, "users", user.uid), {
        activeChatRoom: null,
        lastSeen: serverTimestamp(),
      }, { merge: true });
    };

    setActiveChat();

    return () => {
      clearActiveChat();
    };
  }, [eventId]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <Header title={eventTitle} />
      <Container
        style={{
          paddingBottom: 5,
          // paddingTop: 70,
          flex: 1,
          paddingHorizontal: 8,
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <LoadingPopup visible={loading} />

            <ScrollView style={{ marginBottom: 10 }} ref={scrollViewRef}>
              {messages.map((item) => (
                <View
                  style={[
                    styles.messageWrapper,
                    item.senderId === user.uid
                      ? styles.myWrapper
                      : styles.otherWrapper,
                  ]}
                >
                  {/* {item.senderId !== user.uid && (
                  )} */}

                  <View
                    style={[
                      styles.bubble,
                      item.senderId === user.uid
                        ? styles.myBubble
                        : styles.otherBubble,
                    ]}
                  >
                    <Text style={styles.messageText}>{item.text}</Text>
                  </View>
                  <View style={styles.timeContainer}>
                    <Text style={styles.time}>
                      {item.senderName.split(" ")[0]}
                    </Text>
                    <Text style={styles.time}>
                      {moment(item?.createdAt?.toDate()).format("hh:mm a")}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.inputRow}>
              <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Type your message here"
                style={styles.input}
                placeholderTextColor={colors.textSecondary}
                multiline
              />

              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.sendBtn,
                  (!text.trim() || sendLoading) && styles.sendButtonDisabled,
                ]}
                onPress={handleSend}
                disabled={!text.trim() || sendLoading}
              >
                {sendLoading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Ionicons name="send" size={24} color={colors.white} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Container>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5DDD5",
  },

  messageWrapper: {
    marginVertical: 6,
    maxWidth: "80%",
  },

  myWrapper: {
    alignSelf: "flex-end",
  },

  otherWrapper: {
    alignSelf: "flex-start",
  },

  bubble: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
  },

  myBubble: {
    backgroundColor: "#DCF8C6",
    borderBottomRightRadius: 0,
  },

  otherBubble: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 0,
  },

  messageText: {
    fontSize: 16,
    color: "#000",
  },

  sender: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },

  inputRow: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 30,
    marginHorizontal: 10,
    marginBottom: 5,
  },

  input: {
    flex: 1,
    borderRadius: 15,
    paddingHorizontal: 15,

    // paddingVertical: 18,
    maxHeight: 100,
    fontSize: 16,
  },

  sendBtn: {
    marginLeft: 10,
    backgroundColor: colors.primary,
    // paddingHorizontal: 12,
    // paddingVertical: 10,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  sendButtonDisabled: {
    opacity: 1,
  },
  time: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    justifyContent: "flex-start",
  },
});
