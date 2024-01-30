import { Form, Button, Row, Col } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { useState, useRef } from 'react';
import { Search } from './search';
import {handleDataUpdate} from "../table/tableUtils";
import axios from 'axios';

export default function FormScan ({ setRegistrationResult }) {

    const [barcode, setBarcode] = useState('');
    const [cantitate, setCantitate] = useState('');
    const cantitateRef = useRef(null);  // Adăugați o referință
    const barcodeRef = useRef(null);

    const focusCantitate = () => {
        if (cantitateRef.current) {
          cantitateRef.current.focus();
        } else {
          console.error("Ref-ul pentru câmpul 'cantitate' nu este definit corect.");
        }
    };

    const focusBarcode = () => {
        if(barcodeRef.current) {
            barcodeRef.current.focus();
        }
    }


    const handleAddItemToInventory = async () => {
        const API_URL = import.meta.env.VITE_API_URL;
        const nr_tableta = localStorage.nr_tableta;
        console.log(cantitate)
        let cantitateValue = cantitate;
        if (cantitateValue === '') {
            cantitateValue = 1;
        }

        try {
            const response = await axios.post(`http://${API_URL}:3002/addItemToInventory`, { barcode, cantitate : cantitateValue, nr_tableta });
            console.log(response.data);
            if (response.data[0][0].CRUD === 'Create' || response.data[1][0].CRUD === 'Update') {
                setBarcode('');
                setCantitate('');
                const url = `http://${API_URL}:3002/aduArticoleScanate/${nr_tableta}`;
                handleDataUpdate(url);
                setRegistrationResult('success');
                focusBarcode();
                console.log('Actualizare cu succes');
            } 
            else {
                console.error('Eroare la adăugarea elementului în inventar:', response);
                setRegistrationResult('error');
            }
        } 
        catch (error) {
            console.error('Eroare la comunicarea cu serverul:', error);
            setRegistrationResult('error');
        }
    }

    return(
        <div className='flex flex-col'>
            <div className='flex justify-center'>
                <div className='frh:w-3/4'>
                    <Form>
                        <Form.Group className='mb-2' controlId='cantitate'>
                            <Form.Label>Cantitate</Form.Label>
                            <Form.Control inputMode='numeric' ref={cantitateRef} onChange={(e) => {setCantitate(e.target.value)}} value={cantitate} type='input'></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='barcode'>
                            <Form.Label>Barcode</Form.Label>
                            <Form.Control 
                                type='input' 
                                ref={barcodeRef}
                                onChange={(e) => {setBarcode(e.target.value)}} 
                                value={barcode}
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter'){
                                        handleAddItemToInventory();
                                    }
                                }}
                                autoFocus
                            ></Form.Control>
                        </Form.Group>
                    </Form>
                </div>
                <div className='frh:w-1/4 frh:pl-5'>
                    <Button className="frh:h-full w-full btn btn-block btn-flat btn-save-custom" type='submit' onClick={handleAddItemToInventory}><FontAwesomeIcon className='frh:text-7xl leading-10' icon={faSave}/></Button>
                </div>
            </div>
            <Search setBarcode={setBarcode} setCantitate={setCantitate} focusCantitate={focusCantitate} cantitate={cantitate}/>
        </div>
    );
}