import {reward_module} from "../Modules/rewards.mjs"

export class reward_controller{
	static async rewards_list(req, res){
		const {user_id} = req.params
		if(user_id == undefined){
			res.json({error: "valid argument needed (user_id)"})
		}
		const result = await reward_module.get_all_rewards(user_id)
		res.json(result)

	}
	static async reward_cat(req, res){
		const {user_id, cat} = req.params
		if(user_id == undefined){
			res.json({error: "valid argument needed (user id)"})
		}
		if(cat == undefined){
			res.json({error: "valid argument needed (category)"})
		}
		const result = await reward_module.get_rewards(user_id, cat)
		res.json(result)
	}
}
