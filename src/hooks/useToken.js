import { useEffect, useState } from "react"

const useToken = email => {
    const [token, setToken] = useState('');
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/jwt?email=${email}`)
                .then(response => response.json())
                .then(data => {
                    const jsonToken = data.accessToken;
                    if (jsonToken) {
                        localStorage.setItem('user-token', jsonToken);
                        setToken(jsonToken)
                    }
                })
        }
    }, [email])
    return [token]
}

export default useToken;