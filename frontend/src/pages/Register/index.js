import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft } from 'react-icons/fi'; //importa Feather Icons para utilizar na page

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';



export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    const history = useHistory(); //Serve para navegação através de função java Script

    async function handleRegister(e){
        e.preventDefault(); //importate nos forms para evitar redirect.
        const data = { //armazena os valores do array no objeto data
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try{
            const response = await api.post('/ongs', data); //api.post Envia os dados armazenados no objeto data para o BD ongs (rota), e armazena o retorno (id) na variavel response
        
        alert(`Seu ID é ${response.data.id}`); //data é o resultado da resosta e o id é o campo retornado

        history.push('/'); //Após o registro da nova ONG, leva o usuário para a página principal)

        }catch(err){
            alert('Erro no cadastro. Tente novamente');
        }
    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrar os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="E02041"/>
                        Já tenho Cadastro</Link> 

                </section>
                <form onSubmit={handleRegister} /*onSubmit para chamar a funcão handleRegister*/> 
                    <input type="text"
                    placeholder="Nome da ONG"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    <input type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <input
                    placeholder="WhatsApp"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input
                         type="text"
                         placeholder="Cidade"
                         value={city}
                         onChange={e => setCity(e.target.value)}
                         />
                        <input
                         type="text"
                         placeholder="UF"
                         style={{width: 80}}
                         value={uf}
                         onChange={e => setUF(e.target.value)}
                         />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    )
}