# Challenge

agregar su variable de entrorno llamada DATABASE_URL con el URI de su mongodb project

npm i para instalar dependencias y tsc para compilar a javascript

luego npm run dev para correr el servidor en el http://localhost:8080/

/signin recibe un metodo POST con un BODY con el siguiente formato JSON:
{
    "username":STRING,
    "password":NUMBER
}

/login recibe un metodo GET con un BODY con el siguiente formato JSON:
{
    "username":STRING,
    "password":NUMBER
}


/create recibe un metodo POST con un BODY con el siguiente formato JSON:

{
    "dni": NUMBER,
    "fullName":STRING,
    "birthDate":DATE,
    "gender":"MALE" || "FEMALE",
    "status": STRING, //("false"||"true")
    "age":NUMBER
}

/update recibe un metodo PATCH con un BODY con el siguiente formato JSON:

{
    "dni": NUMBER,
    "fullName":STRING,
    "birthDate":DATE,
    "gender":"MALE" || "FEMALE",
    "status": STRING, //("false"||"true")
    "age":NUMBER
}

/delete recibe un metodo DELETE sin ningun BODY

