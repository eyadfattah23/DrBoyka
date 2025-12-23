# DrBoyka

installation and Setup Instructions:
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd DrBoyka/backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install the required packages:
   ```bash
   pip3 install -r requirements.txt
   ```
4. Apply migrations:
   ```bash
   python3 manage.py makemigrations
   python3 manage.py migrate
   ```
5. Create a superuser to access the admin panel (skip if you don't want to have access to it):
   ```bash
   python3 manage.py createsuperuser
   ```
6.  Run seed script to populate the database with initial data:
   ```bash
   python3 seed_db.py
   ```
7. Run the development server:
   ```bash
   python3 manage.py runserver
   ```
8. Access the application at `http://127.0.0.1:8000/api` or `http://127.0.0.1:8000/admin`.
