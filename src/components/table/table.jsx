import { useEffect } from "react";
import $ from 'jquery';
import 'datatables.net';
import DataTable from "datatables.net-dt";
import 'datatables.net-responsive-dt';

export default function Table(){
    //const API_URL = import.meta.env.VITE_API_URL;
    useEffect(() => {
        initializeDataTable();

        return () => {
            // Distrugerea DataTable la dezmontare
            const dataTable = $('#table_items').DataTable();
            dataTable.destroy();
        }
    }, []);


    const handleRowClick = (data) => {
        console.log(data);
    }

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
            scrollCollapse: true,
            scrollY: '32vh',
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
                //console.log('row: ',row, 'data: ',data, 'index: ',index)
                row.addEventListener('click', () => handleRowClick(data));
            },
            rowCallback: function(tr, row, data, index) {
                //console.log('tr: ', tr, 'row: ', row, 'data: ', data, 'index: ', index)
                //$(tr).prop('id', row.id_ticket);
                //$(tr).attr('selected', false);
            },
        });
    };

    return (
        <div className='flex mt-10'>
            <table id='table_items' className='table frh:w-full border-2'>
                <tbody>

                </tbody>
            </table>
        </div>
    )
}