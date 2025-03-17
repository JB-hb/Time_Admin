import {Router} from "express"

export const time_router = Router();

const work_progress = (req, res)=>{
	res.json({message: "work in progress"})
};


//Auth

time_router.post("/auth/Register", work_progress);
time_router.get("/auth/Login", work_progress);
time_router.patch("/auth/Change/p/:id_user", work_progress);

//Activities

time_router.post("/CUD/Act/create", work_progress);
time_router.post("/CUD/Act/delete", work_progress);
time_router.patch("/CUD/Act/update", work_progress);
time_router.get("/get/Act/day/:user_id", work_progress);
time_router.get("/get/Act/:user_id", work_progress);

//Tareas

time_router.post("/CUD/Task/create", work_progress);
time_router.post("/CUD/Task/delete", work_progress);
time_router.patch("/CUD/Task/update", work_progress);
time_router.patch("/Task/CUD/complete/:task_id", work_progress);
time_router.get("/get/Tasks/:user_id", work_progress);
time_router.get("/get/Task/day/:user_id", work_progress);
time_router.get("/get/Task/cat/:user_id/:id_cat", work_progress);
time_router.post("/CUD/Task/cat/create", work_progress);
time_router.post("/CUD/Task/cat/delete", work_progress);

//Rewards

time_router.post("/CUD/Rew/create", work_progress);
time_router.post("/CUD/Rew/delete", work_progress);
time_router.patch("/CUD/Rew/update", work_progress);
time_router.get("/get/Rew/cat/:id_user", work_progress);
time_router.get("/get/Rew/:id_user", work_progress);

//Habits

time_router.post("/CUD/Hab/create", work_progress);
time_router.post("/CUD/Hab/delete", work_progress);
time_router.patch("/CUD/Hab/update", work_progress);
time_router.get("/get/Hab/:user_id", work_progress);
time_router.get("/get/Hab/list/:user_id", work_progress);
time_router.get("/get/Hab/grahp/r/:user_id", work_progress);
time_router.get("/get/Hab/grahp/m/:user_id", work_progress);
time_router.get("/get/Hab/grahp/y/:user_id", work_progress);

//quick modify

time_router.post("/CUD/stack", work_progress);

