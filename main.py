import requests

data={
    'username':"milutin1",
    'password':"1234567A"
}
#req=requests.post("http://localhost:3000/users/register",data=data)

#json_data=req.json()
#print(json_data)

req=requests.post("http://localhost:3000/auth/login",data=data)
json_data=req.json()
print(json_data["access_token"])
files = {'file': open('pictures/pngwing.com.png', 'rb')}
update_data={
    'username':"milutin1"
}
print(files[0].name)
update_request=requests.put("http://localhost:3000/users/",files=files,headers={
    'Authorization':'Bearer '+json_data["access_token"],
},data=update_data)
print(update_request.json())