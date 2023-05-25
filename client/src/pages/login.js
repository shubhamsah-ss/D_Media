import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false)

  const { auth } = useSelector(state => state)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  useEffect(() => {
    if(auth.token) navigate("/")
  }, [auth.token, navigate])


  const handleChangeInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: [e.target.value],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-uppercase text-center mb-4">D_Media</h3>
        <div className="form-group">
          <label htmlFor="inputEmail">Email address</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            aria-describedby="emailHelp"
            onChange={handleChangeInput}
            value={email}
            name="email"
          />
          <small id="emailHelp" className="form-text text-muted"></small>
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <div className="pass">
            <input
              type={ typePass ? "text": "password" }
              className="form-control"
              id="inputPassword"
              onChange={handleChangeInput}
              value={password}
              name="password"
            />
            <small onClick={()=> setTypePass(!typePass)} >
              {typePass ? "Hide": "Show"}
            </small>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100"
          disabled={email && password ? false : true}
        >
          Login
        </button>

        <p className="my-2">
          You don't have an account?{" "}
          <Link to={"/register"} style={{ color: "crimson" }}>
            Register now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
