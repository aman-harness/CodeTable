# CodeTable
A web application based on djnago 1.9 to compile and run code online from Anyywhere. 


This project uses the HackerEarth Compile and run API for code compilation. For more details about the API, visit the link  https://www.hackerearth.com/docs/api/developers/code/v3/
## Pre-Requisites:

1. Python 2.7

2. PIP

3. virtualenv

## Instructions to hack

1. Clone the repository on your local machine

2. Create virtual environment by using following command: 
    
        virtualenv env
    
3. Run the virtaulenv by 

        source env/bin/activate
    
4. Install the dependencies using the command: 

        pip install -r requirements.txt
    
5. Run migrations using the command: 

        python manage.py migrate

6. Run the development server: 

        python manage.py runserver

Finally open http://127.0.0.1:8000 to see the magic into action. 

## To - Do

1. Implement CodeVideo