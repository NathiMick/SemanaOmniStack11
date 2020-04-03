import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons'; // Expo ja vem com estes icones prontos. só importar
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'; //touchableOpaciti para tornar o "ver mais detalher" tocavel. FlatLista para ativar o scroll na lista de casos 

import api from '../../services/api';

import logoImg from '../../assets/logo.png'

import styles from './styles';

export default function Incidents() {
    const [ incidents, setIncidents ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const navigation = useNavigation();
    const [page, setPage] = useState(1); //inicia ná página 1
    const [loading, setLoading] = useState(false); //para carregar uma página por vez

    

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents(){
        if(loading) {
            return;
        } //se loading == true evida que enquando uma requisição está sendo feita, outra possa acontecer. 
        if(total  > 0 && incidents.length == total) { 
            return;
        }// para não buscar mais infrmações, caso já tenha carregado todas

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }, 
        });//Envia o numero  da pagina que está sendo carregada para a API. Poderia ser feito da seguinte forma: ('incidents?page=${page}) mas suja a URL 

        setIncidents([...incidents, ...response.data]); //[...incidents, ...response.data] Para ao invez se substituir as informações da page 1 pela pege dois, ele anexar as informaçoes da pgae 1 com a page dois, e assim por diante. è uma forma de concatenar 2 vetores dentro do React
        setTotal(response.headers['x-total-count']); //x-total-count é nome do haeder com o total de registro da bd
        setPage(page + 1);
        setLoading(false);

    }

    useEffect(() => {
        loadIncidents();
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                    <Text style={styles.headerText}>Total de <Text style={styles.headerTextBold}>{total}</Text>.
                </Text>
            </View>
            
            <Text style={styles.title}>Bem Vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>

            <FlatList
            data={incidents}
            style={styles.incidentList}
            keyExtractor={incident => String(incident.id)}
            showsVerticalScrollIndicator={false}
            onEndReached={loadIncidents} //Esta propriedade aceita uma função. Está funçao será disparada de forma automática assim que chegar no final da lista
            onEndReachedThreshold={0.2} //Assim que o usuário estíver à 20% do final da lista, será carregado novos itens
            renderItem={({item: incident}) => (
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValues}>{incident.name}</Text>
                    
                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValues}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>Valor:</Text>
                    <Text style={styles.incidentValues}>{Intl.NumberFormat('pt-PB', {style: 'currency', currency: 'BRL'}).format(incident.value)}
                        </Text>

                    <TouchableOpacity
                        style={styles.detailsButton} 
                        onPress={() => navigateToDetail(incident)}
                     >
                         <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                         <Feather name="arrow-right" size={16} color="#E02041" />
                     </TouchableOpacity>
                </View>
                )}
            />
        </View>
    
    );
}