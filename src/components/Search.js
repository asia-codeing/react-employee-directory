import React from "react";

function Search(props) {
    return (
        <nav>
            <form onSubmit={props.handleFormSubmit}>
                <input
                value={props.value}
                name="search"
                onChange={props.handleInputChange}
                type="search"
                placeholder="Search"
                />
            </form>
        </nav>
    );
};
export default Search;
