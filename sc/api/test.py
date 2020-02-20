import requests

headers = {
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTgxNjk5OTkxLCJqdGkiOiJiZjFlZjMxYTZkM2U0ODlmOWFmNDMxZmM1ZjYwNzBlNyIsInVzZXJfaWQiOjF9.pYGOVkXtj8fl5OzrxZbHmMQMG-YgzY5lmCwzFn0Yh3I'
}


r = requests.get('http://localhost/api/student', headers=headers)
print(r.text)