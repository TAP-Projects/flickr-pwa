import React from 'react';
import { Link, useLocation } from "react-router-dom";

export default function NoMatch() {
    let location = useLocation();
    return (
        <div>
            <h2>Route/Page Not Found</h2>
            <h3>
                Sorry. There does not appear to be a match for <strong><code>{location.pathname}</code></strong>. 
            </h3>
            <p>Return <Link to="/">Home</Link>.</p>
        </div>
    );
}
