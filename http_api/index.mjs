import express, {json} from "express"
import cors from "cors"
import {db} from "./Modules/Objects/Object-database.mjs"
import {tarea} from "./Modules/Objects/Object-tarea.mjs"

const app = express();
const port = process.env.PORT ?? 3000;

//config request
app.disable("x-powered-by");
app.use(cors());

//redirect request to the route
app.use(json());
//app.use("", time_router);

app.listen(port, () => {
	console.log(`server listening in port ${port}`);
})
