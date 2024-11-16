import React, {useEffect, useState} from "react";
import CarService from "../../services/CarService";
import {Car} from "@types";
import Head from "next/head";
import Header from "@components/header";
import PopUp from "@components/PopUp";
import Home from "../index";
import CarsOverviewTable from "@components/cars/CarsOverview";

const Cars: React.FC = () => {
    const [cars, setCars] = useState<Array<Car>>([]);
    const [error, setError] = useState<string>();
    const [buttonPopUp, setButtonPopup] = useState(false)

    useEffect(() => {
        getAllCars();
    }, []);
    const getAllCars = async () => {
        setError("");
        const response = await CarService.getAllCars();

        if (!response.ok) {
            setError(response.statusText);
        } else {
            const cars = await response.json();
            setCars(cars);
        }

    } // all this above fetches cars from the in-memory db (CarService fetch -> CarService backend -> CarRepo) and if response ok then transform to json and
    // setCars(cars) to use as Prop for CarsOverview component (which is the table)
    return (
        <>
            <Head>
                <title>Car acquisition</title>
            </Head>
            <Header/>
            <main>
                <section>
                    {cars && (
                        <>
                            <h2>Available cars</h2>
                            <CarsOverviewTable cars={cars} />
                            <button onClick={() => setButtonPopup(true)} className="add-car-btn">Add new car</button>
                
                        </>
                    )}
                </section>
            </main>
            <PopUp trigger={buttonPopUp} setTrigger={setButtonPopup}>
                    <p>Are you sure you want to add this car?</p> 
                </PopUp>
        </>
    )
}

export default Cars;