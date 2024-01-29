import { Form, Button, Row, Col } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

export default function FormScan () {

    const [barcode, setBarcode] = useState('');
    const [cantitate, setCantitate] = useState('');
    const [search, setSearch] = useState('');

    return(
        <div className='flex flex-col'>
            <div className='flex justify-center'>
                <div className='frh:w-3/4'>
                    <Form>
                        <Form.Group className='mb-2' controlId='cantitate'>
                            <Form.Label>Cantitate</Form.Label>
                            <Form.Control inputMode='numeric' autoFocus type='input'></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='barcode'>
                            <Form.Label>Barcode</Form.Label>
                            <Form.Control type='input'></Form.Control>
                        </Form.Group>
                    </Form>
                </div>
                <div className='frh:w-1/4 frh:pl-5'>
                    <Button className="frh:h-full w-full btn btn-block btn-flat btn-save-custom"><FontAwesomeIcon className='frh:text-7xl leading-10' icon={faSave}/></Button>
                </div>
            </div>
            <div className='frh:w-full'>
                <Form.Group className='mt-2' controlId='cautare'>
                    <Form.Label>Cautare</Form.Label>
                    <Form.Control placeholder='Cautare'></Form.Control>
                </Form.Group>
            </div>
        </div>
    );
}