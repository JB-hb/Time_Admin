import pg from "pg"

export class db {

	async contructor(){

		this.Insert = [];
		this.Delete = [];
		this.Update = [];
		this.Client = pg.Client;
		this.db_client = new Client({
			user: process.env.DB_USER ?? "noctis",
			password: process.env.DB_PASSWORD ?? "526485JB",
			port: process.env.DB_PORT ?? 5432,
			host: process.env.DB_HOST ?? "localhost",
			database: process.env.DB_NAME ?? "Time_Admin",
		});

		await this.db_client.connect();

	}

	//Normal crud functions

	async push_data(){

		let results = [];

		if(this.Insert.length > 0){

			let queryI = {
				values: [],
				finalQ: `INSERT INTO ${this.Insert[0].is_type()} VALUES `,
			}; 

			let temp_values = []

			let cont = 1;

			this.Insert.forEach( item => {
				let temp = {
					data: item.get_values(true),
				};
				temp_values.push(temp);
			});

			temp_values.forEach( item => {
				queryI.finalQ = queryI.finalQ + "(";
				item.data.forEach(element => {
					queryI.finalQ = queryI.finalQ + ` $${cont},`;
					queryI.values.push(element);
					cont ++;
				})
				queryI.finalQ = queryI.finalQ.slice(0,-1);
				queryI.finalQ = queryI.finalQ + "), ";
			});

			queryI.finalQ = queryI.finalQ.slice(0,-2);

			for(let i = 0; i < queryI.values.length; i++){
				queryI.values[i] = queryI.values[i].data;
			}	

			try{

				const result = await this.db_client.query(queryI.finalQ, queryI.values);

				if(result.rows.length > 0 ){

					results.push({
						type: "insert",
						rows: result.rows,
						table: this.Insert[0].isType(),
					});

				}

			}catch(error){

				results.push({
					type: "insert",
					error: "error inserting values",
				});

			}

			this.Insert = [];


		}

		if(this.Update.length > 0){

			let resultsU = {
				type: "update",
				rows: [],
				errors: [],
			}

			let queryU = {
				finalQ: ``,
				values: [],
			};

			this.Update.forEach(async item => {

				let columns = item.get_columns();
				queryU.values = item.get_values();
				let cont = 1;

				queryU.finalQ = `UPDATE ${this.Update[0].is_type()} SET `

				for(let i = 0; i < columns.length; i++){
					queryU.finalQ = queryU.finalQ + `${columns[i]} = $${cont} `;
					cont ++
				}

				queryU.finalQ = queryU.finalQ + `WHERE id = $${cont}`;
				queryU.values.push(item.get_id());

				try{

					const result = await db_client.query(queryU.finalQ, queryU.values);

					if(result.rows.length > 0){
						resultsU.rows.push(result.rows[0]);
					}

				}catch(error){
					results.error.push(item.getId);
				}
			})

			results.push(resultsU);

			this.Update = [];

		}

		if(this.Delete.length > 0){

			let queryD = {
				finalQ:`DELETE FROM ${this.Delete[0].is_type()} WHERE id IN (`,
				ids:[],
			};
			let cont = 1;

			this.Delete.forEach(async item => {
				queryD.finalQ = queryD.finalQ + ` $${cont},`;
				cont++;
				queryD.ids.push(item.get_id());
			})

			queryD.finalQ = queryD.finalQ.slice(0,-1);
			queryD.finalQ = queryD.finalQ + `);`;

			try{

				this.db_client.query(queryD.finalQ, queryD.ids);	
				results.push({
					type: "delete",
					errors:[],
				})

			}catch(error){
				results.push({
					type: "delete",
					errors: [error],
				})
			}

			this.Delete = [];

		}

		return results;

	}

	async get_row(table, columns, values){

		try{

			let text: `SELECT * FROM ${table} WHERE `;

			for(let i = 0; i < (columns.length - 1); i++){
				text = text + `${column[i]} = $${i+1} AND`
			}

			text = text + `${columns[columns.length-1]} = $${columns.length};`

			const result = this.db_client.query(text, values);

			return result;

		}catch(error){
			return error;
		}

	}

	async insert_s(item){

		try{

			let text = `INSERT INTO ${item.is_type()} VALUES (`

			const columns = item.get_columns(true);
			columns.forEach((column, index) => {
				text = text + ` $${index + 1},`
			})
			text = text.slice(0, -1);
			text = text + ") RETURNING *;";

			const result = await db_client.query(text, items.get_values(true));

			return result;

		}catch(error){
			return error;
		}

	}

	async update_s(item){

		try{

			let text = `UPDATE ${item.is_type()} SET`
			const columns = item.get_columns();

			columns.forEach((column, index) => {
				text = text + ` ${column} = $${index+1},`;
			});

			text.slice(0.-1);
			text = text + ` WHERE id = ${item.get_id()}` 

			const result = db_client.query(text, [item.get_values]);
			return result;

		}catch(error){
			return error;
		}

	}

	async delete_s(item){
		try{

			let text = `DELETE FROM ${item.is_type()} WHERE id = $1`
			const result = await db_client.query(text, item.get_id);

			return result;

		}catch(error){
			return error;
		}
	}

	add_insert(item){
		this.Insert.push(item);
	}

	add_update(item){
		this.Update.push(item);
	}

	add_delete(item){
		this.Delete.push(item);
	}

	set_stack(ins, upd, del){
		this.Insert = ind;
		this.Update = upd;
		this.Delete = del;
	}

	//habits related functions	

	confirm_last_date(month, year){

		const dias = [31,30,29,28];

		for(let i = 0; i < dias.length; i++){
			const temp = new Date(year, month - 1, dias[i]);
			if(temp.getMonth == month - 1){
				return temp;
			}
		}

	}

	//Entrada de la funcion es 
	//user -> id del usuario
	//obj -> objeto que contiene el year y el mes que se esta buscando

	async get_comhabits_m(user, {month, year}){

		const response = [];
		const first = new Date(year, month-1, 1);
		const last = confirm_last_date(month, year);  
		const base_query = "SELECT COUNT(id) as cumplido FROM habits_completed INNER JOIN habits ON habits.id = habits_completed.habit_id WHERE habits.user_id = $1 AND habits_completed.created_at BETWEEN $2 AND $3;";
		let range_f = 1;
		let range_l = range_f + (7 - (first.getDay() + 1));
		let flag = 0;

		try{

			while(flag = 0){

				const result = await db_client.query(base_query, [user, `${year}/${month}/${range_f}`, `${year}/${month}/${range_l}`]);
				response.push(result.rows);

				range_f = range_l + 1;

				if(range_l == last.getDate()){
					flag = 1;
					continue;
				}

				if(range_f + 6 <= last.getDate()){
					range_l = range_f + 6;
				}else{
					range_l = last.getDate();
				}

			}	

		}catch(error){
			return error;
		}

	}

	//Entrada de la funcion es:
	//user -> id del usuario que busca
	//start -> fecha de inicio de busqueda
	//end -> fecha final de busqueda

	async get_comhabits_r(user, start, end){

		try{
			const query_days = "SELECT created_at COUNT(created_at) AS completed FROM habits_completed INNER JOIN habits ON habits.id = habits_completed.habit_id WHERE habits.user_id = $1 AND habits_completed.created_at BETWEEN $2 AND $3 GROUP BY created_at;";

			const response = await db_client.query(query_days, [user, start, end]);	

			return {
				data: response,
			};

		}catch(error){
			return error;
		}
	}

	async get_comhabits_y(user, year){

		const base_query = ""

		for(let i = 1; i <= 12; i++){



		}
		
	}


}
