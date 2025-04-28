import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FAQs = () => {
  // Data for FAQs
  const faqData = [
    {
      category: 'Deposits',
      questions: [
        { id: '1', question: 'How do I deposit money?', answer: 'You can deposit money via mobile money, bank transfer, or debit/credit cards directly from the app.' },
        { id: '2', question: 'Are there deposit limits?', answer: 'Yes, the minimum deposit is KSh 1, and the maximum deposit depends on your account tier.' },
      ],
    },
    {
      category: 'Withdrawals',
      questions: [
        { id: '3', question: 'How do I withdraw money?', answer: 'You can withdraw money by selecting the Withdraw option, entering the amount, and confirming the payment method.' },
        { id: '4', question: 'How long do withdrawals take?', answer: 'Withdrawals typically take 1-2 business days to process.' },
      ],
    },
    {
      category: 'Interest and Earnings',
      questions: [
        { id: '5', question: 'How is interest earned on the Money Market Fund?', answer: 'Interest is calculated daily based on your balance and credited to your account monthly.' },
        { id: '6', question: 'What is the interest rate?', answer: 'The interest rate varies based on market performance but is typically around 4%-6% annually.' },
      ],
    },
    {
      category: 'Transactions',
      questions: [
        { id: '7', question: 'How long do transactions take?', answer: 'Deposits are processed instantly, while withdrawals take 1-2 business days.' },
        { id: '8', question: 'What payment methods are accepted?', answer: 'We accept mobile money, debit/credit cards, and bank transfers.' },
      ],
    },
    {
      category: 'Account and Security',
      questions: [
        { id: '9', question: 'What should I do if I lose my credentials?', answer: 'Click on "Forgot Password" on the login screen and follow the steps to recover your account.' },
        { id: '10', question: 'How do I secure my account?', answer: 'Enable two-factor authentication and use a strong, unique password.' },
      ],
    },
    {
      category: 'Support',
      questions: [
        { id: '11', question: 'How can I contact support?', answer: 'You can contact support via email at support@centwise.com or use the in-app chat feature.' },
        { id: '12', question: 'Is support available 24/7?', answer: 'Yes, our support team is available around the clock to assist you.' },
      ],
    },
  ];

  const [expandedCategory, setExpandedCategory] = useState(null);

  // Toggle the expansion of a category
  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const renderQuestion = ({ item }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{item.question}</Text>
      <Text style={styles.answerText}>{item.answer}</Text>
    </View>
  );

  const renderCategory = ({ item }) => (
    <View style={styles.categoryContainer}>
      <TouchableOpacity onPress={() => toggleCategory(item.category)} style={styles.categoryHeader}>
        <Text style={styles.categoryTitle}>{item.category}</Text>
        <MaterialCommunityIcons
          name={expandedCategory === item.category ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="#22aa6a"
        />
      </TouchableOpacity>
      {expandedCategory === item.category && (
        <FlatList
          data={item.questions}
          keyExtractor={(question) => question.id}
          renderItem={renderQuestion}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Frequently Asked Questions</Text>
      <FlatList
        data={faqData}
        keyExtractor={(item) => item.category}
        renderItem={renderCategory}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontFamily: 'UbuntuBold',
    color: '#22aa6a',
    marginBottom: 20,
  },
  categoryContainer: {
    marginBottom: 15,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: 'UbuntuRegular',
    color: '#22aa6a',
  },
  questionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    elevation: 1,
  },
  questionText: {
    fontSize: 16,
    fontFamily: 'UbuntuBold',
    color: '#333',
  },
  answerText: {
    fontSize: 14,
    fontFamily: 'UbuntuRegular',
    color: 'gray',
    marginTop: 5,
  },
});

export default FAQs;
