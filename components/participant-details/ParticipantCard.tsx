import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ParticipantCard = ({ participant }) => {
  const user = participant.user_details;

  return (
    <View style={styles.card}>
      {/* Left */}
      <View style={styles.left}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.first_name?.[0]?.toUpperCase() || "U"}
          </Text>
        </View>

        <View>
          <Text style={styles.name} numberOfLines={1}>
            {user?.first_name} {user?.last_name}
          </Text>
          <Text style={styles.mobile}>{user?.mobile}</Text>
        </View>
      </View>

      {/* Right */}
      <View style={styles.right}>
        <Text style={styles.slot}>🎟 {participant.slot_count}</Text>

        <Text
          style={[
            styles.status,
            participant.status === "CONFIRMED"
              ? styles.confirmed
              : styles.pending,
          ]}
        >
          {participant.status}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  avatarText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4F46E5",
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    maxWidth: 180,
  },

  mobile: {
    fontSize: 12,
    color: "#6B7280",
  },

  right: {
    alignItems: "flex-end",
  },

  slot: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1F2937",
  },

  status: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: "600",
  },

  confirmed: {
    color: "#16A34A",
  },

  pending: {
    color: "#D97706",
  },
});

export default ParticipantCard;
