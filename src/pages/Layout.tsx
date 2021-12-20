import { Outlet, Link } from "react-router-dom";

import { routes } from '../router'

export const Layout = () => {
    return (
        <div>
            <nav>
                <ul>
                    {Object.keys(routes).map((routeKey: string) => routes[routeKey].path && (
                        <li key={routeKey}>
                            <Link to={routes[routeKey].path as string}>{routeKey}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <Outlet />
        </div>
    );
};