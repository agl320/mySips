from .user_routes import user_bp
from .drink_routes import drink_bp

def register_routes(app):
    app.register_blueprint(user_bp)
    app.register_blueprint(drink_bp)