import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import { ArrowLeft } from "lucide-react-native";

export default function Favorites() {
  const favorites = [
    { image: require("../assets/images/favorites/electricityIcon.png"), title: "Electricity" },
    { image: require("../assets/images/favorites/gasIcon.png"), title: "Gas" },
    { image: require("../assets/images/favorites/waterIcon.png"), title: "Water" },
    { image: require("../assets/images/favorites/internetIcon.png"), title: "Internet" },
    { image: require("../assets/images/favorites/telephoneIcon.png"), title: "Telephone" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Favorites List */}
      <ScrollView style={styles.scrollView}>
        {
          favorites.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.favoriteItem,
                index === favorites.length - 1 && styles.lastItem,
                index === 0 && styles.firstItem,
              ]}
            >
              <View style={styles.itemLeft}>
                <Image source={item.image} style={styles.itemIcon} />
                <Text style={styles.itemTitle}>{item.title}</Text>
              </View>
              <Image source={require("../assets/images/heartIcon.png")} style={styles.heartIcon} />
            </TouchableOpacity>
          ))
        }
      </ScrollView>


      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Favorite</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,

    borderBottomColor: "#F3F4F6",
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  favoriteItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  firstItem: {
    borderTopWidth: 0,
  },

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 16,
  },
  heartIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  bottomContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  addButton: {
    backgroundColor: "#2C73FF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});


