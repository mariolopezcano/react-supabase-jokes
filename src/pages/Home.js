import { useEffect, useState } from 'react';
import {supabase} from '../supabase/client';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import logo from '../chuck4.png';


function Home() {
    const navigate = useNavigate()
    const [joke, setJoke] = useState('');
    const [showMyJokes, showJokes] = useState([]);

    const fetchData = async () => {
        const results = await axios.get('/.netlify/functions/chuckJokes')
        console.log(results)
        setJoke(results.data.data.value)
    }

    const saveData = async () => {
        try{
            const user = supabase.auth.user();
            const result = await supabase.from("myjokes").insert({
                userid: user.id,
                favorite_joke: joke
            })
            console.log(user)
        }catch{
            console.log('error')
        }
    }
    const getJokes = async () => {
        try{
            const user = supabase.auth.user();
            const showresult = await supabase.from("myjokes").select().eq('userid', user.id)
            console.log('hellooo',showresult.data)
            showJokes(showresult.data)
        }catch{
            console.log('error')
        }
    }
    // const generateJoke = () => {
    //     fetch(API_URL)
    //     .then(res => res.json())
    //     .then(data => setJoke(data.value))
    // }
    // useEffect(() => {
    //     fetchData()
    // }, [])
    useEffect(() => {
        if (!supabase.auth.user()) {
            navigate('/login')
        }
    }, [navigate])

    return(
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <p>Chuck Norris Jokes</p>
            <div>
                <button onClick={fetchData}>
                    Get new joke
                </button>
            </div>
            <div className="myDiv">
                <p dangerouslySetInnerHTML={{__html: joke}}/>
                <button onClick={saveData}>
                    Favorite
                </button>
            </div>
           
            <div>
                <button onClick={getJokes}>
                    My Jokes
                </button>
            </div>
            <div className="myDiv2"> 
                {
                   showMyJokes.map(list_jokes => (
                       <div>
                           <h3>{list_jokes.favorite_joke}</h3>
                       </div>
                   )) 
                }
            </div>
            <div>
            <button onClick={() => supabase.auth.signOut()}>
                Logout
            </button>
        </div>
        </header>
    )
}

export default Home;