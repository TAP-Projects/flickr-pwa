import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav() {
    return (
        <nav className="main-nav">
            <ul>
                <li>
                    <NavLink 
                        to={{
                            pathname: "/hedgehogs",
                            state: '"Baby Animals" Hedgehogs'
                        }} 
                        activeClassName="active"
                    >
                        Hedgies
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to={{
                            pathname: "/sloths",
                            state: '"Baby Animals" Sloths'
                        }} 
                    >
                        Sloths
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to={{
                            pathname: "/wombats",
                            state: '"Baby Animals" Wombats'
                        }} 
                    >
                        Wombats
                    </NavLink>
                </li>
                
            </ul>
        </nav>
    );
}
