import { Form, Button, Row, Col } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { useState, useRef } from 'react';
import { Search } from './search';

export default function FormScan () {

    const [barcode, setBarcode] = useState('');
    const [cantitate, setCantitate] = useState('');
    const cantitateRef = useRef(null);  // Adăugați o referință

    const focusCantitate = () => {
        if (cantitateRef.current) {
          cantitateRef.current.focus();
        } else {
          console.error("Ref-ul pentru câmpul 'cantitate' nu este definit corect.");
        }
      };

    return(
        <div className='flex flex-col'>
            <div className='flex justify-center'>
                <div className='frh:w-3/4'>
                    <Form>
                        <Form.Group className='mb-2' controlId='cantitate'>
                            <Form.Label>Cantitate</Form.Label>
                            <Form.Control inputMode='numeric' ref={cantitateRef} onChange={(e) => {setCantitate(e.target.value)}} type='input'></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='barcode'>
                            <Form.Label>Barcode</Form.Label>
                            <Form.Control type='input' onChange={(e) => {setBarcode(e.target.value)}} value={barcode}></Form.Control>
                        </Form.Group>
                    </Form>
                </div>
                <div className='frh:w-1/4 frh:pl-5'>
                    <Button className="frh:h-full w-full btn btn-block btn-flat btn-save-custom"><FontAwesomeIcon className='frh:text-7xl leading-10' icon={faSave}/></Button>
                </div>
            </div>
            <Search setBarcode={setBarcode} setCantitate={setCantitate} focusCantitate={focusCantitate}/>
        </div>
    );
}