import path from 'path';
import url from 'url';
import { createImagem, deleteImagem, oneImagem, readImagem, updateImagem } from '../models/ImagemModel.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function criarImagem(req, res) {
    console.log('ImagemController :: Criando imagem');
    const { descricao } = req.body;
    const { imagem } = req.files;

    if (!descricao || !imagem) {
        res.status(400).json({ message: 'Imagem e descrição são obrigatorios' });
    } else {
        const extensao = path.extname(imagem.name).toLocaleLowerCase();
        const extensoesPermitidas = ['.jpg', '.png', '.jpeg'];

        if (extensoesPermitidas.includes(extensao)) {
            const nomeImg = `${Date.now()}${extensao}`;
            try {
                const [status, resposta] = await createImagem(descricao, nomeImg, imagem);
                res.status(status).json(resposta);
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: 'ImagemController:: Erro' });
            }

        } else {
            res.status(415).json({ message: 'Arquivo inválido' })
        }

    }

}


export async function downloadImagem(req, res) {
    console.log('ImagemController :: Mostrando imagem');

    const { nomeImg } = req.params;
    const caminho = path.join(__dirname, '..', '..', 'public', 'img', nomeImg);

    console.log(caminho);

    res.sendFile(caminho, (erro) => {
        if (erro) {
            console.log(erro);
            res.status(404).json({ message: 'Imagem não encontrada' });
        }
    });
    

}

export async function mostrarImagens(req,res) {
    console.log('ImagemController :: Mostrando lista de Imagens');

    try {
        const [status,resposta] = await readImagem();
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'ImageController :: Erro' });
    }
}

export async function editarImagem(req,res) {
    console.log('ImagemController :: Editando uma Imagen');
    const {id_imagem} = req.params;
    const {descricao} = req.body;

    try {
        const [status,resposta] = await updateImagem(descricao,id_imagem);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'ImagemController :: Erro'})
        
    }
    
}

export async function deletarImagem(req,res) {
    console.log('ImagemController :: Deletando uma Imagen');
    const {id_imagem} = req.params;

    try {
        const [status,resposta] = await deleteImagem(id_imagem);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'ImagemController :: Erro'})
        
    }
    
}

export async function mostrandoUmaImagem(req,res) {
    console.log('ImagemController :: Mostrando uma imagem')
    const {id_imagem} = req.params;
    
    try {
        const [status,resposta] = await oneImagem(id_imagem);
        res.status(status).json(resposta); 
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'ImagemController :: Erro'});
    }
    
}

