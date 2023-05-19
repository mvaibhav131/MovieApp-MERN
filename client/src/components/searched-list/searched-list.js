import FilmService from '../../services/FilmService';
import {Container, Row, Col, Card, Badge} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

const Searched = (props) => {

    const [films, setFilms] = useState([]);
    const [genres, setGenres] = useState([]);
    
    const newService = new FilmService();

    useEffect(() => {
        
        renderSearched();
    }, [props.query]) //watching for query

        const renderSearched = () => {
            const {match: {params: {query}}} = props;
            getGenresList()
            getFilmsList(query)
        }
    
    const onGenresLoaded = (res) => { //(res) is required to send params to function
        setGenres(genres => res)
    }

    const onFilmLoaded = (res) => { //(res) is required to send params to function
        setFilms(films => res)
    }

    const getFilmsList = (query) => {
        newService.getSearched(query)
        .then(onFilmLoaded) 
    }

    const getGenresList = () => {
        newService
        .getGenres()
        .then(onGenresLoaded)
    } 

    function onToggleFavorites (id, item) {
        //  console.log(item.onLike)
         if (!item.onLike) {
            const index = films.findIndex((film) => film === item);
            const newItem = {...item, onLike: !item.onLike}
            const newlist = [...films.slice(0, index), newItem, ...films.slice(index + 1)]
            setFilms([...newlist])
            localStorage.setItem(id, JSON.stringify(item))

         } else {
            const index = films.findIndex((film) => film === item);
            const newItem = {...item, onLike: !item.onLike}
            const newlist = [...films.slice(0, index), newItem, ...films.slice(index + 1)]
            setFilms([...newlist])
            localStorage.removeItem(id)
         }
     }

    function renderFilms(arr) {
        const items = arr.map((item, i) => {

            // create badge for each id
            const genre = item.genre_ids.map(id => {
                // overwrite id as genre
                genres.forEach((gen) => {
                    if (id === gen.id) {
                        id = gen.name
                    }
                })
                return (
                    <Badge bg="light" text="dark" key={id}> 
                        {id}
                    </Badge>
                )
            })

            if(localStorage.getItem(item.id)) {
                item.onLike = true
            }

            return (
                <Col key={item.id}>
                    
                        <Card bg='light' text='dark' style={{ width: '14rem'}} className="cardList"> 
                        <Link to={`/film/${item.id}`}>
                            <Card.Img variant="top" src={item.poster_path} alt={item.title}/>
                        </Link>
                            <Card.Body>
                            <Badge bg="danger" className="favor" onClick={() => onToggleFavorites(item.id, item, i)}>{!item.onLike === true ? 'Add To Watchlist' : 'Remove From watchlist'}</Badge>
                                {genre}
                            </Card.Body>
                        </Card>
                    
                    <br />
                </Col>
            )
        });

        return (
            <Row>
                {items}
            </Row>
        )
    }

    const items = renderFilms(films);

    return (
        <>
            <h2>Search Results</h2>
            <Container>
                {items}
            </Container>
        </>
    )
}


export default withRouter(Searched);