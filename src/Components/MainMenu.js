// Just create a basic page with a header and a footer
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/MainMenu.css';


export const MainMenu = () => {
    return (
        <div className="main-menu">
        <header>
            <h1>My App</h1>
            <nav>
            <ul>
                <li>
                <Link to="/">Login</Link>
                </li>
                <li>
                <Link to="/registration">Registration</Link>
                </li>

            </ul>
            </nav>
        </header>

        <footer>
            <p>&copy; {new Date().getFullYear()} My App</p>
        </footer>
        </div>
    );
    };
