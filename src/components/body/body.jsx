import { useAuth } from '../login/AuthContext';
import { Button, Alert } from 'react-bootstrap';
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
          }, 15000);
    
          // În cazul în care componenta este dezmontată înainte ca timeout-ul să se termine, curăță timeout-ul
          return () => clearTimeout(timeoutId);
        }
      }, [registrationResult]);

    const callout = () => {
        if (registrationResult === 'success') {
            return (
                <Alert style={{opacity: 1}} variant='success'>
                    Înregistrarea a fost realizată cu succes!
                </Alert>
                
            );
        } 
        else if (registrationResult === 'error') {
            return (
                <Alert className='alert' style={{opacity: 1}} variant='danger'>
                    A apărut o eroare în timpul înregistrării. Vă rugăm să încercați din nou.
                </Alert>
            );
        }
        else if (registrationResult === 'warning') {
            return (
                <Alert className='alert' style={{opacity: 1}} variant='warning'>
                    Articolul nu se afla in baza de date.
                </Alert>
            );
        }
        else {
            return null;
        }
      };
    
      // Ascultă evenimentul de deschidere a tastaturii
      window.addEventListener('resize', () => {
        //console.log('test');
        // Verifică dacă tastatura este deschisă sau închisă și ajustează poziția notificării
    });
    return (
        <>
        <div className='frh:w-screen frh:px-10 frh:py-5 flex flex-col body'>
            {/*{isLoading && <TailSpin className='spinner' visible={true} height={80} width={80} color="#00a65a" ariaLabel="Incarcare...">Incarcare...</TailSpin>}*/}
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