import base64
import requests

msg = "openbb:mindsdb2024"
msg_bytes = msg.encode("ascii")
base64_bytes = base64.b64encode(msg_bytes)
base64_msg = base64_bytes.decode("ascii")

symbol="MSFT"
url = f"https://mindsdb2024.openbb.dev/api/v1/news/company?provider=fmp&symbols={symbol}&limit=20&display=headline&date=01%2F26%2F2024&sort=created&order=desc&page=0"
headers = {"accept": "application/json", "Authorization": f"Basic {base64_msg}"}

response = requests.get(url=url, headers=headers)

print(response.json())