##Peticiones 
import requests
import constants

# Encabezados de la solicitud POST
headers = {
    'Content-Type': 'application/json'
}

#parametrizacion de SuperUsuario
superUsuario={"nombres":"Super Usuario",
              "apellidos":"Super Usuario",
              "email": "susuario@unal.edu.co",
              "rol":"administrador"
              }

'''
#Creacion de usuarios
    # Función para crear usuarios
'''
def creacionUsuario(superUsuario):
    global headers    
    # sending post request and saving response as response object
    response = requests.post(constants.apiUsuarios, json=superUsuario, headers=  headers)
    json_response = response.text
    print(json_response)

#--------- creacion de SuperUsuario ---------   #id = 46  
#creacionUsuario(apiUsuarios,superUsuario)

'''
#Get de usuarios
    # Función para obtener la lista de usuarios
'''
def getUsuarios():         
    response=requests.get(constants.apiUsuarios)
    data=response.json()
    for cp in data: print (cp) 
        
#getUsuarios()                  

'''
#Creacion de cuerpos colegiados
    # Función para crear cuerpos colegiados
'''
def creacionCuerpoColegiado(cuerpoColegiado):
    global headers    
    # sending post request and saving response as response object
    data={
        "nombre":cuerpoColegiado
    }
    response = requests.post(constants.apiCuerpoColegiado, json=data, headers=headers)
    json_response = response.text
    print(json_response)

#--------- creacion de SuperUsuario ---------   #id = 6
#creacionCuerpoColegiado("Consejo de Bienestar universitario")

'''
#Get de cuerpo Colegiado
    # Función para obtener la lista de cuerpos colegiados
'''

def getCuerpoColegiado():         
    response=requests.get(constants.apiCuerpoColegiado)
    data=response.json()
    for cp in data: print (cp) 
        
#getCuerpoColegiado()

'''
 ******Ligar cuerpo colegiado con usuario ******
'''
def vinculacionCuerpoColegiadoUsuario(id_cuerpoColegiado,id_usuario,rol):
    global headers    
    # sending post request and saving response as response object
    data={
        "id_cuerpo_colegiado":id_cuerpoColegiado,
        "id_usuario":id_usuario,
        "rol":rol
    }
    response = requests.post(constants.apiVinculacionCuerposColegiadosUsuarios, json=data, headers=headers)
    json_response = response.text
    print(json_response)

#--------- vinculacion cuerpo colegiado y usuario ---------   
#vinculacionCuerpoColegiadoUsuario(6,46,"administrador")

'''
 ****** Guardado de docuementos ******
'''
def creacionDocumentos(id_cuerpoColegiado,id_usuario,tipo,numero,anio,informacion):
    global headers
    data={
        "id_cuerpo_colegiado" : id_cuerpoColegiado,
        "id_usuario" : id_usuario,
        "tipo" : tipo,
        "numero" : numero,
        "anio" : anio,
        "informacion" : informacion
    }
    response = requests.post(constants.apiDocumentos, json=data, headers=headers)
    json_response = response.text
    print(json_response)

'''
 ****** Guardado de documentos ******
'''
def creacionDocumentos(data):
    global headers
    response = requests.post(constants.apiDocumentos, json=data, headers=headers)
    json_response = response.text
    print(json_response)

'''
#Get de cuerpo documentos
    # Función para obtener la lista de documentos
'''
def getDocumentos():         
    response=requests.get(constants.apiDocumentos)
    data=response.json()

    #for cp in data: print (cp['id'])
    for cp in data: print(cp)
        
#getDocumentos()