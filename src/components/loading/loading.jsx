// loading.jsx

import React from 'react';
import { Hourglass } from 'react-loader-spinner';
import { Modal } from 'react-bootstrap';

const GlobalLoading = ({ show }) => (
    <Modal show={show} animation={true} style={{opacity:1}} className='modal-loading' centered>
        <Modal.Body className="text-center flex justify-center items-center flex-row">
            <Hourglass wrapperClass='spinner' className='spinner' visible={true} height={40} width={40} colors={["#00a65a","#00a65a"]} radius={0} ariaLabel="tail-spin-loading">Incarcare...</Hourglass>
            <p style={{color:'#00a65a'}} className="mt-2 ml-7">Încărcare...</p>
        </Modal.Body>
    </Modal>
);

export default GlobalLoading;
