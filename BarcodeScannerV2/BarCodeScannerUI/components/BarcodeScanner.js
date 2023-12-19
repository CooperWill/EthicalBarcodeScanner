import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { FontAwesome } from "@expo/vector-icons";

const BarcodeScannerScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scannedData, setScannedData] = useState([]);
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        console.log(data);
        if (!scanned) {
            setScanned(true);
            setScannedData(currentData => [...currentData, data]);

        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.scannerBox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
            {scanned && (
                <>
                    <Text style={styles.scannedText}>
                        Last scanned data: {scannedData[scannedData.length - 1]}
                    </Text>

                    <Pressable
                        style={styles.buttonContainer}
                        onPress={() => setScanned(false)}
                    >
                        <View style={styles.button}>
                            <FontAwesome name="barcode" size={20} color="white" style={styles.buttonIcon} />
                            <Text style={styles.buttonLabel}>Scan Again</Text>
                        </View>
                    </Pressable>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#25292e',
        paddingTop: 50,
    },
    scannerBox: {
        width: 400,
        height: 300,
        borderRadius: 10,
        overflow: 'hidden',
    },
    scannedText: {
        color: '#fff',
        fontSize: 18,
        marginTop: 20,
    },
    productText: {
        color: '#fff',
        fontSize: 16,
        marginTop: 10,
    },
    buttonContainer: {
        borderRadius: 10,
        backgroundColor: '#505357',
        padding: 10,
    },
    buttonIcon: {
        marginRight: 8,
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    productInfo: {
        padding: 10,
        marginTop: 20,
        backgroundColor: '#333',
        borderRadius: 8,
    },

});

export default BarcodeScannerScreen;
