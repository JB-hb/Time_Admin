import {tarea_module} from "../Modules/tareas.mjs"

export class task_controller{

	static async get_tasks(req, res){
		const {user_id} = req.params
		if(user_id == undefined){
			res.json({error: "need valid arguments (user id)"})
		}
		const result = await tarea_module.get_all_tareas(req.params)	
		res.json(result)
	}

	static async get_tasks_today(req, res){
		const {user_id} = req.params
		if(user_id == undefined){
			res.json({error: "need valid arguments (user id)"})
		}
		const result = await tarea_module.get_today(req.params)
		res.json(result)
	}

	static async get_category(req, res){
		const {user_id, cat_id} = req.params
		if(user_id == undefined){
			res.json({error: "need valid arguments (user id)"})
		}
		if(cat_id == undefined){
			res.json({error: "need valid arguments(category id)"})
		}
		const result = await tarea_module.get_tareas(req.params)
		res.json(result)
	}
}
