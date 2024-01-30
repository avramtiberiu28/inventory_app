import { useAuth } from '../login/AuthContext';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Table from '../table/table'
import FormScan from '../form/formScan';


export default function Body () {

    const { logout, isLoggedIn } = useAuth(); // Folosirea hook-ului de autentificare
    const [registrationResult, setRegistrationResult] = useState(null);
    const handleLogout = () => {
        logout();
    }
    
    useEffect(() => {
        // Dacă există un rezultat de înregistrare, setează un timeout pentru a șterge rezultatul după 10 secunde
        if (registrationResult) {
          const timeoutId = setTimeout(() => {
            setRegistrationResult(null);
          }, 5000);
    
          // În cazul în care componenta este dezmontată înainte ca timeout-ul să se termine, curăță timeout-ul
          return () => clearTimeout(timeoutId);
        }
      }, [registrationResult]);

    const callout = () => {
        if (registrationResult === 'success') {
            return (
                <div className='callout callout-success'>
                    Înregistrarea a fost realizată cu succes!
                </div>
            );
        } 
        else if (registrationResult === 'error') {
            return (
                <div className='callout callout-danger'>
                    A apărut o eroare în timpul înregistrării. Vă rugăm să încercați din nou.
                </div>
            );
        }
        else {
            return null;
        }
      };

    return (
        <>
        <div className='frh:w-screen frh:px-10 frh:py-5 flex flex-col'>
            <FormScan setRegistrationResult={setRegistrationResult}/>
            <Table />
            {callout()}
            {isLoggedIn && (
                <div className='frh:mt-5'>
                    <Button className='w-full btn-danger btn-logout' onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            )}
        </div>
        </>        
    ) 
}