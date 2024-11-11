import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { Link, useRouter, useNavigation } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '@/app/config';


const fetchAtendidas = async (idMotorista, setEscolasAtendidas, setLoading) => {
    setLoading(true);
    try {
        
        const response = await fetch(`${config.IP_SERVER}/api/escolas/atendidas/${idMotorista}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

        const atendidasData = await response.json();
        setEscolasAtendidas(atendidasData);

    } catch (error) {
        Alert.alert('Erro', 'Erro ao buscar escolas atendidas.');
        console.log(error);
    } finally {
        setLoading(false);
    }
};


export default function EscolasAtendidas() {

    const [escolasAtendidas, setEscolasAtendidas] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const navigation = useNavigation();

    const fetchData = async () => {
        const idMotorista = await AsyncStorage.getItem('idMotorista');
        await fetchAtendidas(idMotorista, setEscolasAtendidas, setLoading);
    };

    useEffect(() => {

        const unsubscribeFocus = navigation.addListener("focus", () => {

            fetchData();

        })

        return () => {
            unsubscribeFocus();
        };

       

    }, [navigation]);  // Dependendo do `router`, ele reage a mudanças de navegação
    

    const renderItem = ({ item }) => {

        return (
            <View style={styles.escolaAtendida}>
                <Link
                    href={{
                        pathname: `/screen/motorista/escola/[id]`,
                        params: { id: item.id },
                    }}
                    style={styles.buttonEscola}
                >
                    <Text style={styles.textButton}>{item.nome}</Text>
                </Link>
            </View>
        );
    };

    return (
        <SafeAreaView>

            <View style={styles.container}>
                <Text style={styles.title}>Gerenciar escolas </Text>
                <Link style={styles.buttonVerEscolas} href={"/screen/motorista/escola/listaEscolas"}>
                    <Text style={styles.textButton}>Ver escolas</Text>
                </Link>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (<View>
                    <Text style={styles.subtitle}>Escolas Atendidas </Text>
                    <FlatList
                        data={escolasAtendidas}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        ListEmptyComponent={<Text>Nenhuma escola atendida</Text>}
                    />
                </View>
                )}
            </View>
        </SafeAreaView>

    );
}



const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20
    },
    buttonVerEscolas: {
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#ffbf00',
    },
    buttonEscola: {
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#0d99ff',
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    schoolName: {
        fontSize: 18,
    },
    escolaAtendida: {
        marginTop: 10,
        borderColor: 'black'
    }
});
