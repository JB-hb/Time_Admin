import {db} from "./Objects-database.mjs"

export class habits_modules{

	static async get_habits(user_id){

		let data = {
			habits: []
		};

		const database = new db();

		const habits = await database.get_row("habits", ["user_id", "flag"], [user_id, 1]);

		const week = await database.get_comhabits_w(user_id);

		habits.rows.foreach(habit => {
			let cont = 0;
			week.rows.foreach(completed => {
				if(habit.id == completed.habit_id){
					cont++
				}
			});

			let result = {
				data: habit,
				completed: cont
			};
			data.habit.push(result);
		});

		return data;

	}

	static async get_habit_list(user_id){

		const database = new db();
		const habits = await database.get_row("habits", ["user_id", "flag"], [user_id, 1]);

		return habits.rows;

	}

	static async get_habit_graph_m(user_id, month, year){

		let flag = 0;
		let cont = 1;
		let week = [];
		const points = [];
		const database = new db();
		const data = await database.get_comhabits_m(user_id, month, year);

		data.rows.foreach(item => {
			if(flag == 0){
				week.push(item);
				const temp = new Date(item.date);
				cont = temp.getDay() + 1;
			}else{
				if(cont != 7){
					week.push(item);
					cont++;
				}else{
					week.push(item);
					points.push(week);
					cont = 1;
					week = [];
				}
			}
		});

		return points;
		
	}

	static async get_habit_graph_w(user_id, start, end){

		const database = new db();
		const data = database.get_comhabits_w(user_id, start, end);

		return data.rows;

	}

}
