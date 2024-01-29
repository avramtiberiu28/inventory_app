import { Form, Button, Row, Col } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '../login/AuthContext';


export default function Body () {
    const API_URL = import.meta.env.VITE_API_URL;

    const [barcode, setBarcode] = useState('');
    const [cantitate, setCantitate] = useState('');
    const { logout, isLoggedIn } = useAuth(); // Folosirea hook-ului de autentificare

    const handleLogout = () => {
        logout();
    }
    
    useEffect(() => {
        initializeDataTable();

        return () => {
            // Distrugerea DataTable la dezmontare
            const dataTable = $('#table_items').DataTable();
            dataTable.destroy();
        }
    }, []);


    const initializeDataTable = () => {
        let nr_tableta = localStorage.nr_tableta;
        let url= `http://${API_URL}:3002/aduArticoleScanate/${nr_tableta}`
        
        $('#table_items').DataTable({
            responsive : false,
            destroy: true,  
            searching: false,
            fixedHeader: true,
            info: false,
            paging: false,
            scrollY: '42vh',
            scrollX: '90vw',
            lengthChange: false,
            ordering: false,
            ajax: {
                url: url,
                type: "GET",
                dataSrc : ""
            },
            columns: [
                { title: "Denumire articol", data: 'description'},
                { title: "Cantitate", data: 'quantity'},
            ],
            language: {
                sSearch : 'Cautare:',
                sEmptyTable:     "Nu exista date in tabel",
                sLoadingRecords: "Se incarca...",
                sProcessing:     "Procesare...",
                sZeroRecords:    "Nu s-au gasit inregistrat",
                oPaginate: {
                    sFirst:    "Prima",
                    sLast:     "Ultima",
                    sNext:     "Urmatoarea",
                    sPrevious: "Anterioara"
                },
            },
            createdRow: function (row, data, index){
                console.log('row: ',row, 'data: ',data, 'index: ',index)
                //row.addEventListener('click', () => handleRowClick(data));
            },
            rowCallback: function(tr, row, data, index) {
                console.log('tr: ', tr, 'row: ', row, 'data: ', data, 'index: ', index)
                //$(tr).prop('id', row.id_ticket);
                //$(tr).attr('selected', false);
            },
        });
    };
    
    return (
        <>
        <div className='max-[720px]:w-screen max-[720px]:px-10 max-[720px]:py-5 flex flex-col'>
            <div className='flex'>
                <div className='max-[720px]:w-3/4'>
                    <Form className=''>
                        <Form.Group controlId='cantitate'>
                            <Form.Label>Cantitate</Form.Label>
                            <Form.Control inputMode='numeric' autoFocus type='input'></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='barcode'>
                            <Form.Label>Barcode</Form.Label>
                            <Form.Control type='input'></Form.Control>
                        </Form.Group>
                    </Form>
                </div>
                <div className='max-[720px]:w-1/4 max-[720px]:pl-5'>
                    <Button className="max-[720px]:h-full btn btn-block btn-flat btn-login-custom"><FontAwesomeIcon className='max-[720px]:text-7xl leading-10' icon={faSave}/></Button>
                </div>
            </div>
            <div className='flex mt-10'>
                <table id='table_items' className='table max-[720px]:w-full border-2'>
                    <tbody>

                    </tbody>
                </table>
            </div>
            {isLoggedIn && (
                <div className='max-[720px]:w-3/4 max-[720px]:mt-5'>
                    <Button className='w-3/4 btn btn-block btn-flat btn-danger' onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            )}
        </div>
        </>        
    ) 
}