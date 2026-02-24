import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Description from "../../universal/subTitle";
import { colors } from "../../constants/Colors";
import PolicyCard from "./BookingCard";
import UpperSection from "../../universal/UpperSection";
import Title from "../../universal/Title";
import NoDataFound from "../../universal/NoDataFound";

const RecentInsurance = ({ filteredBookings }) => {
  return (
    <>
      {filteredBookings.map((item, index) => (
        <PolicyCard key={index} event={item} />
      ))}

      {filteredBookings.length === 0 && (
        <NoDataFound message="No bookings found" />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default RecentInsurance;
