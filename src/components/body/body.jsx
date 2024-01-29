import { useAuth } from '../login/AuthContext';
import { Button } from 'react-bootstrap';
import Table from '../table/table'
import FormScan from '../form/formScan';


export default function Body () {

    const { logout, isLoggedIn } = useAuth(); // Folosirea hook-ului de autentificare
    const handleLogout = () => {
        logout();
    }
    
   
    
    return (
        <>
        <div className='frh:w-screen frh:px-10 frh:py-5 flex flex-col'>
            <FormScan />
            <Table />
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