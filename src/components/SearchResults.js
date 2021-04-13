import React, { useEffect } from "react";
import { useErrorStatus } from "./ErrorHandler.js";
import { useCache } from "./DataCache.js"
import { buildURL } from "../js/buildURL.js";
import PhotoContainer from "./PhotoContainer.js";
import Loading from "./Loading.js";

export default function SearchResults({query}){

    // Set the cache
    const { cache, setCache } = useCache();
    // Set the error status, if applicable
    const { setErrorStatusCode } = useErrorStatus();

    // Capitalize the first letter of each query term
    function formatPageHeading(queryTerms){ 
        return queryTerms.split(' ').map( word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');  
    }
    // Set the page heading before render
    //* NOTE: It might be cool to render the page header immediately
    const pageHeading = formatPageHeading(query);

    console.log("After render finishes, but before useEffect starts, the cache looks like this: ", cache)
    
    useEffect( 
        // Callback wrapper. useEffect will not allow a function inside it to return a promise, so we define a function here that itself defines our fetch function and then immediately calls it.  The wrapper's only dependency is "query".
        () => {
            // Async wrapper. We need an async wrapper to allow us to await our fetch results. Some people create a separate "handleAsync", but it's not really necessary here. Or you could use something like Axios which would take care of those details for you.
            async function fetchIt() {
                // Exit if the data is already cached for the given query
                if(typeof cache[query] !== "undefined") return;
                try {
                    // Await fetching the response stream
                    const resp = await fetch(buildURL(query));
                    // If fetch fails, set the errorStatusCode in ErrorHandler
                    if (!resp.ok) {
                        console.error(`HTTP error during fetch. Status: ${resp.status}`);
                        setErrorStatusCode(resp.status);
                    // If fetch succeeds, await the parsing of the stream and then setData. To setData I pass a callback that uses the previous state and returns a new state object that deconstructs previous state and adds the new state, without ever mutating the original state.
                    } else {
                        const parsedResp = await resp.json();
                        await setCache( prevCache => ({
                            ...prevCache,
                            [query]: {
                                // I created the page heading up above
                                pageHeading: pageHeading
                                , 
                                data: parsedResp
                            },
                        }
                        ));
                    }
                }
                // Catch any other errors and set the errorStatusCode in ErrorHandler
                catch (error) {
                    console.error("Caught in fetch: ", error);
                    setErrorStatusCode(error.status);
                }
            }
            // Now we call fetchIt
            fetchIt();
        }
        // The only dependency of our useEffect callback. Whenever query changes, useEffect will update the UI.
        ,[query]
    )

    // The cache that is sent to the PhotoContainer will come from the CacheProvider, which is wrapped in the useCache custom hook. If the query wasn't already cached, then fetchIt will run, the new query and its cache will be cached, and finally the component will be rendered.
    return (
        <>
            <h2>{pageHeading ? 'Results for ' + pageHeading : 'No Page Heading'}</h2>
            {
                (typeof cache[query] !== "undefined") 
                ? 
                <PhotoContainer data={cache[query].data} /> 
                : 
                <Loading />
            }
        </>
        )
}
