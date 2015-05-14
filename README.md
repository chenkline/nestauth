## nestauth
Nest Authorization nodejs app

## public ip address
The machine requires a public IP address when you deploy this application on it.

## install Dependencies
install node.js

npm install

## register a Nest account
register an account in [Nest developer websit](https://developer.nest.com/ "Nest developer websit")

## register a Nest client
then you need to register a Nest client in [Nest clients](https://developer.nest.com/clients)

assume your above public ip is 113.98.241.99 and the https port is 8000,
then your nest OAuth Redirect URI is [https://113.98.241.99:8000/nestcb]()

you MUST provide this **OAuth Redirect URI** when you register new Nest client.

## Run
node bin\www
 
Open your nestauth websit: [https://113.98.241.99:8000/](), 
fill your Nest Client ID and Client secret, and click button '**submit**', then click button '**Authenticate**'.

it will jump to nest home websit, then nest user signin and grant access to your client. 

If success, it will jump to the result view page([https://113.98.241.99:8000/nesttoken]()) show the nest access_token.

