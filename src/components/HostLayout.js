import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

function HostLayout() {
    const activeHost = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    return (
        <div>
            <nav className='host-nav'>
                <NavLink
                    to="."
                    end
                    style={({ isActive }) => isActive ? activeHost : null}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="income"
                    style={({ isActive }) => isActive ? activeHost : null}

                >
                    Income
                </NavLink>

                <NavLink
                    to="vans"
                    style={({ isActive }) => isActive ? activeHost : null}

                >
                    Vans
                </NavLink>

                <NavLink
                    to="reviews"
                    style={({ isActive }) => isActive ? activeHost : null}
                >
                    Reviews
                </NavLink>
            </nav>
            <Outlet />
        </div>
    )
}

export default HostLayout