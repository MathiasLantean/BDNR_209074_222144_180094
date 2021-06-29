# BDNR_209074_222144_180094

El siguiente proyecto fue creado con la finalidad de investigar bases de datos no convensionales. En particular para este proyecto se utiliza Mongodb y Cassandra. 

## Instalación
A continuación se detalla una breve guía de como instalar y ejecutar los servicios de 'Actividades' y 'Registro y perfil de usuarios'.

### Pre requisitos 
Para poder realizar la correcta instalación de cada sistema es necesario contar previamente con la instalación de los siguientes items:

[Npm](https://docs.npmjs.com/getting-started)\
[Mongodb](https://docs.mongodb.com/manual/installation/)\
[Cassandra](https://www.apache.org/dyn/closer.lua/cassandra/3.11.6/apache-cassandra-3.11.6-bin.tar.gz)

[1]: https://docs.npmjs.com/getting-started
[2]: https://docs.mongodb.com/manual/installation/
[3]: https://www.apache.org/dyn/closer.lua/cassandra/3.11.6/apache-cassandra-3.11.6-bin.tar.gz

### Inicialización
1. Crear un cluster de Cassandra ([Ver cluster local de Cassandra](https://aulas.ort.edu.uy/mod/page/view.php?id=327645))
2. Iniciar cluster de Cassandra
    ```
    cassandra -f
    ```

3. Usando cqlsh o DevCenter construir la siguiente tabla en Cassandra y cargarla con los datos indicados.

    ```
    CREATE KEYSPACE bdnr WITH REPLICATION = {
    'class': 'SimpleStrategy', 'replication_factor': 1
    };
    USE bdnr;

    CREATE TABLE IF NOT EXISTS activity (
        activityid TEXT,
    date DATE,
        title TEXT,
        userid TEXT,
        url TEXT,
        comment Text,
        type Text,
        duration double,
        distance double,
        text text,
        photo text,
        description text,
        difficulty text,
        location varchar,
        averageSpeed double,
        cadence double,
        calories double,
        Primary Key(userid,date, activityid)
    )WITH CLUSTERING ORDER BY (date DESC, activityId ASC);
    ```
4. Se deben instalar las dependencias de ambos sistemas. Para esto realizamos:
    ```
    cd Actividades
    npm install
    ```
    ```
    cd Registry
    npm install
    ```

5. Una vez las dependencias fueron instaladas estamos en condiciones de iniciar ambos servicios:
    ```
    node Actividades/index.js
    node Registry/index.js
    ```

Los servicios se ejecutaran en las siguientes direcciones:
- Actividades: [localhost:3000](localhost:3000)
- Registry: [localhost:3001](localhost:3001)

Dentro de la carpeta de cada servicio se encuentra una colección de postman la que declara los endpoints disponibles y su correspondiente ejemplo de uso.

## Notas del desarrollador
Estas notas pueden ser de útilidad en caso de querer editar las configuraciones definidas por defecto.

### Puertos  
- Actividades: el puerto por defecto para este servicio es el 3000 pudiendo editarse en el archivo `Actividades/server.js`
- Registry: el puerto por defecto para este servicio es el 3001 pudiendo editarse en el archivo `Registry/index.js`

### DB string connections
- Actividades: la conexión por defecto a cassandra se realiza a travéz de la IP 127.0.0.1 pudiendo editarse en el archivo `Actividades/repositories/repository.js`
- Registry: la conexión por defecto a mongodb se realiza a travéz de la IP 127.0.0.1 puerto 27017, pudiendo editarse en el archivo `Registry/config/database.config.js`