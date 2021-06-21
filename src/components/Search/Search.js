import React from "react";
import "./style.css"

function Search(props) {
    return (
        <nav>
            <form onSubmit={props.handleFormSubmit}>
                <input
                name="search"
                onChange={e => props.handleInputChange(e)}
                type="search"
                placeholder="Search"
                />
            </form>
        </nav>
    );
};
export default Search;
