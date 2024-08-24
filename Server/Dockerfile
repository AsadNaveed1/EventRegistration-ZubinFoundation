FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Set the environment variables for the PostgreSQL connection
ENV POSTGRES_DB=postgres-db
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=mypassword
ENV POSTGRES_HOST=db
ENV POSTGRES_PORT=5432

# Update the Django settings to use the PostgreSQL database
RUN sed -i "s/'NAME': 'default'/'NAME': '${POSTGRES_DB}'/g" barebone/settings.py
RUN sed -i "s/'USER': 'default'/'USER': '${POSTGRES_USER}'/g" barebone/settings.py
RUN sed -i "s/'PASSWORD': 'default'/'PASSWORD': '${POSTGRES_PASSWORD}'/g" barebone/settings.py
RUN sed -i "s/'HOST': 'localhost'/'HOST': '${POSTGRES_HOST}'/g" barebone/settings.py
RUN sed -i "s/'PORT': '5432'/'PORT': '${POSTGRES_PORT}'/g" barebone/settings.py

# Expose the port that the Django development server will run on
EXPOSE 5000

# Wait for the database to be ready
RUN apt-get update && apt-get install -y wait-for-it

# Run the database migrations
CMD ["bash", "-c", "wait-for-it db:5432 -- python manage.py makemigrations --no-input && python manage.py migrate --no-input && python -u manage.py runserver 0.0.0.0:5000"]