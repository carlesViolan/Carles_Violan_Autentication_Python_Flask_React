import React from "react";
import { Link } from "react-router-dom";
import logoSW from "../../img/logoSW.png";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/home">
					<span className="navbar-brand mb-0 h1"><img src={logoSW}/></span>
				</Link>
				{/* <div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div> */}
				<div className="ml-auto">					
					<Link to="/login">
						<button className="btn btn-primary">SignUp</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
