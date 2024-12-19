import CarsOverview from "@components/cars/CarsOverview";
import { render, screen } from "@testing-library/react";
import test from "node:test";
import { expect } from "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import React from "react";

window.React= React
const cars = [
    {
        brand: "BMW",
        model: "M4",
        price: 50000,
        condition: "new",
        status: "available",
        chassisNumber: "123456",
    },
    {
        brand: "Audi",
        model: "R8",
        price: 40000,
        condition: "used",
        status: "available",
        chassisNumber: "654321",
    },
]
test("renders cars component", async () => {
    render(<CarsOverview cars={[]}/>);

    expect(screen.getByText("Chassis Number")).toBeInTheDocument();

});


