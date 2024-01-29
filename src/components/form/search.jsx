import { useState } from "react";
import {Form} from 'react-bootstrap'
import axios from 'axios'
export function Search () {
    const API_URL = import.meta.env.VITE_API_URL;
    
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);


    const handleSearch = async () => {
        console.log(search.length);
        if(search.length >= 3){
            setIsSearching(true)
            setTimeout(async () => {
                try {
                    // Trimite cererea către server cu primele 3 caractere
                    const response = await axios.get(`http://${API_URL}:3002/search/${search}`);
                    setSearchResults(response.data);
                    console.log(response.data)
                }
                catch (error) {
                    console.error('Eroare la căutare:', error);
                }
                finally{
                    setIsSearching(false);
                }
            }, 1000)
        }
        else{
            setSearchResults([]);
        }
    };


    return (
        <div className='frh:w-full'>
            <Form.Group className='mt-2 has-feedback' controlId='cautare'>
                <Form.Label>Cautare</Form.Label>
                <Form.Control 
                    placeholder='Cautare'
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyUp={handleSearch}
                ></Form.Control>
                <span className="glyphicon glyphicon-search form-control-feedback"></span>
            </Form.Group>
            {searchResults.length > 0 && (
                <div>
                    <ul>
                        {searchResults.map((result, index) => (
                            <li key={index}>{result.description} {result.quantity}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )

}