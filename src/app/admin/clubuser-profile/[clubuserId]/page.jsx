
"use client"
import { useState, useEffect } from "react";
import { getAllClubUSerClients, getCookie } from "@/actions/auth";
const token = getCookie('token');





const Page = ({ params: { clubuserId } }) => {

    const [clients, setclients] = useState([]);

    const fetchData = async () => {
        try {
            if (clubuserId) {
                const data = await getAllClubUSerClients(token, clubuserId);
                console.log('00:', data);
            }
        } catch (error) { console.error('Error fetching Clients:', error); }
    };


    useEffect(() => { fetchData(); }, []);



    return (
        <>

            {clients && clients.map((user, index) => (
                <>
                    {user.data}
                </>
            ))}

        </>
    )
}


export default Page;