import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, Linking, TouchableOpacity } from 'react-native';
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

    const fetchProductDescription = async (barcode) => {
        try {
            let response = await fetch(`http://10.0.0.94:3000/product/${barcode}`);
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            let json = await response.json();
            setProductData(json.message ? json.message : json);
        } catch (error) {
            console.error("Error in fetchProductDescription:", error);
        }
    };


    const handleBarCodeScanned = ({ type, data }) => {
        console.log(data);
        if (!scanned) {
            setScanned(true);
            setScannedData(currentData => [...currentData, data]);
            fetchProductDescription(data); // Call fetchProductDescription here

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

            {productData && (
                <View style={styles.productInfo}>
                    {typeof productData === 'string' ? (
                        // Display the message if productData is a string
                        <Text style={styles.productText}>{productData}</Text>
                    ) : (
                        // Display product details if productData is an object
                        <>
                            <Text style={styles.productText}>Product Name: {productData.ProductName}</Text>
                            <Text style={styles.productText}>Product Brand: {productData.ProductBrand}</Text>
                            <Text style={styles.productText}>Brand Ethical Rating: {productData.BrandEthicalRating}</Text>
                            <Text style={styles.productText}>Brand Information: {productData.BrandInfo}</Text>
                        </>
                    )}
                    {productData.BrandInfo && (
                        <TouchableOpacity onPress={() => Linking.openURL(productData.InfoLink)}>
                            <Text style={styles.linkText}>More Info</Text>
                        </TouchableOpacity>
                    )}
                </View>
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
        paddingBottom: 10,
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#333',
        borderRadius: 8,
    },
    linkText: {
        color: '#1e90ff',
        textDecorationLine: 'underline',
        marginTop: 10,
    },

});

export default BarcodeScannerScreen;
