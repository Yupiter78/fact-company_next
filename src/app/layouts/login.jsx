import React, { useState } from "react";

const Login = () => {
    const [email] = useState();
    return (
        <form action="">
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={email} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
            </div>
        </form>
    );
};

export default Login;
