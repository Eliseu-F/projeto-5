import { router, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, View, StyleSheet, Text, TextInput, Pressable, Alert, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"
import { useEffect, useState } from "react";
import config from '@/app/config';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

export default function Form() {

    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [isEditing, setIsEditing] = useState(!!id);
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState("");
    const [periodo, setPeriodo] = useState("Manha");
    const [date, setDate] = useState(new Date(2015, 0, 1)); // Garantir uma data válida no início
    const [showPicker, setShowPicker] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditing && id) {
            fetchCrianca(id);
        }

    }, [isEditing, id]);

    const fetchCrianca = async (id) => {
        setLoading(true);
        try {

            const resultado = await fetch(`${config.IP_SERVER}/crianca/${id}`);

            if (resultado.ok) {

                const dados = await resultado.json();
                setNome(dados.nome);
                setDataNascimento(dados.dataNascimento);
                setPeriodo(dados.periodo);
                setIsEditing(true);

            }
        } catch (err) {
            console.error("Erro ao buscar dados da criança:", err);
        } finally {
            setLoading(false);
        }
    };

    const toggleDataPicker = () => {
        setShowPicker(!showPicker);
    }

    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate);

            if (Platform.OS === "android") {
                toggleDataPicker();
                const formattedDate = format(currentDate, "dd/MM/yyyy", { locale: ptBR });

                setDataNascimento(formattedDate); // Exemplo de uso
            }

        } else {
            toggleDataPicker();
        }
    }

    const handleSubmit = async () => {

        try {
            const formattedDateNascimento = format(date, "dd/MM/yyyy");

            const idResponsavel = await AsyncStorage.getItem('idResponsavel');

            const response = await fetch(`${config.IP_SERVER}/crianca`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    nome,
                    dataNascimento: formattedDateNascimento,
                    idResponsavel,
                    periodo
                }),
            });

            if (response.ok) {
                router.push('/screen/responsavel/(tabs)');
            } else {
                Alert.alert("Error", "Não foi possível realizar o cadastro.");
            }
        } catch (error) {
            Alert.alert("Error", "Erro de conexão com o backend.");
        }
    };

    const handleAlterar = async () => {
        try {
            const formattedDateNascimento = format(date, "dd/MM/yyyy");
            const idResponsavel = await AsyncStorage.getItem('idResponsavel');


            if (!idResponsavel) {
                Alert.alert("Error", "ID do motorista não encontrado.");
                return;
            }

            const response = await fetch(`${config.IP_SERVER}/crianca/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome,
                    dataNascimento: formattedDateNascimento,
                    idResponsavel,
                    periodo
                }),
            });

            if (response.ok) {
                Alert.alert('Sucesso', 'Dados alterados com sucesso!');
                router.navigate(`/screen/responsavel/crianca/${id}`);
            } else {
                Alert.alert('Erro', 'Erro ao atualizar dados.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Ocorreu um erro ao enviar os dados.');
        }
    };

    return (
        <SafeAreaView style={styles.total}>
            <ScrollView contentContainerStyle={styles.scrollView}>

                <View style={styles.containerInputs}>

                    <Text style={styles.text}>Nome da criança</Text>
                    <TextInput
                        style={styles.textInputs}
                        value={nome}
                        onChangeText={setNome}
                    />
                    <Text style={styles.text}>Data de nascimento</Text>
                    {showPicker && (
                        <DateTimePicker
                            mode="date"
                            display="spinner"
                            value={date}
                            onChange={onChange}

                        />
                    )}

                    {!showPicker && (
                        <Pressable onPress={toggleDataPicker}>
                            <TextInput
                                style={styles.textInputs}
                                value={dataNascimento || ""} // Garantir que o valor seja uma string
                                onChangeText={setDataNascimento}
                                placeholder='Selecione'
                                editable={false}
                            />

                        </Pressable>
                    )}

                    {/* DropDownPicker para tipo de usuário */}
                    <Text style={styles.text}>Tipo de usuário</Text>
                    <Picker
                        selectedValue={periodo || "Manha"} // Garantir que o valor seja sempre uma string válida
                        onValueChange={(itemValue) => setPeriodo(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Selecione" value={null} />
                        <Picker.Item label="Manhã" value="Manhã" />
                        <Picker.Item label="Tarde" value="Tarde" />
                    </Picker>
                </View>

                <Pressable
                    style={styles.buttonSubmit}
                    onPress={isEditing ? handleAlterar : handleSubmit}
                >
                    <Text style={styles.buttonText}>{isEditing ? 'Alterar' : 'Salvar'}</Text>
                </Pressable>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    total: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollView: {
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    containerCards: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 10,
    },
    cardDados: {
        backgroundColor: "#ffbf00",
        padding: 20,
        margin: 20,
        borderRadius: 20,
        height: 120,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },

    cardsMotoristas: {
        height: 150,
        width: 150,
        backgroundColor: "#a5a5a5",
        borderRadius: 10,
    },
    textoDados: {
        fontSize: 15,
        fontWeight: "600",
    },
    containerInputs: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    textInputs: {
        backgroundColor: "#f9f9f9",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        color: "#333",
    },
    buttonSubmit: {
        backgroundColor: "#ffbf00",
        width: "100%",
        height: 50,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "black",
        fontWeight: "700",
    },
    botaoProcura: {
        alignSelf: "center",
        marginTop: 20,
    },
    text: {
        fontSize: 14,
        marginBottom: 5,
        color: "#666",
    },
    picker: {
        backgroundColor: '#f9f9f9',
        borderColor: '#ddd',
        borderWidth: 1,
    },
});
