import React, { useEffect, useState } from 'react'

function GestaoImagem() {
    const [imagens, setImagens] = useState([]);
    const [imagem, setImagem] = useState(null);
    const [descricao, setDescricao] = useState('')

    useEffect(() => {
        carregarImagens();
    }, [])

    async function carregarImagens() {
        try {
            const resposta = await fetch('http://localhost:5000/imagem', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!resposta) {
                throw new Error('Erro ao buscar imagens');
            }
            const consulta = await resposta.json();
            setImagens(consulta);
        } catch (error) {
            console.log('Erro ao buscar imagem', error)

        }
    }

    async function deletarImagem(id_imagem) {
        try {
            const resposta = await fetch(`http://localhost:5000/imagem/${id_imagem}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!resposta.ok) {
                const error = await resposta.json();
                throw new Error('Erro ao deletar imagem', error);
            } else {
                setImagens(imagens.filter(imagem => imagem.id_imagem !== id_imagem));
            }
        } catch (error) {
            throw new Error('Erro ao deletar imagem', error);
        }
    }

    async function cadastrarImagem() {
        const formData = new FormData();
        formData.append('descricao', descricao);
        formData.append('imagem', imagem);

        try {
            const resposta = await fetch('http://localhost:5000/imagem', {
                method: 'POST',
                body: formData
            })

            if (!resposta) {
                throw new Error('Erro ao cadastrar imagem');
            } else {
                carregarImagens();
            }
        } catch (error) {
            throw new Error('Erro ao cadastrar imagem', error);
        }

    }

    return (
        <>
            <div>
                <nav className='container'>
                    <span>Logo</span>
                    <ul>
                        <li>Inicio</li>
                    </ul>
                </nav>
            </div>
            <div className='container'>
                <h1>Gestão imagens</h1>
                <div className='row'>
                    <div>
                        <h2>Cadastral imagem</h2>
                        <label>Descrição</label>
                        <input className='from-control' type="text" value={descricao} onChange={e => (setDescricao(e.target.value))} />
                        <label>Imagem</label>
                        <input className='form-control' type="file" onChange={e => (setImagem(e.target.files[0]))} />
                        <button className='btn btn-success' onClick={cadastrarImagem}>Cadastrar</button>
                    </div>
                    {imagens.map((imagem) => (
                        <div className='col-md-3' key={imagem.id_imagem}>
                            <img className='img-thumbnail' src={`http://localhost:5000/public/${imagem.caminho}`} alt={imagem.descricao} />
                            <div className='mt-2'>
                                <button className='btn btn-primary'>Editar</button>
                                <button className='btn btn-danger float-end' onClick={() => deletarImagem(imagem.id_imagem)}>Deletar</button>
                            </div>
                        </div>
                    ))};

                </div>
            </div>
        </>


    )


}



export default GestaoImagem;