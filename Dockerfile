FROM python:3.9

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY app /app
COPY user.html /app/templates/user.html
COPY user.js /app/static/user.js

CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
