import {activity} from "./Objects/Object-activity.mjs"
import {db} from "./Objects/Object-database.mjs"

export class activity_module{

	static async get_day_activities(user_id){

		const database = new db();
		const day = new Date();
		const state = await database.get_row("activities", ["user_id", "day"], [user_id, day.getDay()]);
		
		if(state.code != 0){
			return state.error;
		}

		if(state.rows.length == 0){
			return {error: "not activities found"};
		}

		return state.rows;

	}

	static async get_all_activities(user_id){

		const database = new db();
		const day = new Date();
		const state = await database.get_row("activities", ["user_id"], [user_id]);
		
		if(state.code != 0){
			return state.error;
		}

		if(state.rows.length == 0){
			return {error: "not activities found"};
		}

		return state.rows;

	}
	
}
