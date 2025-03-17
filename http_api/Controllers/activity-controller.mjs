import {activity_module} from "../Modules/activities.mjs"

export class activity_controller{

	static async get_day(req, res){
		const result = await activity_module.get_day_activities(req.params)
		res.json(result)
	}

	static async get_all(req, res){
		const result = await activity_module.get_all_activities(req.params) 
		res.json(result)
	}
}
