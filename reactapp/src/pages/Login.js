import React from "react";

import { Link } from "react-router-dom";
import { Input, Button, Checkbox } from "antd";

import "../styles/Login.css";

const Login = () => {
    return (
        <div className="Login-page">

            {/* Sign-In */}
            <div className="Sign">
                <Input
                className="Login-input"
                placeholder="louisfeuillette@outlook.com"
                />

                <Input.Password className="Login-input" placeholder="password" />

                <Link to="/dashboard-user">
                    <Button href="" style={{ width: "80px" }} type="primary">
                        Sign-in
                    </Button>
                </Link>
            </div>

            {/* Sign-Up */}
            <div className="Sign">
                <Input className="Login-input" placeholder="Louis F" />

                <Input.Password className="Login-input" placeholder="password" />

                <Checkbox style={{padding: "0px 15px 10px 15px"}}>Es-tu un admin ?</Checkbox>

                <Link to="/">
                    <Button href="" style={{ width: "80px" }} type="primary">
                        Sign-up
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Login;
