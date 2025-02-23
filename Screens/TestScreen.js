import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Platform, 
  StatusBar,
  Text,
  Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppHeader } from '../components';
import { testData } from '../data/testData';
import TestCard from '../components/cards/TestCard';
import { 
  cevapKaydet, 
  testiTamamla, 
  testiSifirla,
  selectSoruCevabi, 
  selectTestinTamamlanmaDurumu 
} from '../redux/slices/testSonuclariSlice';

const TestScreen = ({ navigation, route }) => {
  const { testType } = route.params;
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentTest = testData[testType];
  const question = currentTest?.questions[currentQuestion];
  const totalQuestions = currentTest?.questions.length || 0;
  
  // Redux'tan mevcut sorunun cevabını al
  const mevcutCevap = useSelector(state => 
    selectSoruCevabi(state, testType, currentQuestion + 1)
  );

  const testTamamlandi = useSelector(state => 
    selectTestinTamamlanmaDurumu(state, testType)
  );

  // Component mount olduğunda veya soru değiştiğinde, kayıtlı cevap varsa onu göster
  useEffect(() => {
    if (mevcutCevap) {
      const option = question?.options.find(opt => opt.id === mevcutCevap.secilenCevap);
      setSelectedOption(option);
    } else {
      setSelectedOption(null);
    }
  }, [currentQuestion, mevcutCevap]);

  // Component mount olduğunda testi sıfırla
  useEffect(() => {
    dispatch(testiSifirla({ testAdi: testType }));
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    // Cevabı Redux'a kaydet
    dispatch(cevapKaydet({
      testAdi: testType,
      soruNumarasi: currentQuestion + 1,
      cevap: option
    }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Son soruda ise testi tamamla
      dispatch(testiTamamla({ testAdi: testType }));
      Alert.alert(
        "Test Tamamlandı",
        "Testi başarıyla tamamladınız!",
        [
          { 
            text: "Tamam", 
            onPress: () => navigation.goBack() 
          }
        ]
      );
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  // Eğer test daha önce tamamlanmışsa, uyarı göster
  useEffect(() => {
    if (testTamamlandi) {
      Alert.alert(
        "Uyarı",
        "Bu testi daha önce tamamladınız. Tekrar yapmak ister misiniz?",
        [
          {
            text: "Hayır",
            onPress: () => navigation.goBack(),
            style: "cancel"
          },
          { 
            text: "Evet", 
            onPress: () => {
              dispatch(testiSifirla({ testAdi: testType }));
            } 
          }
        ]
      );
    }
  }, [testTamamlandi]);

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader 
        title={testType} 
        onBackPress={() => navigation.goBack()} 
      />
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.testContainer}>
          <Text style={styles.sectionTitle}>{testType} Testi</Text>
          
          <TestCard
            questionNumber={currentQuestion + 1}
            totalQuestions={totalQuestions}
            question={question?.question}
            options={question?.options}
            selectedOption={selectedOption}
            onOptionSelect={handleOptionSelect}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isFirstQuestion={currentQuestion === 0}
            isLastQuestion={currentQuestion === totalQuestions - 1}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00C853',
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 20,
  },
  content: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  testContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  }
});

export default TestScreen;
