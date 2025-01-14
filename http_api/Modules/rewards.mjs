import {db} from "./Objects/Objects-database.mjs"

export class reward_module{

	static async get_rewards(user_id, cat){

		const database = new db();
		const data = await database.get_row("rewards", ["category", "user_id"], [cat, user_id]);

		return data.rows;

	}

	static async get_all_rewards(user_id){

		const database = new db();
		const data = await database.get_row("rewards", ["user_id"], [user_id]);

		return data.rows;

	}
	
}
