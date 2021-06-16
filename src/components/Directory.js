import React, { Component } from "react";
import API from "../utils/API";
import Employees from "./Employees";
import Search from "./Search";

class Directory extends Component {
    state = {
        search: "",
        employees: [],
        filteredResults: [],
        sortDirections: this.initialSortDirections,
    };

    get initialSortDirections() {
        return {
          name: "",
          phone: "",
          email: "",
          dob: "",
        };
    }

    componentDidMount() {
        API.getEmployees()
        .then((res) => 
            this.setState({
                employees: res.data.results,
                filteredResults: res.data.results,
            })
        )
        .catch((err) => console.log(err));
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        this.setState({ search: value });
        this.filteredResults(value.toLowerCase().trim);
    };
    handleFormSubmit = (event) => {
        event.preventDefault();
    };

    sortBy = (key, primary = 0, secondary = 0) => {
        let sortedResults = this.state,filteredResults;
        if (this.state.sortDirections[key]) {
            this.setState({
                filteredResults = sortedResults.reverse(),
                sortDirections: {
                    ...this.initialSortDirections,
                    [key]: this.state.sortDirections[key] === "asc" ? "desc" : "asc",
                },
            });
        } else {
            sortedResults = this.state.filteredResults.sort((a, b) => {
                a = a[key];
                b = b [key];

            if (primary) {
                if (secondary && a[primary] === b[primary]) {
                    return a[secondary].localeCompare(b[secondary]);
                }
                return a[primary].localeCompare(b[primary]);
            } else {
                return a.localeCompare(b);
            }
        });
        this.setState({
            filteredResults: sortedResults,
            sortDirections: {
                ...this.initialSortDirections,
                [key]: "asc",
            },
        });
        }
    };

    filteredResults = (input) => {
        if(input) {
            this.setState({
                filteredResults: this.state.employees.filter((employee) => {
                    return(
                        employee.name.first
                        .toLowerCase()
                        .concat(" ", employee.name.last.toLowerCase())
                        .icludes(input) 
                        || 
                        employee.phone.icludes(input)
                        ||
                        employee.phone.replace(/[^\w\s]/gi, "").includes(input) 
                        ||
                        employee.email.includes(input) 
                        ||
                        this.formatDate(employee.dob.date).includes(input)
                    );
                }),

            });
        } else {
            this.setState({ filteredResults: this.state.employees });
        }
    };
    formatDate = (date) => {
        date = new Date(date);
        let dob = [];
        dob.push(("0" + (date.getMonth() + 1)).slice(-2));
        dob.push(("0" + date.getDate()).slice(-2));
        dob.push(date.getFullYear());

        return dob.join("-");
    }
    render () {
        return (
            <>
                <Search
                value = { this.state.search}
                handleInputChange = { this.handleInputChange}
                handleFormSubmit = { this.handleFormSubmit}
                />
                <div className="container mt-4">
                    <Employees
                    state = { this.state }
                    sortBy = { this.sortBy }
                    filteredResults = { this.filteredResults }
                    formatDate = { this.formatDate }
                    />
                </div>
            </>
        )
    }
}
export default Directory;
