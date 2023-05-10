import React, {useContext} from "react";
import {Route, Redirect, redirect} from "react-router-dom";
import {AuthContext} from "./auth";

const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    const {currentUser} = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={routeProps =>
                !!currentUser ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    redirect("/login")
                )
            }
        />
    );
}

export default PrivateRoute;