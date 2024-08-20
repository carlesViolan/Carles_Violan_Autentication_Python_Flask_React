import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Protected = () => {
  const { store, actions } = useContext(Context);
  const [favoritePlanets, setFavoritePlanets] = useState([]);
  const [favoritePeople, setFavoritePeople] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${process.env.BACKEND_URL}/api/user/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFavoritePlanets(data.favorite_planets);
        setFavoritePeople(data.favorite_people);
      } else {
        alert("Failed to fetch favorites.");
      }
    };

    fetchFavorites();
  }, [navigate]);

  return (
    <div className="text-center mt-5">
      <h1>PROTECTED ROUTE!!</h1>
      <div className="alert alert-info">
        {store?.currentUser?.email || "No hay un usuario identificado"}
      </div>
      <div>
        <h3>Your Favorite Planets:</h3>
        <ul>
          {favoritePlanets.map((planet) => (
            <li key={planet.id}>
              {planet.name} - {planet.climate} - Population: {planet.population}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Your Favorite People:</h3>
        <ul>
          {favoritePeople.map((person) => (
            <li key={person.id}>
              {person.name} - Gender: {person.gender} - Birth Year: {person.birth_year}
            </li>
          ))}
        </ul>
      </div>
      <Link to="/home">
        <button className="btn btn-warning" onClick={() => actions.logout()}>
          Logout
        </button>
      </Link>
    </div>
  );
};
