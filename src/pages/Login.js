// import logo from '../logo.svg';
import logo from '../chuck4.png';
import { useEffect, useState } from "react";
import {supabase} from '../supabase/client';
import {useNavigate} from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const result = await supabase.auth.signIn({
                email
            })
            setMessage('¡Check your email!')
            console.log(result);
        }catch (error){
            console.error(error);
        }   
    }

    useEffect(() => {
        if (supabase.auth.user()) {
            navigate("/");
        }
    }, [navigate])

    return (    
    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p><h2>Welcome to Chuck Norris Jokes</h2></p>
        <p>Confirm your email address to login.</p>
         <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="youremail"
                    onChange={(e) => setEmail(e.target.value)}
                />
            <button>
                LOG IN
            </button>
            </form> 
            <p dangerouslySetInnerHTML={{__html: message}}/>    
        </div>
      </header>
    )
}

export default Login