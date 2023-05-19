import { Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const SearchPanel = () => {

    const [query, setQuery] = useState();

    function getQuery(e) {
        setQuery(query => e.target.value)
    }

    function clearInputs() {
        document.getElementById("search-form").value = '';
    }

        return (
            <Form className="d-flex">
                <FormControl
                id="search-form"
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={getQuery}
                
                />
                <Link to={`/search_results/${query}`}>
                    <Button variant="outline-light"
                    onSubmit={clearInputs}
                    >Search</Button>
                 </Link>
            </Form>
        )
    }

export default SearchPanel;