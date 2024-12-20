import {useEffect, useState} from "react";
import {Admin, Customer, Appointment, DeleteAppointmentInput} from "@types";
import customerService from "@services/CustomerService";
import appointmentService from "@services/AppointmentService";
interface Props {
    admins: Admin[]
    appointments: Appointment[]
    onDelete: (id: DeleteAppointmentInput) => void | Promise<void>
}
const AppointmentMaker: React.FC<Props> = ({admins, appointments, onDelete}) => {
    // if logged in user is customer, show form, else show appointment overview

    const [adminId, setAdminId] = useState("");
    const [date, setDate] = useState("");
    const [role, setRole] = useState("");
    const [loggedInId, setLoggedInId] = useState("");
    const [error, setError] = useState<string>();

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
    };

    /**
     * delete an appointment by ID is a function in the parent component thats being run here by onDelete
     * @param id
     */

    useEffect(() => {
        const role = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}")?.role;
        const loggedInId = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}")?.id;
        console.log(role)
        setError("");
        setRole(role)
        setLoggedInId(loggedInId)
    }, []);

    // if role is customer return a form else return a list of appointments in a table

    return role == "CUSTOMER" && error == ""? (
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
        <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-md rounded-md">
            <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
                <th className="px-4 py-2 border-b">Customer</th>
                <th className="px-4 py-2 border-b">Admins</th>
                <th className="px-4 py-2 border-b">Date</th>
                <th className="px-4 py-2 border-b">Action</th>
            </tr>
            </thead>
            <tbody>
            {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">
                        {appointment.customers.map((customer) => (
                            <span key={customer.id} className="block">
              {customer.user.firstName} {customer.user.lastName}
            </span>
                        ))}
                    </td>
                    <td className="px-4 py-2 border-b">
                        {appointment.admins.map((admin) => (
                            <span key={admin.id} className="block">
              {admin.user.firstName} {admin.user.lastName}
            </span>
                        ))}
                    </td>
                    <td className="px-4 py-2 border-b">{new Date(appointment.date).toLocaleString()}</td>
                    <td className="px-4 py-2 border-b text-center">
                        <button
                            onClick={() => onDelete({id: appointment.id})}
                            className="text-red-600 hover:text-red-800 font-medium"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div> : null
}

export default AppointmentMaker;