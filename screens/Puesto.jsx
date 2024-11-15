       
       import React from 'react';
       import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
       import { useNavigation } from '@react-navigation/native';

       export default function JobDetails() {
        const navigation = useNavigation();

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>

                <Image source={require('../assets/starbucks_logo.png')} style={styles.logo} />

                <Text style={styles.companyName}>Starbucks</Text>

            </View>
       )}