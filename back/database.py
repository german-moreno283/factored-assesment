from sqlalchemy import text, create_engine
import json

engine = create_engine("sqlite+pysqlite:///:memory:", echo=True)

with engine.connect() as conn:
    conn.execute(text("CREATE TABLE users (id int, username str,password str,name str, position str, avatar str, skillSet json)"))
    conn.execute(
        text("""INSERT INTO users (id, username, password, name, position, avatar, skillSet) 
            VALUES (:id, :username, :password, :name, :position, :avatar, :skillSet)"""),
        [{
            "id": 1,
            "username": "johndoe",
            "password": "482148a60c2564bb3fc1962dd24cb6e1aaaf851941875cda0a863382eed8df90",
            "name": "John Doe",
            "position": "CEO",
            "avatar": "https://robohash.org/johndoe",
            "skillSet": json.dumps(
                {
                    "python":2.8,
                    "javascript":3,
                    "spark":4.7,
                    "sql":4,
                    "css":4,
                }
            )
        },
        {
            "id": 2,
            "username": "janedoe",
            "password": "482148a60c2564bb3fc1962dd24cb6e1aaaf851941875cda0a863382eed8df90",
            "name": "Jane Doe",
            "position": "CTO",
            "avatar": "https://robohash.org/janedoe",
            "skillSet": json.dumps(
                {
                    "python":3,
                    "javascript":4,
                    "spark":2,
                    "sql":4.7,
                    "css":2.8,
                }
            )
        }
        ]
    )
    conn.commit()

def get_element_by_username(username):
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM users WHERE username=:username"), {"username": username})
        if result.rowcount == 0:
            return None
        result = result.first()
        return {
            "id": result[0],
            "username": result[1],
            "password": result[2],
            "name": result[3],
            "position": result[4],
            "avatar": result[5],
            "skillSet": json.loads(result[6])
        }
def get_all_elements():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM users"))
        return [
            {
                "id": row[0],
                "username": row[1],
                "password": row[2],
                "name": row[3],
                "position": row[4],
                "avatar": row[5],
                "skillSet": json.loads(row[6])
            }
            for row in result
        ]