import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { Feather } from '@expo/vector-icons'
import Header from '../../components/Header'

export default function About() {
    return (
        <View style={styles.container}>
            <Header title="About" />
            <View style={styles.content}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>ShareContact</Text>
                        <Text style={styles.sectionDescription}>
                            ShareContact is an innovative app designed to simplify the way you store, organize, and share your contacts with friends, family, and colleagues. With a user-friendly interface, this app takes the hassle out of managing your personal and professional connections. The app allows for seamless contact organization and sharing, ensuring you're always connected when you need it most. ShareContact is perfect for people who value efficiency and simplicity in their everyday digital tools.
                        </Text>

                        <Text style={styles.sectionTitle}>Easy Storage and Organization</Text>
                        <Text style={styles.sectionDescription}>
                            With ShareContact, you can easily add, edit, and organize your contacts in a practical and efficient way. Everything you need is at your fingertips, with a simple and smooth interface that makes the process fast and straightforward. Group your contacts into categories, making it easy to find who you need when you need them. You can also assign labels or tags to contacts for better categorization, allowing for quick sorting based on importance or category. This feature ensures you stay organized and connected with ease.
                        </Text>

                        <Text style={styles.sectionTitle}>Share Your Contacts Securely</Text>
                        <Text style={styles.sectionDescription}>
                            The app makes it easy to share contacts using QR Codes and NFC, ensuring that you can exchange information securely and efficiently, without the need to manually enter phone numbers. With just a scan or tap, you can instantly share your contact details with others, making the process faster and more secure. Additionally, you can customize what contact information you share, giving you full control over your privacy. Whether you're at a business conference or meeting friends, sharing contacts has never been easier or more secure.
                        </Text>

                        <Text style={styles.sectionTitle}>Full Synchronization and Backup</Text>
                        <Text style={styles.sectionDescription}>
                            With ShareContact, your contacts are always safe and synchronized across all your devices. We use advanced cloud storage technologies to ensure that your information is always up-to-date and accessible. No matter which device you're using, whether it's your phone, tablet, or computer, your contacts are automatically updated in real time. This eliminates the need for manual backups or the risk of losing valuable contact information due to device failure. Your contacts are always in sync, ensuring that you never miss a connection.
                        </Text>

                        <Text style={styles.sectionTitle}>Your Privacy Comes First</Text>
                        <Text style={styles.sectionDescription}>
                            User privacy is a priority for us. All data is encrypted and stored securely, following the best security practices and complying with privacy regulations. We ensure that your personal information is never shared without your consent. With ShareContact, you can rest assured that your contact details are kept confidential and are never misused. We are committed to providing a transparent privacy policy, ensuring you understand how your data is handled at all times. Your trust is important, and we work hard to maintain it.
                        </Text>

                        <Text style={styles.sectionTitle}>Why Choose ShareContact?</Text>
                        <Text style={styles.sectionDescription}>
                            Simplicity: An intuitive interface to manage your contacts with no hassle, making it easy to stay organized and connected.

                            Efficiency: Share contacts quickly and securely with QR Codes and NFC, ensuring your connections are always just a tap away.

                            Security: Your data is protected with top-notch encryption, providing peace of mind that your information is safe.

                            Accessibility: Access your contacts on any device with real-time synchronization, ensuring you're always up-to-date.
                        </Text>

                        <Text style={styles.sectionTitle}>Optimized for Personal and Professional Use</Text>
                        <Text style={styles.sectionDescription}>
                            With ShareContact, you can optimize the way you manage your connections and never lose an important contact again. Whether for personal or professional purposes, our app is designed to make your life easier. The app allows for quick access to your most important contacts, ensuring that no connection is ever more than a few taps away. Whether you’re networking for work, staying in touch with family, or organizing social gatherings, ShareContact provides the tools you need to manage your network effectively. The flexibility and speed of ShareContact make it the perfect solution for anyone looking to streamline their contact management.
                        </Text>

                    </View>
                </ScrollView>
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
        alignItems: 'center',
        gap: 10,
        padding: 10,
        borderRadius: 10,
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.colors.white,
    },
    sectionDescription: {
        justifyContent: 'center',
        textAlign: 'justify',
        fontSize: 15,
        color: Colors.colors.white,
    },
})