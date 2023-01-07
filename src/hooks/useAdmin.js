import { useEffect, useState } from "react"

const useAdmin = email => {
    const [isAdmin, setIsAmdin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);
    useEffect(() => {
        fetch(`http://localhost:5000/users/admin/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setIsAmdin(data.isAdmin)
                setAdminLoading(false)
            })
    }, [email])
    return [isAdmin, adminLoading]
}

export default useAdmin;