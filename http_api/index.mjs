import express, {json} from "express"
import cors from "cors"
import {db} from "./Modules/Objects/Object-database.mjs"
import {time_router} from "./Routes/time-routes.mjs"

const app = express();
const port = process.env.PORT ?? 3000;

//todo: finish routes

//config request
app.disable("x-powered-by");
app.use(cors());

//redirect request to the route
app.use(json());
app.use("/time", time_router);

app.listen(port, () => {
	console.log(`server listening in port ${port}`);
})
