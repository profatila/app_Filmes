import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'

import './favoritos.css';
// lógica desta página: ir ao localStorage e buscar todos os filmes salvos

export default function Favoritos(){
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        // quando a página for lida/montada buscar todos os filmes no localStorage
        //'filmes' é o nome da lista de filmes salvos em: Inspecionar > Application > Chave/Key
        //minhaLista contém os filmes salvos
        const minhaLista = localStorage.getItem('filmes');

        //observem que 'filmes' está no formato JSON e precisamos converter para um array
        setFilmes(JSON.parse(minhaLista) || []);

    }, []);

    function handleDelete(id){
        let filtroFilmes = filmes.filter((item)=> {
            return (item.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem('filmes', JSON.stringify(filtroFilmes));
        toast.success('Filme excluído com sucesso!!!');
    }

    return(
        <div id="meus-filmes">
            <h1>Meus Filmes</h1>

            {/* Se o não tiver nenhum filme salvo */}
            {filmes.length === 0 && <span>Nenhum filme salvo!!!</span>}

            <ul>
                {filmes.map((item) => {
                    return(
                       <li key={item.id}>
                           <span>{item.nome}</span>

                           <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={ () => handleDelete(item.id) }>  Excluir </button>
                           </div>
                       </li>  
                    )
                })}
            </ul>

        </div>
    )
}