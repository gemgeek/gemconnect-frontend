import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  Dimensions, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    image: require('../assets/images/onboarding1.png'),
    title: 'GemConnect',
    subtitle: 'share your moments, build a feed',
  },
  {
    id: '2',
    image: require('../assets/images/onboarding2.png'), 
    title: 'GemConnect', 
    subtitle: 'connect with people',
  },
  {
    id: '3',
    image: require('../assets/images/onboarding3.png'), 
    title: 'GemConnect', 
    subtitle: 'discovery, creativity, inspiration',
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  // Function to handle "Continue" button
  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // Navigate to Login when finished
      router.push('/location'); 
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.slide}>
      {/* BACKGROUND IMAGE */}
      <ImageBackground source={item.image} style={styles.image} resizeMode="cover">
        {/* DARK OVERLAY */}
        <View style={styles.overlay} />
      </ImageBackground>

      {/* WHITE CURVED CONTAINER */}
      <View style={styles.textContainer}>
        {/* The Curved Effect */}
        <View style={styles.curveMask} />
        
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>

          {/* BUTTON */}
          <TouchableOpacity onPress={handleNext} style={styles.buttonWrapper}>
            <LinearGradient
              colors={['#FF007F', '#8B008B']} 
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* PAGINATION DOTS */}
          <View style={styles.dotsContainer}>
            {SLIDES.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentIndex === index ? styles.activeDot : styles.inactiveDot
                ]}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    width: width,
    height: height,
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height * 0.65, 
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)', 
  },
  textContainer: {
    width: width,
    height: height * 0.4, 
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 60, 
    marginTop: -50, 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
  },
  curveMask: {
    position: 'absolute',
    top: -50,
    width: width,
    height: 50,
    backgroundColor: 'transparent', 
  },
  contentWrapper: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B008B', 
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonWrapper: {
    width: '80%',
    height: 50,
    marginBottom: 30,
    shadowColor: "#FF007F",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#C71585', 
    width: 12,
    height: 12,
  },
  inactiveDot: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#888',
  },
});