import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { Feather } from '@expo/vector-icons'
import Header from '../../components/Header'


export default function VersionScreen() {
    return (
        <View style={styles.container}>
            <Header title="Version" />
            <View style={styles.content}>
                <View style={styles.section}>
                    <Feather name="info" size={24} color={Colors.colors.white} />
                    <Text style={styles.sectionTitle}>1.0.3</Text>
                    
            </View>
        </View>
        </View>
    )
}       

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colors.background,
    },
    content: {
        flex: 1,
        padding: 10,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10,
        borderRadius: 10,
        marginBottom: 30,
        borderBottomWidth: 0.4,
        borderBottomColor: Colors.colors.gray,
        paddingBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.colors.white,
    },

})