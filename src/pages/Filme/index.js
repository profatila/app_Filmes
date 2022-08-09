import { useEffect, useState } from 'react';
// para proteger as nossas rotas vamos usar useHistory do react-router-dom
import { useParams, useHistory } from 'react-router-dom';
import './filme-info.css';
import api from '../../services/api';
import { toast } from 'react-toastify'

export default function Filme(){

    const { id } = useParams();
    const [filme, setFilme] = useState([]);
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function lerFilme(){
            // vamos passar o id do filme para exibir os detalhes deste
            // ``   template string
            const resposta = await api.get(`r-api/?api=filmes/${id}`);

            if (resposta.data.length === 0) {
                // tentou acessar os detalhes de um filme cuo ID não existe
                // navego ele para a Home
                history.replace('/');
                return;
            }

            // vamos testar e depois comentar
            //console.log(resposta.data);
            setFilme(resposta.data);
            setLoading(false);
        }

        lerFilme();

        return() => {
            console.log('Componente desmontado!');
        }

    }, [history, id]);

    function salvarFilmes(){
        
        const minhaLista = localStorage.getItem('filmes');
        
        // vamos converter o resultado obtido em minhaLista para JSON
        let filmesSalvos = JSON.parse(minhaLista) || [];

        //se tiver algum filme salvo com esse mesmo id precisa ignorar
        const hasFilme = filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id)
        
        //o método some/algum devolve um valor booleano.
        //Se TRUE significa que o filme já foi salvo
        if (hasFilme) {

            //toast por último. implementar primeiro com alert
            toast.error('Você já possui este filme salvo!!!');
            // alert('Você já possui este filme salvo!!!');
            return; //para a execução do código neste ponto
        }

        //Se o filme não foi salvo, vamos salvá-lo no localStorage
        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));

        //toast por último. implementar primeiro com alert
        toast.success('Filme salvo com sucesso!!!');
        // alert('Filme salvo com sucesso!!!');
    }

    if(loading){
        return(
        <div className="filme-info">
          <h1>Carregando seu filme...</h1>
        </div>
        )
    }
    
    return(
        <div className='filme-info'>
            <h1>{filme.nome}</h1>
            <img src={filme.foto} alt={filme.nome} />
            <h3>Sinopse</h3>
            {filme.sinopse}
                
            <div className='botoes'>
                {/* função anônima () => {} antes de implementar a função salvarFilmes  */}
                {/*<button onClick={() => {}}>Salvar</button> */}
                
                <button onClick={ salvarFilmes }>Salvar</button>
                <button>
                    <a target='blank' href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}