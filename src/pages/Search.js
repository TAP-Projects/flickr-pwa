import React from 'react';
import { useLocation } from "react-router-dom";
import FormContainer from '../components/FormContainer';
import SearchResults from '../components/SearchResults';

// Custom hook 'useQuery' wraps the query string found in useLocation().search in the browser's URLSearchParams API, providing a bunch of methods. It's overkill here, but means that you could set things up to include all sorts of API settings in the future. Below we get the query with queryParams.get("query")
function useQuery() {
    // Use the browser's URLSearchParams API
    return new URLSearchParams(useLocation().search);
}

export default function Search() {

    // The query can come from location.state or from location.search. When the user clicks on '/hedgehogs' or one of the other URL parameter pages in the nav component, a custom location object sends them here with the query terms held in location.state. When the user searches from the search form on any page, the query terms are stored in location.search as query parameters.
    const { state } = useLocation();
    const queryParams = useQuery();
    let theQuery = state || queryParams.get("query");
    console.log("In Search, theQuery is: ", theQuery)

    return (
        <>
            <FormContainer />
            <SearchResults query={theQuery} />
        </>
    );
}
