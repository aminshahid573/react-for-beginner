import { useParams } from "react-router-dom"

function User() {
    const userId = useParams()
    return(
        <>
        <h1 className="text-center bg-gray-600 text-white text-3xl py-4">User : {userId.userid}</h1>
        </>
    )
}

export default User