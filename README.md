# start developement
```
npm i
npm run dev
```

# start production
```
npm i
npm run start-prod
```

# Docker (first go to folder root)
```
docker build -t codecapi .
winpty docker run -it -p 5000:5000 codecapi
```

# check if docker is running
```
docker ps
```

# check on browser
http://localhost:5000/