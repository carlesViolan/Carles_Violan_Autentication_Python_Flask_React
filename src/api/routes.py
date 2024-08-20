"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,People, Planet
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
# from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token

# from flask import Flask
# from flask_jwt_extended import JWTManager
from flask import Flask
# from flask_cors import CORS

api = Flask(__name__)
CORS(api)

# api = Flask(__name__)

# Configuración de la clave secreta para JWT
api.config['JWT_SECRET_KEY'] = 'tu-clave-secreta-aqui'  # Cambia esto por una clave secreta segura en producción

# Inicializar JWTManager con la aplicación Flask
jwt = JWTManager(api)

# Resto de tu configuración y rutas aquí...

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Nuevo endpoint para registrarse

@api.route('/register', methods=['POST'])
def register_user():
    email = request.json.get("email")
    password = request.json.get("password")

    if not email or not password:
        return jsonify({"msg": "Missing email or password"}), 400

    user = User(email=email, password=password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "User registered successfully"}), 201

# Autenticación de usuarios para obtener el token JWT
@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200

# Endpoints para usuarios
@api.route('/user', methods=['GET'])
def handle_users():
    users_query = User.query.all()
    all_users = list(map(lambda x: x.serialize(), users_query))
    return jsonify(all_users), 200

# Endpoints para  User con ID
@api.route('/user/<int:user_id>', methods=['GET'])
def handle_specific_user(user_id):
    user_query = User.query.get(user_id)
    if user_query is None:
        raise APIException('User not found', status_code=404)
    specific_user = user_query.serialize()
    return jsonify(specific_user), 200

# Endpoints para current User
@api.route("/current-user", methods=["GET"])
@jwt_required()
def get_current_user():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    print("\n\n\n")
    print(current_user_id)

    if current_user_id is None:
        return jsonify({"msg": "User not found"}), 401
    
    user_query = User.query.get(current_user_id)
    print(user_query)

    if user_query is None:
        return jsonify({"msg": "User not found"}), 401

    user = user_query.serialize()
    print(user)
    print("\n\n\n")
    return jsonify(current_user=user), 200


# Endpoints para planetas
@api.route('/planet', methods=['GET'])
def handle_planets():
    planets_query = Planet.query.all()
    all_planets = list(map(lambda x: x.serialize(), planets_query))
    return jsonify(all_planets), 200

@api.route('/planet/<int:planet_id>', methods=['GET'])
def handle_specific_planet(planet_id):
    planet_query = Planet.query.get(planet_id)
    if planet_query is None:
        raise APIException('Planet not found', status_code=404)
    specific_planet = planet_query.serialize()
    return jsonify(specific_planet), 200

# Endpoints para personas
@api.route('/people', methods=['GET'])
def handle_people():
    people_query = People.query.all()
    all_people = list(map(lambda x: x.serialize(), people_query))
    return jsonify(all_people), 200

@api.route('/people/<int:people_id>', methods=['GET'])
def handle_specific_people(people_id):
    people_query = People.query.get(people_id)
    if people_query is None:
        raise APIException('People not found', status_code=404)
    specific_people = people_query.serialize()
    return jsonify(specific_people), 200

@api.route('/people/<int:people_id>', methods=['DELETE'])
def delete_specific_people(people_id):
    people1 = People.query.get(people_id)
    if people1 is None:
        raise APIException('People not found', status_code=404)
    db.session.delete(people1)
    db.session.commit()
    return "Deleted", 200

# Endpoint para listar todos los favoritos del usuario actual
@api.route('/user/favorites', methods=['GET'])
@jwt_required()
def get_user_favorites():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    
    # Obtener los planetas favoritos
    favorite_planets = user.favorite_planets
    favorite_planets_list = list(map(lambda planet: planet.serialize(), favorite_planets))

    # Obtener las personas favoritas
    favorite_people = user.favorite_people
    favorite_people_list = list(map(lambda people: people.serialize(), favorite_people))

    # Retornar ambos en un solo JSON
    return jsonify({
        "favorite_planets": favorite_planets_list,
        "favorite_people": favorite_people_list
    }), 200


# Endpoint para añadir planetas favoritos
@api.route('/favorite/planet/<int:planet_id>', methods=['POST'])
# @jwt_required()
def add_favorite_planet(planet_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    planet = Planet.query.get(planet_id)
    if planet is None:
        raise APIException('Planet not found', status_code=404)

    user.favorite_planets.append(planet)
    db.session.commit()
    return jsonify({"msg": "Planet added to favorites"}), 200

# Endpoint para eliminar planetas favoritos
@api.route('/favorite/planet/<int:planet_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite_planet(planet_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    planet = Planet.query.get(planet_id)
    if planet is None:
        raise APIException('Planet not found', status_code=404)

    user.favorite_planets.remove(planet)
    db.session.commit()
    return jsonify({"msg": "Planet deleted to favorites"}), 200



# Nuevo endpoint para obtener los planetas favoritos del usuario actual
@api.route('/user/favorites/planets', methods=['GET'])
@jwt_required()
def get_user_favorite_planets():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    favorite_planets = user.favorite_planets
    favorite_planets_list = list(map(lambda planet: planet.serialize(), favorite_planets))
    return jsonify(favorite_planets_list), 200


# Endpoint para añadir people favoritos
@api.route('/favorite/people/<int:people_id>', methods=['POST'])
@jwt_required()
def add_favorite_people(people_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    people = People.query.get(people_id)
    if people is None:
        raise APIException('People not found', status_code=404)

    user.favorite_people.append(people)
    db.session.commit()
    return jsonify({"msg": "People added to favorites"}), 200

# Endpoint para eliminar people favoritos
@api.route('/favorite/people/<int:people_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite_people(people_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    people = People.query.get(people_id)
    if people is None:
        raise APIException('People not found', status_code=404)

    user.favorite_people.remove(people)
    db.session.commit()
    return jsonify({"msg": "People remove to favorites"}), 200


# Nuevo endpoint para obtener las people favoritos del usuario actual
@api.route('/user/favorites/people', methods=['GET'])
@jwt_required()
def get_user_favorite_people():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    favorite_people = user.favorite_people
    favorite_people_list = list(map(lambda planet: planet.serialize(), favorite_people))
    return jsonify(favorite_people_list), 200

