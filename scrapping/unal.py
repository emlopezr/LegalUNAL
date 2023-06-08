#Librerias necesarias
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from bs4 import BeautifulSoup
import time
import constants
import peticiones

#todo
#Creamos un diccionario para guardar los datos

"""Driver de chrome para hacer el scrapping
    Es necesario instalar el controlador"""

chrome_driver = Service(constants.driverRoute) #Llamamos al controlador

options = Options()
options.add_experimental_option("detach", True)
driver  = webdriver.Chrome(options=options,service=chrome_driver)#Usamos selenium para cargar el controlador  
                                                                 #Options() para que se mantenga abierto

#Guardamos y abrimos la pagina

driver.get(constants.webRoute)#Llamamos la ruta
time.sleep(2)#Esperamos 2 segundos para que la pagina tenga una respuesta

#Entidad correspondiente
entidad = driver.find_element(By.ID,"entidad-documento")#Buscamos por el ID el campo del formulario llamado 'entidad documento'
entidad=Select(entidad) #lo seleccionamos 
entidad.select_by_value("2055")
#print(entidad.first_selected_option.text)
#Escogemos en este caso el valor 2055 que hace referencia a 'consejo de bienestar universitario'
#En caso de que se quiera hacer en mas de una entidad
#Generar la peticion de la creacion con el valor del id es decir:
#peticiones.creacionCuerpoColegiado(entidad.first_selected_option.text) 
time.sleep(2)#Esperamos respuesta

#Boton de buscar
buscar = driver.find_element(By.ID,"Buscar")#Buscamos por ID
buscar.click()#Damos click -> Devuelve el listado de los documentos filtrados
time.sleep(2)#Esperamos para la respuesta
#Segunda pg
segunda = driver.find_element(By.ID,"next")
segunda.click()
paginaPrincipal=driver.current_window_handle#   *** Guardamos una referencia a la pagina donde se listan los documentos ***
time.sleep(2)#Esperamos para la respuesta

#Scrapeamos la tabla
table_id = driver.find_element(By.ID, 'tab-result')#llamamos al identificador de la tabla
rows = table_id.find_elements(By.CLASS_NAME, "row-doc") # Llamamos todas las etiquetas tipo 'row-doc', es decir las filas

#Recorremos las filas
suma=0
for row in rows:

    col = row.find_elements(By.TAG_NAME, "td") #Para cada fila llamamos sus columnas
    # for i in range(len(col)):
    #         print("-----------",col[i].text)

    data={
    "id_cuerpo_colegiado":6,
    "id_usuario":46,   
    "tipo" : col[0].text,
    "numero" : int(col[1].text),
    "anio" : int(col[2].text),
    "informacion": ''
    }
    

    row.click()

    wait = WebDriverWait(driver,10)
    #Se mueve de pestaña
    driver.switch_to.window(driver.window_handles[-1])
    #html del documento solo necesitamos lo del body
    #And we have to extract the scripts

    html=driver.page_source
    # Crear un objeto BeautifulSoup para analizar el código HTML
    soup = BeautifulSoup(html, 'html.parser' )

    body_content = ''
    for script in soup.find_all('script'):
        script.extract()
    #******* Extraccion del texto de la pagina
    #body_content = str(soup.body)     
    body_content = str(soup.get_text())

    data["informacion"]=body_content


    print("...................................")
    print(data)
    peticiones.creacionDocumentos(data)

    # Imprimir el contenido dentro de la etiqueta <body> excluyendo las etiquetas <script>
    #print(body_content)
    suma+=1

    # Cerrar la pestaña
    driver.close()

    driver.switch_to.window(paginaPrincipal )

    
    

print(suma)    

       
    

input("Press ENTER to exit\n")



