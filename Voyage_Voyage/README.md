# ![ScreenShot](images/Logo2.png) 
# Voyage Voyage - End Project - Coding Academy by Epitech
### Vladimira GROSJEAN - Samira TAIBI - Fanny THIBERT
=> A website like "TripAdvisor" 

# I - Dev part

## Create backend :

### Using expressjs/nodejs :

    mkdir API_voyages
    cd API_voyages
    npm init -y
    npm install express

### Create folders and file for API routes :

    mkdir routes
    cd routes
    touch files.js...
  
    mkdir config
    cd config
    touch db.js => enter parameters to acces to the database
    
![ScreenShot](images/API_VoyagesTree.png)

### Install dependencies :

      npm i nodemon
      npm i axios
      npm i bcrypt
      npm i body-parser
      npm i cookie-parser
      npm i cors
      npm i crypto-js
      npm i debug
      npm i dotenv
      npm i express
      npm i fs
      npm i http-errors
      npm i jsonwebtoken
      npm i morgan
      npm i multer
      npm i mysql
      npm i nodemailer
      npm i pug
      npm i swagger-jsdoc
      npm i swagger-ui-express
  
    => do the same for all APIs
### tests with mocha chai

        npm install --save mocha chai
        mkdir test
        touch 'files-test'.js...
        npm run test
    
### Using mysql :

        sudo /etc/init.d/mysql start
        sudo mysql
        > CREATE DATABASE voyage
        > USE voyage
        > CREATE TABLES...
        
  use db [world](https://sql.sh/514-liste-pays-csv-xml) for countries and cities 
        
 ### UML Diagram :
 
![ScreenShot](images/DiagrammeUML.png)
        
### API documentation :

  * [swagger](http://localhost:3020/api-docs/#/)


![ScreenShot](images/Swagger.jpg)

### API Tripadvisor
        
 use [Tripadvisor](https://www.tripadvisorsupport.com/fr-FR/hc/owner/articles/517) API 

        mkdir TripAdvisor_API
        cd TripAdvisor_API
        npm init -y
        npm install express 
        
        mkdir routes
        cd routes
        touch files.js...
        
![ScreenShot](images/TripAdvisorAPITree.png)
  
## Create frontend :
### Create a vue.js app :

      npm install -g @vue/cli
      vue create front-v
      => select your options

      cd front-v
      npm install
      npm run serve
      
### Install dependencies :

      npm i bootstrap
      npm i bootstrap-vue
      npm i ol
      npm i mdb-vue-ui-kit
      npm i parcel
      npm i pug
      npm i register-service-worker
      npm i vue
      npm i vue-axios
      npm i vue-router
      npm i vue3-openlayers
      npm i vuex
      npm install -S @fawmi/vue-google-maps
      
 ### Create folders and files for the front :
 
        mkdir 'folders'...components/views/router...
        touch 'files'...
   ![ScreenShot](images/Front-vTree.png)
   
   To manage uploading photos : use an image download website : [ImgBB](https://fr.imgbb.com/)
   
 # II - User part
 
 ## Plan of the website 
 
 ### User and Curator access :
 
  ![ScreenShot](images/PlanUserCur.png)
 
 ### Admin access :
             
   ![ScreenShot](images/PlanDev.png)
 
![ScreenShot](images/P1.png)
![ScreenShot](images/P2.png)
![ScreenShot](images/P3.png)
![ScreenShot](images/P4.png)
![ScreenShot](images/P5.png)
![ScreenShot](images/P6.png)
![ScreenShot](images/P7.png)
![ScreenShot](images/P8.png)
![ScreenShot](images/P9.png)



