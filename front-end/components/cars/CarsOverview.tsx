import {Car} from "@types";

type Props = {
    cars:Array<Car>;
};

const CarsOverviewTable: React.FC<Props> = ({cars}) => {
    return (
        <>
            {
                cars && (
                    <table className="cars-table">
                        <thead className="cars-thead">
                            <tr>
                                <th>Chassis number</th>
                                <th>Brand</th>
                                <th>Model</th>
                            </tr>
                        </thead>
                        <tbody className="cars-tbody">
                        {cars.map((car, index) => (
                            <>
                                <tr key={index}>
                                <td className="cars-td">{car.chassisNumber}</td>
                                <td>{car.brand}</td>
                                <td>{car.model}</td>
                                </tr>
                            </>
                        ))}
                        </tbody>
                    </table>
                )
            }
        </>
    )
}

export default CarsOverviewTable;