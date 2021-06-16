import React from "react";

const Employees = (props) => {
    return(
        <table>
            <thead>
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col" data-field="name" data-sortable="true">
                        <span onClick={() => props.sortBy("name", "last", "first")}>
                            Name
                        </span>
                    </th>
                    <th scope="col">
                        <span onClick={() => props.sortBy("phone")}>Phone</span>
                    </th>
                    <th scope="col">
                        <span onClick={() => props.sortBy("email")}>Email</span>
                    </th>
                    <th scope="col">
                        <span onClick={() => props.sortBy("dob", "date")}>DOB</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.state.filteredResults.map((employee) => {
                    const { first, last } = employee.name;
                    const fullName = `${first} ${last}`;
                    const dob = props.formatDate(employee.dob.date);

                    return (
                        <tr key={employee.login.uuid}>
                            <td>
                                <img src={employee.picture.thumbnail} alt={fullName}/>
                            </td>
                            <td>{fullName}</td>
                            <td>
                                <a href={`tel: +1${employee.phone}`}>{employee.phone}</a>
                            </td>
                            <td>
                                <a href={`mailto: +1${employee.email}`}>{employee.email}</a>
                            </td>
                            <td>{dob}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
export default Employees;