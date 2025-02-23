import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const TestCard = ({ 
  questionNumber,
  totalQuestions,
  question,
  options,
  selectedOption,
  onOptionSelect,
  onNext,
  onPrevious,
  isFirstQuestion,
  isLastQuestion
}) => {
  return (
    <View style={styles.container}>
      {/* İlerleme Çubuğu */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(questionNumber / totalQuestions) * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {questionNumber} / {totalQuestions}
        </Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionNumber}>Soru {questionNumber}</Text>
        <Text style={styles.questionText}>{question}</Text>
        
        <View style={styles.optionsContainer}>
          {options?.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionRow}
              onPress={() => onOptionSelect(option)}
            >
              <View style={styles.radioContainer}>
                <View style={styles.radioOuter}>
                  {selectedOption?.id === option.id && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.optionText}>{option.text}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.navigationButtons}>
          <TouchableOpacity 
            style={[
              styles.navButton, 
              isFirstQuestion && styles.disabledButton
            ]}
            onPress={onPrevious}
            disabled={isFirstQuestion}
          >
            <Text style={[
              styles.navButtonText,
              isFirstQuestion && styles.disabledButtonText
            ]}>Önceki</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.navButton,
              styles.nextButton,
              !selectedOption && styles.disabledButton
            ]}
            onPress={onNext}
            disabled={!selectedOption}
          >
            <Text style={[
              styles.navButtonText,
              !selectedOption && styles.disabledButtonText
            ]}>{isLastQuestion ? 'Bitir' : 'Sonraki'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  progressContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'darkblue',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    minWidth: 50,
    textAlign: 'right',
  },
  questionContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
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
  questionNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: 'darkblue',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 24,
    lineHeight: 24,
  },
  optionsContainer: {
    marginTop: 16,
  },
  optionRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'darkblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: 'darkblue',
  },
  optionText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    minWidth: 120,
  },
  nextButton: {
    backgroundColor: 'darkblue',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledButtonText: {
    color: '#999',
  },
})

export default TestCard