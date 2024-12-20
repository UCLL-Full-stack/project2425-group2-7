import Head from 'next/head'
import Header from '@components/header'
import React, { useState, useEffect } from 'react'
import PopUp from '@components/LoyaltycardPopIp';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import UserTestingTable from "@components/UserTestingTable";
import UserService from "@services/userService";
import {User} from "@types";
interface UserData {
  token: string;
  fullName: string;
  username: string;
  role: string;
}
const users: User[] = [
    {id: 1000, password: "kong", username: "kong", email: "kong@", role: "ADMIN", firstName:"kong", lastName: "kong"},
    {id: 2000, password: "laurien", username: "laurien", email: "laurien@", role: "CUSTOMER", firstName:"laurien", lastName: "laurien"}

]


const Home: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const userTier = 'Gold';
    const [error, setError] = useState<string>();

    // this bit has to be changed to a few users from seed.ts for the lecturer
    /**
    const getAllUsers = async () => {
        const response = await UserService.getUsers();
        setError("")
        if (!response.ok) {
            setError(response.statusText);
        } else {
            const users = await response.json()
            setUsers(users);
        }
    }
     *
     */

    const { t } = useTranslation();

    useEffect(() => {
        const storedUser = sessionStorage.getItem("loggedInUser");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUserData(parsedUser);
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);

    return (
        <>
            <Head>
                <title>Car Dealer</title>
                <meta name="description" content="Car dealer app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <script src="https://cdn.tailwindcss.com"></script>
            </Head>
            <Header/>
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-6">{t("home.header")}</h1>
                <p className="text-lg text-gray-700 mb-8">
                    {t("home.ptext")}
                </p>
                {(userData?.role === "CUSTOMER") && (
                    <button 
                        onClick={() => setShowPopup(true)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                                 transition-colors duration-200"
                    >
                        {t("home.button")}
                    </button>
                )}
                {users && (
                    <><h2>Testing users</h2><UserTestingTable users={users} /></>
                )}
                <PopUp 
                    trigger={showPopup}
                    setTrigger={setShowPopup}
                    tier={userTier}
                />
            </main>
        </>
    );
};
export const getServerSideProps = async(context: { locale: any; }) =>{
    const {locale} = context
    return{
        props:{
            ...(await serverSideTranslations(locale ?? "en", ["common"]))
        },
    };
};

export default Home;