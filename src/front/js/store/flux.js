import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			personas: [],
            planetas: [],
            vehiculos: [],
            favorites: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				},
			]
		},
		actions: {
// Use getActions to call a function within a fuction
			login: async (email, password, navigate) => {
				const bodyData = {
				email,
				password,
				};
				try {
				const res = await axios.post(
					`${process.env.BACKEND_URL}/api/login`,
					bodyData
				);
				const { access_token } = res.data;
				if (access_token) {
					localStorage.setItem("accessToken", access_token);
					await getActions().getCurrentUser(); // Obtén el usuario actual después de iniciar sesión
					navigate("/protected"); // Redirige a la página protegida
					return true;
				}
				return false;
				} catch (error) {
				console.log("Error during login", error);
				return false;
				}
			},
  			// Función de registro
			register: async (email, password) => {
				const bodyData = {
				  email,
				  password,
				};
		
				try {
				  const res = await fetch(`${process.env.BACKEND_URL}/api/register`, {
					method: "POST",
					headers: {
					  "Content-Type": "application/json",
					},
					body: JSON.stringify(bodyData),
				  });
		
				  if (res.ok) {
					const data = await res.json();
					// manejar el registro exitoso, como redirigir al login o mostrar un mensaje
					return true;
				  } else {
					// manejar el error del servidor
					return false;
				  }
				} catch (error) {
				  console.error("Error during registration", error);
				  return false;
				}
			  },		

// Use getActions to call a function within a fuction
			  logout: () => {
				localStorage.removeItem("accessToken");
				// navigate("/home");
				setStore({
				  currentUser: null,
				  isLoggedIn: false,
				});
			  },
// Use getActions to call a function within a fuction
			  getCurrentUser: async () => {
				try {
				  const accessToken = localStorage.getItem("accessToken");
				  const res = await axios.get(
					`${process.env.BACKEND_URL}/api/current-user`,
					{ headers: { Authorization: `Bearer ${accessToken}` } }
				  );
				  const { data } = res;
				  const { current_user: currentUser } = data;
				  setStore({ currentUser, isLoggedIn: true });
				} catch (error) {
				  console.log("Error loading message from backend", error);
				  localStorage.removeItem("accessToken");
				  setStore({
					currentUser: null,
					isLoggedIn: false,
				  });
				}
			  },
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
				getActions().getCharactersInfo();
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			getCharacters: async () => {
                try {
                    const response = await fetch("https://www.swapi.tech/api/people/");
                    const data = await response.json();
                    const personas = await Promise.all(data.results.map((character) => getActions().getCharactersInfo(character.uid)));
                    setStore({ personas: personas });
                } catch (error) {
                    console.log(error);
                }
            },
            getCharactersInfo: async (id) => {
                try {
                    const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
                    const data = await response.json();
                    return data.result.properties;
                } catch (error) {
                    console.log(error);
                }
            },
			getPlanets: async () => {
                try {
                    const response = await fetch("https://www.swapi.tech/api/planets/");
                    const data = await response.json();
                    const planets = await Promise.all(data.results.map((planet) => getActions().getPlanetsInfo(planet.uid)));
                    setStore({ planetas: planets });
                } catch (error) {
                    console.log(error);
                }
            },
            getPlanetsInfo: async (id) => {
                try {
                    const response = await fetch(`https://www.swapi.tech/api/planets/${id}`);
                    const data = await response.json();
                    return data.result.properties;
                } catch (error) {
                    console.log(error);
                }
            },

		}
	};
};

export default getState;
