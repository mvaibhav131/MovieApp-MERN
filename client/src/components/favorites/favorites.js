import { useState, useEffect } from 'react';
import {Container, Row, Col, Card, Badge} from 'react-bootstrap';
import FilmService from '../../services/FilmService';

import {Link} from 'react-router-dom';

const Favorites = () => {

    const [films, setFilms] = useState([]);
    const [genres, setGenres] = useState([]);

    console.log(Object.keys(localStorage))
    const newService = new FilmService();

    const onGenresLoaded = (res) => {
        setGenres(genres => res)
    }

    const getGenresList = () => {
        newService
            .getGenres()
            .then(onGenresLoaded)
    } 

    const getFilms = () => {
        let list = [];
        Object.values(localStorage).forEach(value => {
        if (value != 'undefined') {
            list.push(JSON.parse(value))
            }
        })
        setFilms (films => [...list])

    }

    function removeFavorites (id) { 
        localStorage.removeItem(id)
        getFilms()
     }

     useEffect(() => {
        getFilms()
        getGenresList()
    }, [])

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
                            <Badge bg="danger" className="favor" onClick={() => removeFavorites(item.id, item, i)}>{!item.onLike === true ? 'Add' : 'Remove'}</Badge>
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

    // let list = [];
    //     Object.values(localStorage).forEach(value => {
    //     if (value != 'undefined') {
    //         list.push(JSON.parse(value))
    //     }
    // })


    
    let items = renderFilms(films)
    return (
        <Container className="justify-content-md-center">
            <Row>
                {items}
            </Row>
        </Container>
    )
}

export default Favorites;