import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MainMenu = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([
    {
      id: '1',
      song: "Fully Loaded: God's Country",
      artist: 'Blake Shelton',
      coverArt: 'https://music-row-website-assets.s3.amazonaws.com/wp-content/uploads/2019/10/07083410/BS_FullyLoadedGodsCountry-FNL-1.jpg',
    },
    {
      id: '2',
      song: 'Bigger Houses - Save Me The Trouble',
      artist: 'Dan + Shay',
      coverArt: 'https://s3.amazonaws.com/syndication.abcaudio.com/files/2024-01-04/M_DanandShayBViggerHousesWarnerMusicNashville.jpg',
    },
  ]);

  const [currentSong, setCurrentSong] = useState(recentlyPlayed[0]);

  const [banners, setBanners] = useState([
    {
      id: '1',
      title: 'Chris Stapleton',
      details: 'All American Road Show',
      image: 'https://revpacman.com/wp-content/uploads/2024/10/img_9428.jpeg',
    },
    {
      id: '2',
      title: 'Station 2',
      details: 'Top Hits Today',
      image: 'https://www.chrisstapleton.com/wp-content/uploads/2018/01/CS-Option-5-608x283.jpg',
    },
  ]);

  const renderBanner = ({ item }) => (
    <TouchableOpacity style={styles.bannerCard}>
      <Image source={{ uri: item.image }} style={styles.bannerImage} />
      <Text style={styles.bannerTitle}>{item.title}</Text>
      <Text style={styles.bannerDetails}>{item.details}</Text>
    </TouchableOpacity>
  );

  const renderRecentlyPlayed = ({ item }) => (
    <View style={styles.songCard}>
      <Image source={{ uri: item.coverArt }} style={styles.songImage} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{item.song}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>1Radar</Text>
        <Icon name="menu" size={28} color="#333" />
      </View>

      {/* Banners */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bannerContainer}>
        {banners.map((banner) => renderBanner({ item: banner }))}
      </ScrollView>

      {/* Popular Section */}
      <View style={styles.popularSection}>
        <View style={styles.popularHeader}>
          <Text style={styles.popularTitle}>Popular</Text>
          <TouchableOpacity style={styles.loadMoreButtonContainer}>
            <Text style={styles.loadMoreButton}>Load More</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri: 'https://img.freepik.com/free-vector/air-neon-frame_23-2148766309.jpg?t=st=1737552002~exp=1737555602~hmac=0568b7961458d604c04a9e2335b85b4b6b497e0babc1b57a3df779e2898dc1dc&w=1800' }}
          style={styles.popularBannerImage}
        />
      </View>

      {/* Recently Played */}
      <View style={styles.recentlyPlayedSection}>
        <Text style={styles.sectionTitle}>Recently Played</Text>
        <FlatList
          data={recentlyPlayed}
          keyExtractor={(item) => item.id}
          renderItem={renderRecentlyPlayed}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Mini Player */}
      <View style={styles.miniPlayer}>
        <Image source={{ uri: currentSong.coverArt }} style={styles.miniPlayerImage} />
        <View style={styles.miniPlayerInfo}>
          <Text style={styles.miniPlayerTitle}>{currentSong.song}</Text>
          <Text style={styles.miniPlayerArtist}>{currentSong.artist}</Text>
        </View>
        <View style={styles.miniPlayerControls}>
          <TouchableOpacity>
            <Icon name="rewind" size={28} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.playButton}>
            <Icon name="play" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="fast-forward" size={28} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="repeat" size={28} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  bannerContainer: {
    marginBottom: 16,
  },
  bannerCard: {
    marginRight: 16,
    alignItems: 'center',
  },
  bannerImage: {
    width: 200,
    height: 120,
    borderRadius: 5,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333',
  },
  bannerDetails: {
    fontSize: 14,
    color: '#666',
  },
  popularSection: {
    marginVertical: 16,
  },
  popularHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  popularTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  loadMoreButtonContainer: {
    borderWidth: 1,
    borderColor: '#177448',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  loadMoreButton: {
    fontSize: 14,
    color: '#177448',
    fontWeight: '600',
  },
  popularBannerImage: {
    width: '100%',
    height: 230,
   
  },
  recentlyPlayedSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  songCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 16,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  songArtist: {
    fontSize: 14,
    color: '#666',
  },
  miniPlayer: {
    position: 'absolute',
    bottom: 10,
    left: 16,
    right: 16,
    backgroundColor: '#f0f0f0', // Slightly darker shade of white
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  miniPlayerImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  miniPlayerInfo: {
    flex: 1,
    marginLeft: 10,
  },
  miniPlayerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  miniPlayerArtist: {
    fontSize: 12,
    color: '#666',
  },
  miniPlayerControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#177448',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
});

export default MainMenu;
