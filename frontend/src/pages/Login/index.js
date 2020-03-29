import React, { useState } from 'react';
import {FiLogIn } from 'react-icons/fi'; //importa Feather Icons para utilizar na page
import { Link, useHistory } from 'react-router-dom'; //importa o link react para substituir as tags <a> do html

import api from '../../services/api';

import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Login() { 
    const [id, setID] = useState('');
    const history = useHistory(); //Serve para navegação através de função java Script

    async function handleLogin(e) {
        e.preventDefault(); //importate nos forms para evitar redirect.
        try {
            const response = await api.post('sessions', {id} ); //api.post Envia os dados armazenados no array para o BD sessions, e armazena o retorno (id) na variavel response
            localStorage.setItem('ongId', id); //localStorage armazena a informação internamente no navegador para ser usado em outras áreas da aplicação. OBS OngId é o nome que dei para a 'variavel' que guardara a iformação no browser
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile'); //Após o registro da nova ONG, leva o usuário para a página profile
        } catch(err) {
            alert('Falha no Login. Tente novamente');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero"/>

                <form onSubmit={handleLogin}/*onSubmit para chamar a funcão handleLogin*/>
                    <h1>Faça seu Login</h1>
                    <input
                     type="text" 
                     placeholder="Sua ID"
                     value={id}
                     onChange={e => setID(e.target.value)}
                     />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="E02041"/>
                        Não tenho Cadastro</Link> 
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );

}