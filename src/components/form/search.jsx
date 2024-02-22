import { useState, useEffect, useRef } from "react";
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { ThreeDots } from "react-loader-spinner";

export function Search({ setBarcode, setCantitate, cantitate, focusCantitate }) {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearch('');
                setSearchResults([]);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleSearch = async () => {
        if (search.length >= 3) {
            setIsSearching(true);
            setTimeout(async () => {
                try {
                    const response = await axios.get(`http://${API_URL}:3002/search/${search}`);
                    setSearchResults(response.data);
                }
                catch (error) {
                    console.error('Eroare la căutare:', error);
                }
                finally {
                    setIsSearching(false);
                }
            }, 500);
        } else {
            setSearchResults([]);
        }
    };

    const handleItemClick = (barcode) => {
        setBarcode(barcode);
        setSearchResults([]);
        if (cantitate === '') {
            focusCantitate();
        }
        setSearch('');
    };

    return (
        <div className='frh:w-full' ref={searchRef}>
            <Form.Group className='mt-2 has-feedback' controlId='cautare'>
                <Form.Label>Cautare</Form.Label>
                <Form.Control
                    placeholder='Cautare'
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyUp={handleSearch}
                    value={search}
                ></Form.Control>
                <span className="glyphicon glyphicon-search form-control-feedback"></span>
            </Form.Group>
            {isSearching && <ThreeDots visible={true} height={40} width={40} color="#00a65a" ariaLabel="Incarcare...">Incarcare...</ThreeDots>}
            {searchResults.length > 0 && (
                <ul className="block mt-2 border-solid border-2 border-gray-500 search-result">
                    {searchResults.map((result, index) => (
                        <li key={index} onClick={() => handleItemClick(result.barcode)}>
                            <dl>
                                <dt>
                                    {result.description}
                                </dt>
                                Cod_mrf: {result.cod_mrf} | Cod bara: {result.barcode} | UM: {result.mcc_um}
                                <dt>---------------------------------------------------</dt>
                            </dl>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
