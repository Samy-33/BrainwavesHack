# BrainWaves Hackathon FullStack

## SETUP

Use python3.6+  
**API Installation**  
  * Go to `api` directory and install dependencies by `$ pip install -r requirements.txt`
  * Make Migrations by `$ ./manage.py makemigrations user` > `$ ./manage.py makemigrations mt300` > `$ ./manage.py migrate`
  * run api by `./manage.py runserver`, *Keep port 8000 free*

**UI Installation**  
  * Go to `ui` directory and install dependencies by `$ yarn install`
  * After installation run the UI dev server by `$ yarn start`

**Create a User**  
  * Goto `api` directory and run `$ ./manage.py createsuperuser`, Enter the details
  * After getting the user created, login on the web browser and see the magic work :p