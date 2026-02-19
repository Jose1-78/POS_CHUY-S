from flask import Flask, render_template, jsonify, request
from controlador_db import ControladorDB

app = Flask(__name__)
db = ControladorDB()

# --- VISTAS HTML ---
@app.route('/')
def index(): return render_template('ventas.html')

@app.route('/inventario')
def inventario(): return render_template('inventario.html')

@app.route('/reportes')
def reportes(): return render_template('reportes.html')

@app.route('/ajustes')
def ajustes(): return render_template('ajustes.html')

# --- API VENTAS ---
@app.route('/buscar', methods=['POST'])
def buscar():
    producto = db.buscar_producto(request.json.get('codigo'))
    if producto:
        return jsonify({'encontrado': True, 'nombre': producto['nombre'], 'precio': float(producto['precio']), 'codigo': producto['codigo']})
    return jsonify({'encontrado': False})

@app.route('/cobrar', methods=['POST'])
def cobrar():
    data = request.json
    db.registrar_venta_db(data['total'], data['productos'])
    return jsonify({'status': 'ok'})

@app.route('/api/obtener_reporte', methods=['POST'])
def api_reporte():
    res = db.obtener_ventas_por_fecha(request.json.get('fecha'))
    return jsonify({'lista_ventas': res['ventas'], 'total_dia': res['total']})

# --- API INVENTARIO ---
@app.route('/api/inventario/listar', methods=['GET'])
def listar_inventario():
    return jsonify(db.obtener_todo_inventario())

@app.route('/api/inventario/agregar', methods=['POST'])
def agregar_inv():
    d = request.json
    exito, msg = db.agregar_producto(d['codigo'], d['nombre'], d['precio'], d['stock'])
    return jsonify({'exito': exito, 'msg': msg})

# ---> AQUÍ AGREGAMOS LA SEGURIDAD PARA EDITAR STOCK <---
@app.route('/api/inventario/actualizar_stock', methods=['POST'])
def actualizar_stock_api():
    d = request.json
    if d.get('password') != db.obtener_password():
        return jsonify({'exito': False, 'msg': 'Contraseña Incorrecta'})
    
    return jsonify({'exito': db.modificar_stock(d['codigo'], d['nuevo_stock'])})

# --- SEGURIDAD: ELIMINAR Y AJUSTES ---
@app.route('/api/inventario/eliminar', methods=['POST'])
def eliminar_inv():
    d = request.json
    if d.get('password') != db.obtener_password():
        return jsonify({'exito': False, 'msg': 'Contraseña Incorrecta'})
    
    exito = db.eliminar_producto(d['codigo'])
    return jsonify({'exito': exito, 'msg': 'Producto eliminado'})

@app.route('/api/ajustes/cambiar_password', methods=['POST'])
def cambiar_password_api():
    d = request.json
    exito, msg = db.cambiar_password(d['actual'], d['nueva'])
    return jsonify({'exito': exito, 'msg': msg})

if __name__ == '__main__':
    app.run(debug=True, port=5000)