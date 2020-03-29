import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';// useHistory serve para navegação através de função java Script
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css'

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    const ongId = localStorage.getItem('ongId');//busca o ID guardado da ONG (no Login... setItem(ongId) na variavel local do navegador 'ongId'para utilização
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setvalue] = useState('');
    const history = useHistory();//Serve para navegação através de função java Script

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };
        try {
            await api.post('incidents', data, {//incidents é a rota
                headers: {
                    Authorization: ongId,
                }
            })
            history.push('/profile');
            
        } catch(err) { 
            alert('Erro ao cadastrar caso. Tente novamente');
        }


    }

    return (
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be The hero"/>
                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="E02041"/>
                    Voltar para Home</Link> 

            </section>
            <form onSubmit={handleNewIncident}>
                <input 
                    placeholder="Título do Caso"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                    
                <textarea 
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    />
                    
                <input 
                    placeholder="Valor em R$"
                    value={value}
                    onChange={e => setvalue(e.target.value)}
                    />

                 <button className="button" type="submit">Cadastrar</button>

            </form>
        </div>
    </div>
    )
}