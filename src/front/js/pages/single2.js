import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single2 = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	return (
		<div className="container">
			<div className="container-fluid">
						<div className="row">
						<div className="col-sm-3 col-md-6 col-lg-4" style={{ backgroundColor: 'lightgray'}}>
						
									<img src="..." className="img-fluid rounded-start" alt="..." />
															
						</div>
						<div className="col-sm-9 col-md-6 col-lg-8">
						{ <h5 className="card-title">{store.planetas[params.theid].name}</h5> }
										<p className="card-text">It is a long established fact that a reader will be 
											distracted by the readable content of a page when looking at its layout. 
											The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, 
											sometimes by accident, sometimes on purpose (injected humour and the like)..</p>				
							</div>
					</div>
					<div className="row">
						<div className="col-md-12" style={{textAlign:'center'}}>
								<p id="lineRed" style={{ borderBottom: 'solid', borderColor:'red', marginTop: '10px' }}></p>
								<span className="display-8" style={{ float: 'left', color:'red', margin:'20px' }}>Name:<br></br> {store.planetas[params.theid].name}</span>
								<span className="display-8" style={{ float: 'left', color:'red', margin:'20px' }}>diameter:<br></br> {store.planetas[params.theid].diameter}</span>
								<span className="display-8" style={{ float: 'left', color:'red', margin:'20px' }}>rotation_periodr: <br></br>{store.planetas[params.theid].rotation_period}</span>
								<span className="display-8" style={{ float: 'left', color:'red', margin:'20px' }}>orbital_period: <br></br>{store.planetas[params.theid].orbital_period}</span>
								<span className="display-8" style={{ float: 'left', color:'red', margin:'20px' }}>gravity:<br></br> {store.planetas[params.theid].gravity}</span>
								<span className="display-8" style={{ float: 'left', color:'red', margin:'20px' }}>population: <br></br>{store.planetas[params.theid].population}</span>
								
					
							</div>
					</div>
					</div>
					<Link to="/">
						<span className="btn btn-success btn-lg" href="#" role="button">
							Home
						</span>
					</Link>
		</div>
	);
};

Single2.propTypes = {
	match: PropTypes.object
};
