import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TestResultCard = ({ 
  testAdi, 
  tamamlandi, 
  toplamPuan,
  onPress 
}) => {
  const getSeverityInfo = (puan) => {
    if (!tamamlandi) return { text: 'Test henüz tamamlanmadı', color: '#999', icon: 'clock-outline' };
    
    if (puan <= 5) return { text: 'Düşük seviye', color: '#4CAF50', icon: 'emoticon-happy-outline' };
    if (puan <= 10) return { text: 'Hafif seviye', color: '#FFC107', icon: 'emoticon-neutral-outline' };
    if (puan <= 15) return { text: 'Orta seviye', color: '#FF9800', icon: 'emoticon-sad-outline' };
    return { text: 'Yüksek seviye', color: '#F44336', icon: 'emoticon-cry-outline' };
  };

  const severityInfo = getSeverityInfo(toplamPuan);

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      disabled={!tamamlandi}
    >
      <View style={styles.header}>
        <Text style={styles.testAdi}>{testAdi}</Text>
        <MaterialCommunityIcons 
          name={severityInfo.icon} 
          size={24} 
          color={severityInfo.color}
        />
      </View>

      <View style={styles.content}>
        {tamamlandi ? (
          <>
            <Text style={styles.sonucText}>
              Toplam Puan: <Text style={styles.puanText}>{toplamPuan}</Text>
            </Text>
            <View style={[styles.seviyeBadge, { backgroundColor: severityInfo.color }]}>
              <Text style={styles.seviyeText}>{severityInfo.text}</Text>
            </View>
          </>
        ) : (
          <Text style={styles.tamamlanmadi}>{severityInfo.text}</Text>
        )}
      </View>

      {tamamlandi && (
        <View style={styles.footer}>
          <Text style={styles.detayText}>Detaylı sonuçlar için tıklayın</Text>
          <MaterialCommunityIcons 
            name="chevron-right" 
            size={20} 
            color="#666"
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  testAdi: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    marginBottom: tamamlandi => tamamlandi ? 12 : 0,
  },
  sonucText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  puanText: {
    fontWeight: '600',
    color: '#333',
  },
  seviyeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  seviyeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  tamamlanmadi: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  detayText: {
    fontSize: 14,
    color: '#666',
  },
});

export default TestResultCard;
