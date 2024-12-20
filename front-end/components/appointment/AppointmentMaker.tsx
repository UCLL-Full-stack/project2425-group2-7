import {useEffect, useState} from "react";
import {Admin, Customer, Appointment} from "@types";
import customerService from "@services/CustomerService";
import appointmentService from "@services/AppointmentService";
interface Props {
    admins: Admin[]
    appointments: Appointment[]
}
const AppointmentMaker: React.FC<Props> = ({admins, appointments}) => {
    // if logged in user is customer, show form, else show appointment overview

    const [key, setKey] = useState("");
    const [adminId, setAdminId] = useState("");
    const [date, setDate] = useState("");
    const [role, setRole] = useState("");
    const [loggedInId, setLoggedInId] = useState("");

    // prevent submitting from reloading the page
    // when submitting it has to look for the customer by ID, admin by name -> extract ID

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await customerService.findCustomerByUserId(parseInt(loggedInId)); // NEEDS ID <- USERID
        const customer = await response.json()
        console.log(customer);

        console.log("adminid",adminId, role, "UUUUUUUUUUUUUUUUUUSEEEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRRRRRRRRRR",loggedInId);
        const appointmentResponse = await appointmentService.addAppointment({
            adminId: parseInt(adminId),
            date: new Date(date),
            customerId: customer.id
        })
        alert("appointment created")



    };

    useEffect(() => {
        const role = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}")?.role;
        const loggedInId = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}")?.id;
        const css = window.sessionStorage.getItem("loggedInUser");
        console.log(role)
        setKey(css!)
        setRole(role)
        setLoggedInId(loggedInId)
    }, []);

    // if role is customer return a form else return a list of appointments in a table

    return role == "CUSTOMER" ? (
        <div
            id="appointmentMaker"
            className="flex justify-center items-center min-h-screen bg-gray-100"
        >
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
            >
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                    Make an Appointment
                </h2>
                <div className="mb-4">
                    <label
                        htmlFor="admin"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Choose Admin
                    </label>
                    <select
                        id="admin"
                        value={adminId || ""}
                        onChange={(e) => setAdminId(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    >
                        <option value="" disabled>
                            Select an admin
                        </option>
                        {admins.map((admin, index) => (
                            <option key={index} value={admin.id}>
                                {admin.user.firstName+" "+admin.user.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="date"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Choose Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none"
                >
                    Submit
                </button>
            </form>
        </div>
    ) : role == "ADMIN" ? <div id="appointmentOverview">
            <table>
                <thead>
                <tr>
                    <th>Customer</th>
                    <th>Admins</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {appointments.map((appointment, index) => (
                    <tr key={index}>
                        <td>{appointment.customers.map((customer) => (
                            <span key={customer.id} className="block">
                            {customer.user.firstName} {customer.user.lastName}
                            </span>
                        ))}</td>
                        <td>{appointment.date.valueOf()}</td>
                        <td>{appointment.admins.map((admin) => (
                            <span key={admin.id} className="block">
                            {admin.user.firstName} {admin.user.lastName}
                            </span>
                        ))}</td>
                    </tr>
                ))}
                </tbody>
            </table>
    </div> : null
}

export default AppointmentMaker;