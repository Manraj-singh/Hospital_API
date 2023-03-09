
# Hospital_API using NodeJS

## Tech Stack

*NodeJS , ExpressJS ,MongoDB , passport auth*

**Overview :**

 - Designed an API for the doctors of a Hospital which has been allocated by the govt for testing and quarantine + well being of COVID-19 patients
- There can be 2 types of Users
    - Doctors
    - Patients
- Doctors can log in
- Each time a patient visits, the doctor will follow 2 steps
    - Register the patient in the app (using phone number, if the patient already exists, just return the patient info in the API)
    - After the checkup, create a Report
- Patient Report will have the following fields
    - Created by doctor
    - Status:
    - Can be either of: [Negative, Travelled-Quarantine,Symptoms-Quarantine,Positive-Admit].




## Routes

base route: /api/v1
```
POST:
- /doctors/register → with username and password
- /doctors/login → returns the JWT to be used
- /patients/register
- /patients/:id/create_report
GET:
- /patients/:id/all_reports → Lists all the reports of a patient
- /reports/:status → Lists all the reports of all the patients filtered by a specific status
```

Note: patient routes are protected , doctor needs to login to access any patient route
## Run Locally

Clone the project

```bash
  git clone https://github.com/Manraj-singh/Hospital_API.git
```

install the nodemodules from package.json  :

```bash
  npm install
```

finally start it on your local server

```bash
  npm start
```
since this is a API ,use postman to see the response.




## Folder structure
```
.gitignore
README.md
configs
   |-- index.js
   |-- mongoose.js
   |-- passport-jwt-strategy.js    
controllers
   |-- api
   |   |-- index.js
   |   |-- v1
   |   |   |-- doctorController.js 
   |   |   |-- index.js
   |   |   |-- patientController.js
   |   |   |-- reportController.js 
   |-- index.js
index.js
middlewares
   |-- doctors.js
   |-- index.js
   |-- patients.js
models
   |-- doctor.js
   |-- index.js
   |-- patient.js
   |-- report.js
package-lock.json
package.json
routes
   |-- api
   |   |-- index.js
   |   |-- v1
   |   |   |-- doctors.js
   |   |   |-- index.js
   |   |   |-- patients.js
   |   |   |-- reports.js
   |-- index.js
secretkeys.js
```

walkthrough: 
- config folder contains all the configurations like mongoose /passport
- controllers contains all the code which executes for a particular route
- middlewares folder contains custom middleware like precheks before registering /login after middle ware controllers are called

- models folder has all the schemas defined like doctor,patient,report

- routes folder has all the routes
- secretkeys file has all the secret keys if any

- root index file contains the express server setup

basic flow  : a route is called > passport does the authentication > middlewares does the prechecks and passes to controller > controller executes code as per the route > response returned (in postman)
