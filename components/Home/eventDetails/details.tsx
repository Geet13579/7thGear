import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Description from "../../../universal/subTitle";
import { colors } from "../../../constants/Colors";
import UpperSection from "../../../universal/UpperSection";
import Title from "../../../universal/Title";
import CustomText from "../../../universal/lightText";
import TextProfileSection from "../../../universal/textWithProfile";
import { Feather, MaterialIcons, Octicons } from "@expo/vector-icons";
import PriceButtonTextSection from "../../../universal/priceButtonCard";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { padStartNumbers } from "../../../utils/padStart";
import useAuthStore from "../../../store/authenticationStore";

interface CardItem {
  id: string;
  icon: string;
  iconName: any;
  icon_color: string;
  title: string;
  description: string;
  onPress: () => void;
  disabled: boolean;
}

const Details = ({ eventDetails }: any) => {
  const [cardItems, setCardItems] = useState<CardItem[]>([]);
  const totalDays = moment(eventDetails.end_date).diff(
    moment(eventDetails.start_date),
    "days",
  );
  const totalNights = totalDays - 1;

  const itineraryData = [
    {
      day: 1,
      label: "Day 1",
      title: "Arrival & Acclimatization",
      description: "Meet at base camp, gear check, and local sightseeing",
    },
    {
      day: 2,
      label: "Day 2",
      title: "Trek to High Camp",
      description: "8km trek through pine forests and meadows",
    },
    {
      day: 3,
      label: "Day 3",
      title: "Summit Day",
      description: "Early morning push to summit, return to high camp",
    },
    {
      day: 4,
      label: "Day 4",
      title: "Exploration Day",
      description: "Explore nearby lakes and valleys",
    },
    {
      day: 5,
      label: "Day 5",
      title: "Descent",
      description: "Trek back to base camp",
    },
    {
      day: 6,
      label: "Day 6",
      title: "Departure",
      description: "Return journey and goodbyes",
    },
  ];

  const importantInfo = [
    "Physical fitness required - able to walk 6-8 hours daily",
    "Age limit: 18-50 years",
    "No smoking or alcohol during trek",
    "Follow trek leader instructions at all times",
    "Carry valid ID proof and medical certificate",
  ];

  const travelers = [
    { id: "1", initials: "R" },
    { id: "2", initials: "P" },
    { id: "3", initials: "A" },
    { id: "4", initials: "S" },
    { id: "5", initials: "R" },
  ];

  const totalTravelers = 16;
  const maxVisibleTravelers = 5;
  const remainingTravelers = totalTravelers - maxVisibleTravelers;

  const navigation = useNavigation();
  const user = useAuthStore.getState().user;
  const isSelf = eventDetails.manager_id === user?.id;

  useEffect(() => {
    if (eventDetails) {
      setCardItems([
        {
          id: "1",
          icon: "map-pin",
          iconName: Feather,
          icon_color: colors.primary,
          title: "Location",
          description: eventDetails.event_location,
          onPress: () => {},
          disabled: false,
        },
        {
          id: "2",
          icon: "calendar",
          iconName: Feather,
          icon_color: "#000",
          title: "Duration",
          description: `${padStartNumbers(totalDays)} Days & ${padStartNumbers(totalNights)} Nights`,
          onPress: () => {},
          disabled: false,
        },
        {
          id: "3",
          icon: "users",
          iconName: Feather,
          icon_color: "#000",
          title: "Participants",
          description: `${padStartNumbers(eventDetails.slot_count - eventDetails.remamining_slot)} / ${padStartNumbers(eventDetails.slot_count)} Joined`,
          onPress: () => {},
          disabled: false,
        },
        {
          id: "4",
          icon: "message-circle",
          iconName: Feather,
          icon_color: "#000",
          title: "Group chat",
          description: "Only for participants",
          onPress: () => {
            navigation.navigate("ChatScreen", {
              eventUid: eventDetails.event_uid,
              eventId: eventDetails.id,
              eventTitle: eventDetails.event_title,
            });
          },
          disabled: isSelf ? false : !eventDetails.is_event_booked,
        },
      ]);
    }
  }, [eventDetails]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <UpperSection style={{ paddingTop: 15, paddingBottom: 8 }}>
            <Title title={eventDetails.event_title} color={colors.black} />
            <Description
              description={eventDetails.event_location}
              color={colors.textSecondary}
            />
          </UpperSection>
        </View>

        <View style={styles.content}>
          <TextProfileSection
            heading={eventDetails.first_name + " " + eventDetails.last_name}
            subHeading={
              "Posted on " +
              moment(eventDetails.created_at).format("DD MMM YYYY")
            }
            bg={colors.primary}
            profile={
              eventDetails?.first_name?.charAt(0) +
              eventDetails?.last_name?.charAt(0)
            }
            icon={false}
          />
          <View style={styles.almostFullBadge}>
            <MaterialIcons name="verified-user" size={16} color="white" />
            <CustomText style={styles.badgeText}>Verified</CustomText>
          </View>
        </View>

        <View style={styles.cardsContainer}>
          <View style={styles.row}>
            {cardItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, item.disabled && styles.disabledCard]}
                activeOpacity={0.7}
                onPress={item.onPress}
                disabled={item.disabled}
              >
                <item.iconName
                  name={item.icon}
                  size={24}
                  color={item.icon_color}
                />
                <CustomText style={styles.cardTitle}>{item.title}</CustomText>
                <CustomText style={styles.cardDescription}>
                  {item.description}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.bottomSection}>
          <CustomText style={styles.titleName}>
            About this experience
          </CustomText>
          <CustomText style={styles.subLabel}>
            {eventDetails.short_desc}
          </CustomText>
        </View>

        <View style={styles.bottomSection}>
          <CustomText style={styles.titleName}>Itinerary</CustomText>
          <View style={styles.itineraryContainer}>
            {eventDetails?.itinerary?.map((item: any, index: number) => (
              <View key={item.day} style={styles.itineraryItem}>
                {index < eventDetails?.itinerary?.length - 1 && (
                  <View style={styles.verticalLine} />
                )}
                <View style={styles.dayNumberContainer}>
                  <CustomText style={styles.dayNumber}>#{item.day}</CustomText>
                </View>
                <View style={styles.itineraryContent}>
                  <CustomText style={styles.dayLabel}>
                    Day {item.day}
                  </CustomText>
                  <CustomText style={styles.itineraryTitle}>
                    {item.title}
                  </CustomText>
                  <CustomText style={styles.itineraryDescription}>
                    {item.description}
                  </CustomText>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bottomSection}>
          <CustomText style={styles.titleName}>What's included</CustomText>
          <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {eventDetails?.inclusion?.map((item: string) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
                key={item}
              >
                <Octicons name="dot-fill" size={16} color="green" />
                <CustomText style={styles.subLabel}>{item}</CustomText>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bottomSection}>
          <CustomText style={styles.titleName}>
            Important information
          </CustomText>
          <View style={styles.importantInfoContainer}>
            {eventDetails?.imp_info?.map((info: string, index: number) => (
              <View key={index} style={styles.importantInfoItem}>
                <Octicons name="dot-fill" size={16} color="green" />
                <CustomText style={styles.infoText}>{info}</CustomText>
              </View>
            ))}
          </View>
        </View>

        {/* <View style={styles.bottomSection}>
          <CustomText style={styles.titleName}>
            Meet your fellow travelers
          </CustomText>
          <View style={styles.travelersContainer}>
            {travelers.map((traveler, index) => (
              <View
                key={traveler.id}
                style={[styles.avatar, index > 0 && styles.avatarOverlap]}
              >
                <CustomText style={styles.initials}>
                  {traveler.initials}
                </CustomText>
              </View>
            ))}
            {remainingTravelers > 0 && (
              <CustomText style={styles.remainingText}>
                +{remainingTravelers} more going
              </CustomText>
            )}
          </View>
        </View> */}
      </View>

      <View
        style={{
          borderTopWidth: 2,
          paddingHorizontal: 16,
          borderColor: "#E2E8F0",
          boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <PriceButtonTextSection
          price={"₹ " + eventDetails?.price?.toLocaleString("en-IN")}
          priceHeading=" / Slot"
          subHeading={`Only ${eventDetails?.remamining_slot || 0} of ${eventDetails?.slot_count || 0} slots left`}
          buttonText={
            isSelf
              ? "Participant Details"
              : eventDetails?.is_event_booked
                ? "Booked"
                : "Reserve your spot"
          }
          disabled={
            eventDetails?.remamining_slot === 0 || eventDetails?.is_event_booked
          }
          onClickFunc={() => {
            if (isSelf) {
              navigation.navigate("participantDetails", {
                event_id: eventDetails?.id,
              });
            } else {
              navigation.navigate("selectSlots", {
                price: eventDetails?.price,
                slots_left: eventDetails?.remamining_slot,
                cat_uid: eventDetails?.cat_uid,
                cat_id: eventDetails?.cat_id,
                event_id: eventDetails?.id,
                manager_id: eventDetails?.manager_id,
                status: eventDetails?.status,
                slot_count: eventDetails?.slot_count,
                entry_type: eventDetails?.entry_type,
                event_uid: eventDetails?.event_uid,
                event_start_date: eventDetails?.start_date,
                event_end_date: eventDetails?.end_date,
                event_title: eventDetails?.event_title,
              });
            }
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subLabel: {
    fontSize: 14,
    color: "#717171",
    marginTop: 2,
    lineHeight: 20,
  },
  titleName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    marginBottom: 5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 15,
    borderColor: "#E2E8F0",
  },
  almostFullBadge: {
    backgroundColor: "#34C759",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  cardsContainer: {
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    flexDirection: "column",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  cardDescription: {
    fontSize: 12,
    color: "#717171",
  },
  bottomSection: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderColor: "#E2E8F0",
  },
  itineraryContainer: {
    marginTop: 10,
    gap: 16,
  },
  itineraryItem: {
    flexDirection: "row",
    gap: 12,
    position: "relative",
  },
  verticalLine: {
    position: "absolute",
    left: 18,
    top: 28,
    bottom: -16,
    width: 2,
    backgroundColor: "#E2E8F0",
  },
  dayNumberContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },
  itineraryContent: {
    flex: 1,
    gap: 2,
  },
  dayLabel: {
    fontSize: 12,
    color: "#717171",
  },
  itineraryTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },
  itineraryDescription: {
    fontSize: 13,
    color: "#717171",
    lineHeight: 16,
    fontStyle: "italic",
  },
  importantInfoContainer: {
    marginTop: 4,
    gap: 12,
  },
  importantInfoItem: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  infoNumber: {
    fontSize: 14,
    color: "#717171",
    fontWeight: "500",
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: "#717171",
    lineHeight: 20,
  },
  travelersContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FF385C",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  avatarOverlap: {
    marginLeft: -12,
  },
  initials: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  remainingText: {
    fontSize: 14,
    color: "#717171",
    marginLeft: 12,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.black,
  },
  perPerson: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.text,
  },
  spotsLeft: {
    fontSize: 12,
    color: "#717171",
    marginTop: 4,
  },
  reserveButton: {
    backgroundColor: "#FF385C",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 10,
  },
  reserveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledCard: {
    opacity: 0.5,
  },
});

export default Details;
