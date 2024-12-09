import React, {useEffect, useState} from "react";
import CarService from "../../services/CarService";
import {Car} from "@types";
import Head from "next/head";
import Header from "@components/header";
import PopUp from "@components/PopUp";
import Home from "../index";
import CarsOverviewTable from "@components/cars/CarsOverview";
import CarFilter from "@components/cars/CarFilter";

const Cars: React.FC = () => {
    const [cars, setCars] = useState<Array<Car>>([]);
    const [error, setError] = useState<string>();
    const [buttonPopUp, setButtonPopup] = useState(false);
    const [filteredCars, setFilteredCars] = useState<Array<Car>>([]);


    useEffect(() => {
        setFilteredCars(cars);
    }, [cars]);

    const getAllCars = async () => {
        setError("");
        const response = await CarService.getAllCars();

        if (!response.ok) {
            setError(response.statusText);
        } else {
            const cars = await response.json();
            setCars(cars);
        }
    }
    useEffect(() => {
        getAllCars();
    }, []);

    const handleFilterChange = (filter: { field: string, value: string }) => {
        if (!filter.field || !filter.value) {
            setFilteredCars(cars);
            return;
        }

        const filtered = cars.filter(car => {
            const carValue = car[filter.field as keyof Car];
            if (carValue === undefined) return false;
            
            return String(carValue)
                .toLowerCase()
                .includes(filter.value.toLowerCase());
        });

        setFilteredCars(filtered);
    };

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
                            <CarFilter onFilterChange={handleFilterChange} />
                            <CarsOverviewTable cars={filteredCars} />
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