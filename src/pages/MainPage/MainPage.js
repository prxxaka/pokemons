import { useEffect, useState } from "react";
import { fetchPokemons } from '../../api/fetchPokemons';
import Pagination from '../../components/Pagination/Pagination'
import PokemonCard from '../../components/PokemonCard/PokemonCard'
import {sortItem} from "../../common/helpers";
const MainPage = () =>  {
    const [ pokemonList, setPokemonList ] = useState([]);
    const [ offset, setOffset ] = useState(10);
    const [page, setPage ] = useState(1);
    const [ pageCount, setPageCount ] = useState(0);
    const [sortedPokemons, setSortedPokemons] = useState([])

    useEffect(() => {
        setSortedPokemons(pokemonList)
    }, [pokemonList])

    const sortHandle = type => {
        setSortedPokemons(sortItem(pokemonList, type))
    }

    return (
        <div>
            <div>
                <button onClick={() => sortHandle('attach')}>Attack</button>
                <button onClick={() => sortHandle('weight')}>Weight</button>
            <div>
                {sortedPokemons.map(pokemon => <PokemonCard
                    pokemon={pokemon} />)}
            </div>
            </div>
        </div>
    )
    const limit = 10;
    useEffect(() => {
        fetchPokemons(limit, offset)
            .then((data)=> {
                setPokemonList(data.results);
                setPageCount(Math.ceil(data.count / 10))
            });
    }, [offset])


    const handleChangePage = (type) => {
        if(type === 'next') {
            setOffset(prev => prev += 10)
            setPage(prev => prev += 1);
        }
        else {
            if(offset <= 10) return
            setOffset(prev => prev - 10)
        }
    }
    return (
        <div className="mainPage">
            <div className="container">
                <div className="pokemonList">
                    {pokemonList.map(pokemon => <PokemonCard
                        pokemon={pokemon} />)}
                </div>
            </div>
            <Pagination
                pageCount={pageCount}
                changeOffset={handleChangePage}
                page={page}
            />
        </div>
    );
}

export default MainPage;