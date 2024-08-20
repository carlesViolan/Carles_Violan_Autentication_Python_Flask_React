import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Link } from "react-router-dom";
import "../../styles/home.css";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			{/* <h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p> */}
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			{/* <p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p> */}

		<div className="container">
            
			<h1 className="titleCharacters" style={{ color: 'red' }}>Characters</h1>
			<div className="d-flex flex-row flex-nowrap overflow-auto">
				{store.personas.map((item, index) => (
					<div className="col-sm-4" key={index}>
						<div id="card" className="card" style={{ marginBottom: '15px', padding: '20px' }}>
							<img 
								className="card-img-top" 
								style={{ backgroundColor: 'lightgray', width: '100%' }} 
								src={`https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`} 
								alt="Card image"
							/>
							<div className="card-body">
								<h4 className="card-title">{item.name}</h4>
								<p className="card-text">
									Gender: {item.gender}<br />
									Hair Color: {item.hair_color}<br />
									Eye-color: {item.eye_color}
								</p>
								<Link to={`/single/${index}`}>
									<span className="btn btn-primary">Learn more!</span>
								</Link>
								{/* <button onClick={() => actions.addFavorite(item)} className="btn">
								<span><i className='far fa-heart'/></span>
								</button> */}
								{/* <button onClick={() => actions.addFavorite({ ...item, id: `character-${index}` })} className="btn"></button> */}
							</div>
						</div>
					</div>
				))}
		   </div>
		   <h1 className="titlePlanets" style={{ color: 'red' }}>Planets</h1>
            <div className="d-flex flex-row flex-nowrap overflow-auto">
                {store.planetas.map((item, index) => (
                    <div className="col-sm-4" key={index}>
                        <div id="card" className="card" style={{ marginBottom: '15px', padding: '20px' }}>
                            <img 
                                className="card-img-top" 
                                style={{ backgroundColor: 'lightgray', width: '100%' }} 
                                src={`https://starwars-visualguide.com/assets/img/planets/${index + 1}.jpg`} 
                                alt="Card image"
                            />
                            <div className="card-body">
                                <h4 className="card-title">{item.name}</h4>
                                <p className="card-text">
                                    Climate: {item.climate}<br />
                                    Created: {item.created}<br />
                                    Diameter: {item.diameter}
                                </p>
                                <Link to={`/single2/${index}`}>
                                    <span className="btn btn-primary">Learn more!</span>
                                </Link>
                                {/* <button onClick={() => actions.addFavorite(item)} className="btn">
                                <span><i className='far fa-heart'/></span>
                                </button> */}
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>





	</div>
</div>
		
	);
};
