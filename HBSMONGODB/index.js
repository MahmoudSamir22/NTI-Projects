const app = require("./src/app")

app.listen(process.env.PORT, ()=> console.log(`we are on http://localhost:${process.env.PORT}`))