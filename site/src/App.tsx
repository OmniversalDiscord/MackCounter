import {useEffect, useState} from "react";
import CountUp from "react-countup";
import "./App.css";

async function makeRequest(endpoint: string, token?: string, method?: string): Promise<Response> {
    let requestProperties: RequestInit = {}

    if (token != null) {
        requestProperties.headers = {Authorization: `Bearer ${token}`}
    }

    if (method != null) {
        requestProperties.method = method;
    }

    return fetch(`.netlify/functions/${endpoint}`, requestProperties);
}

function App() {
    const [count, setCount] = useState<number | null>(null);
    const [authorized, setAuthorized] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        const load = async () => {
            // Check if user is authorized to add mack moments
            let token = localStorage.getItem("token");
            if (token != null) {
                const res = await makeRequest("isAuthorized", token);
                const body = await res.text();
                setAuthorized(body === "true");
                setToken(token);
            }

            // Get count
            let res = await makeRequest("getCount");
            let count = await res.text();
            setCount(parseInt(count));
        }

        load().catch(console.error);
    }, []);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key == "A") {
                authorize().then();
            }
        }

        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        }
    }, []);

    const addMoment = async () => {
        await makeRequest("addMoment", token, "POST");
        setCount(count! + 1);
    }

    const authorize = async () => {
        console.log("penis");
        const token = prompt("Enter admin token") ?? "";
        const res = await makeRequest("isAuthorized", token);
        const body = await res.text();
        if (body != "true") {
            return;
        }

        localStorage.setItem("token", token);
        setAuthorized(true);
        setToken(token);
    }

    if (count === null) {
        return (
            <div className="App">
                <h1 className="loading">Counting moments...</h1>
            </div>
        );
    }

    return (
        <div className="App">
            <CountUp className="count" end={count} duration={1.5} useEasing={true}/>
            <p className="subtitle">"oh wait I gotta go eat" or leaving the vc unannounced moments</p>
            <p className="date">since October 9th, 2022</p>
            {authorized && <button onClick={addMoment}> Add moment </button>}
        </div>
    );
}

export default App;
