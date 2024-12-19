import {User} from "@types";

interface Props {
    users: User[];
}



const UserTestingTable: React.FC<Props> = ({users}) => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <table className="w-3/4 bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Username</th>
                    <th className="py-3 px-6 text-left">Password</th>
                    <th className="py-3 px-6 text-left">Role</th>
                </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                {users.map((user) => (
                    <tr
                        key={user.id}
                        className="border-b border-gray-200 hover:bg-gray-100"
                    >
                        <td className="py-3 px-6 text-left">{user.username}</td>
                        <td className="py-3 px-6 text-left">{user.password}</td>
                        <td className="py-3 px-6 text-left">{user.role}</td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTestingTable;