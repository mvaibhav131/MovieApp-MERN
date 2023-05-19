import { useState, useEffect } from 'react';
import {Container, Row, Col, Card, Badge, Button} from 'react-bootstrap';
import FilmService from '../../services/FilmService';
import { withRouter } from 'react-router';
import {Link} from 'react-router-dom';
import Spinner from '../ui/spinner'
import './film-item.css'

// required variables = img, title, genre, description, link for button to openv

const Film = (props) => {

    const [movie, setMovie] = useState({});
    const [films, setFilms] = useState([]);
    const [genres, setGenres] = useState([]);
    const [page, setPage] = useState(1);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [like, setLike] = useState(false);
    const [loading, setLoading] = useState(true)

    const newService = new FilmService();

    const onFilmListLoading = () => {
        setNewItemLoading(onFilmListLoading => !onFilmListLoading)
    }

    const onGenresLoaded = (res) => {
        setGenres(genres => res)
    }

    const onFilmLoaded = (res) => {
        setMovie(movie => res)
        setLoading(loading => false)
    }

    useEffect(() => {
        onRequest();
    }, [props]) // watching for props

    // load film list (request to server)
    const onRequest = () => {
        const id = props.match.params.id
        if(!id) {
            return
        }
        setLoading(loading => true)
        onFilmListLoading()
        newService
            .getRelated(id)
            .then(onListLoaded)
        getGenresList()
        getFilm(id)
    }

    function getFilm(id) {
        newService
        .getFilmByID(id)
        .then(onFilmLoaded) 
        checkStorage(id)
    }

    // write list to the state
    const onListLoaded = (res) => {
        setFilms(res) //[...films, ...res]
        setNewItemLoading(newItemLoading => false)
    }

    const getGenresList = () => {
        newService
        .getGenres()
        .then(onGenresLoaded)
    }

     function onToggleFavorites (id, item) {
         if (!item.onLike) {
            addFavorite(id, item, films, setFilms)

         } else {
            removeFavorite(id, item, films, setFilms)
         }
     }

     function addFavorite(id, item, list, setList) {
        const index = list.findIndex((film) => film === item);
        const newItem = {...item, onLike: !item.onLike}
        const newlist = [...list.slice(0, index), newItem, ...list.slice(index + 1)]
        setList([...newlist])
        localStorage.setItem(id, JSON.stringify(item))
     }

     function removeFavorite(id, item, list, setList) {
        const index = list.findIndex((film) => film === item);
        const newItem = {...item, onLike: !item.onLike}
        const newlist = [...list.slice(0, index), newItem, ...list.slice(index + 1)]
        setList([...newlist])
        localStorage.removeItem(id)
     }

     function onToggleFavorite(id, item) {        
        if (!like) {
            setLike(like => !like)
            
            localStorage.setItem(id, JSON.stringify(item))
        }
        if (like) {
            setLike(like => !like)
            localStorage.removeItem(id)
        }
     }

     function checkStorage(id) {
        // const el = localStorage.getItem(id)
        if(localStorage.getItem(id)) {
            setLike(like => true)
        } else {
            setLike(like => false)
        }
     }
     
    function renderFilms(arr) {
        // change img path
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
                            <Badge bg="danger" className="favor" onClick={() => onToggleFavorites(item.id, item, i)}>{!item.onLike === true ? 'Add ' : 'Remove'}</Badge>
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
        // if(loading) {
        //     return <Spinner/>
        // }

        const SelectedMovie = ({movie}) => {
            const {title, poster_path, id, description} = movie;

            return (
                <Col>
                        <h3>{movie.title}</h3>
                        <div className="some">
                            <Card bg='light' text='dark' style={{ width: '14rem'}} className="cardList"> 
                                <Card.Img variant="top" src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt={movie.title}/>
                                <Badge bg="danger" className="favor" onClick={() => onToggleFavorite(movie.id, movie)}>{!like === true ? 'Add' : 'Remove'}</Badge>
                            </Card>
                        
                            <p>{movie.description}</p>
                        </div>            
                        <br/><br/>
                    </Col>
            )
        }

        let items = renderFilms(films);


        return (
            <>
                <Container className="justify-content-md-center">
                    <Col>
                        {loading ? <Spinner/> : <SelectedMovie movie={movie}/>}
                    </Col>
                </Container>
                <Container className="justify-content-md-center" >
                        <h2>Recommended Films</h2>
                        {items}
                </Container>
            </>
        )
    }

export default withRouter(Film);