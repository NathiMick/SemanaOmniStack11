import React, { useState, useEffect } from 'react'; //useEffect é uma função disponível no react para disparar uma outra função em determinado momento do componente
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom'
import './styles.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';


export default function Profile(){
    const history = useHistory();
    const [ incidents, setIncidents ] = useState([]);
    const ongId = localStorage.getItem('ongId'); //busca o ID guardado da ONG (no Login... setItem(ongId) na variavel local do navegador 'ongId'para utilização
    const ongName = localStorage.getItem('ongName'); //busca o Nome guardado da ONG na variavel local do navegador 'ongName'para utilização
    
    useEffect(() => { //primeiro parametro é QUAL função ser executada. O segundo é QUANDO será executada... useEffect(() => {}, []). Toda vez que o valor do array[] mudar, será executada a função () => {} novamente
        api.get('profile', { headers: { 
            Authorization: ongId, // Identifica o ID dentro de "Authorization" no Headers do Browser.
        }
    }).then(response => {
        setIncidents(response.data); //grava os dados do retorno dentro do setIncidents
    })
    }, [ongId]); //ouve se terá alteração no ongId no browser
    
    async function handleDeleteIncident(id){
        try{
          await api.delete(`incidents/${id}`, {
              headers: { // Identifica o ID dentro de "Authorization" no Headers do Browser.
                  Authorization: ongId,
              }
          }); //rota para deletar um incident é /incidents/ (id doa ONG)  
          
          setIncidents(incidents.filter(incident => incident.id !== id)); //mantem na tela apenas os incidentes em que o incident.id for !== id do delete (parametro do handleDelete)

        } catch(err) {
            alert('Erro ao deletar o caso, tente novamente');
        }
    }

    function handleLogout() {
        localStorage.clear(); //limpa todo o storage do browser
        history.push('/'); //navega de volta para a página principal
        
        
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}!</span>
                <Link className="button" to="/incidents/new">Cadastrar novo Caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => ( /*.map() para percorrer cada um deles, retornando informação*/
                    <li key={incident.id}>
                    <strong>CASO: </strong>
                    <p>{incident.title}</p>
                    <strong>DESCRIÇÃO</strong>
                    <p>{incident.description}</p>
                    <strong>VALOR: </strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)/*Intl Classe Global no Javascript. NumberFormat para formatar para currency ptBR */} </p>
                    <button type="button" onClick={() => handleDeleteIncident(incident.id) /*sem () => iria executar a função e deletar TODOS os incidents do id, ao invés de deletar apenas o Incident selecionado, pq não entende como a função como parametro para o click.*/ }>
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li> //No React quando é feito uma interação como map ou foreach, precisa adicionar uma propriedade "key" no primeiro elemento. Na key pracisa colocar o valor unico. Exemplo ID
                )) } 
            </ul>
        </div>
    )
}


/** Exemplo de li estático antes para incidents
 *                <li>
                    <strong>CASO: </strong>
                    <p>Caso Teste</p>
                    <strong>DESCRIÇÃO</strong>
                    <p>Descrição teste</p>
                    <strong>VALOR: </strong>
                    <p>R$ 120,00</p>
                    <button type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
 */