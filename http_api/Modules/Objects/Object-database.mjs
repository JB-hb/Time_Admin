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

	async push_data(){

		let results = [];

		if(this.Insert.length > 0){
			
			let queryI = {
				values: [],
				finalQ: `INSERT INTO ${this.Insert[0].isType()} VALUES `,
			}; 

			let cont = 1;

			this.Insert.foreach( item => {
				let temp = {
					data: item.getValues(true),
					num: item.getNumValues + 1,
				};
				queryI.values.push(temp);
			});

			queryI.values.foreach( item => {
				queryI.finalQ = query.finalQ + "(";
				for(let i = 0; i < item.num; i++){
					queryI.finalQ = queryI.finalQ + ` $${cont}`;
					cont ++;
				}	
				queryI.finalQ = query.finalQ + "), ";
			});

			queryI.finalQ = queryI.finalQ + "RETURNING id;"

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

			this.Update.foreach(async item => {

				let columns = item.getColumns();
				queryU.values = item.getValues();
				let cont = 1;

				queryU.finalQ = `UPDATE ${this.Update[0].isType()} SET `

				for(let i = 0; i < columns.length; i++){
					queryU.finalQ = queryU.finalQ + `${columns[i]} = $${cont} `; 
					cont ++
				}

				queryU.finalQ = queryU.finalQ + `WHERE id = $${cont} RETURNING id;`;
				queryU.values.push(item.getId);

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
				finalQ:`DELETE FROM ${this.Delete[0].isType()} WHERE id IN (`,
				ids:[],
			};
			let cont = 1;

			this.Delete.foreach(async item => {
				queryD.finalQ = queryD.finalQ + ` $${cont},`;
				cont++;
				queryD.ids.push(item.getId);
			})

			queryD.finalQ.slice(0,-1);
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
			columns.foreach((column, index) => {
				text = text + ` $${index + 1}`
			})
			text = text + ") RETURNING id;";

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

			columns.foreach((column, index) => {
				text = text + ` ${column} = $${index+1},`;
			});

			text.slice(0.-1);
			text = text + ` WHERE id = ${item.get_id()}` 

			const result = db_client.query(text, item.get_values);
			return result;

		}catch(error){
			return error;
		}

	}

	async delete_s(item){
		try{

			let text = `DELETE FROM ${item.is_type()} WHERE id = $1`
			const result = db_client.query(text, item.get_id);

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

	

}
