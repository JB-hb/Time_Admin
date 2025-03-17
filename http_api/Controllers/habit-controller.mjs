import {habit_module} from "../Modules/habits.mjs"

export class habit_controller{

	static async get_habits(req, res){
		const {user_id} = req.params
		if(user_id == undefined){
			res.json({error: "need valid argument (user id)"})
		}
		const result = await habit_module.get_habits(user_id)
		res.json(result)
	}

	static async get_list(req, res){
		const {user_id} = req.params
		if(user_id == undefined){
			res.json({error: "need valid argument (user id)"})
		}
		const result = await habit_module.get_habit_list(user_id)
		res.json(result)
	}

	static async get_graph_m(req, res){
		const {user_id} = req.params
		const {month, year} = req.body
		if(month == undefined){
			res.json({error: "need valid argument (month)"})
		}
		if(year == undefined){
			res.json({error: "need valid argument (year)"})
		}
		if(user_id == undefined){
			res.json({error: "need valid argument (user id)"})
		}
		const result = await habit_module.get_habit_graph_m(user_id, month, year)
		res.json(result)
	}

	static async get_graph_y(req, res){
		const {user_id} = req.params
		const {year} = req.body
		if(user_id == undefined){
			res.json({error: "need valid argument (user id)"})
		}
		if(year == undefined){
			res.json({error: "need valid argument (year)"})
		}
		const result = await habit_module.get_habit_graph_y(user_id, year)
		res.json(result)
	}

	static async get_graph_r(req, res){
		const {user_id} = req.params
		const {start, end} = req.body
		if(user_id == undefined){
			res.json({error: "need valid argument (user id)"})
		}
		if(start == undefined){
			res.json({error: "need valid argument (start)"})
		}
		if(end == undefined){
			res.json({error: "need valid argument (end)"})
		}
		const result = await habit_module.get_habit_graph_r(user_id, start, end)
		res.json(result)
	} 
}
