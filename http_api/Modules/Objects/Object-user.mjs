import {table} from "./Object-table.mjs"

export class user{

        constructor(id, password, name, mail){
                super()
                this.columns = ["id", "password", "name", "mail"];
                this.values = [id ?? null, password ?? null, name ?? null, mail ?? null];
                this.table_name = "users"
        }
}

