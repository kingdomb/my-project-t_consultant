import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import '@/i18n/config';


export default function HomeScreen() {

  const { t } = useTranslation(); // gives t() function for translating keys

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('header')}</Text>
      <Text style={styles.item}>{t('item1')}</Text>
      <Text style={styles.item}>{t('item2')}</Text>
      <Text style={styles.item}>{t('item3')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    fontSize: 20,
    marginBottom: 12,
  },
});


  // if (loading) {
  //   return (
  //     <View style={styles.center}>
  //       <ActivityIndicator size="large" />
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View style={styles.center}>
  //       <Text style={styles.error}>{error}</Text>
  //     </View>
  //   );
  // }
