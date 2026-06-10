from flask import Flask,render_template
import pymysql

app = Flask(__name__)

class Database :
    def __init__(self):
    
        host = "127.0.0.1"
        user = "root"
        password = "jeanjames"
        db = "police"
        self.con = pymysql.connect(host=host, user=user, password=password, db=db,
                               cursorclass=pymysql.cursors.DictCursor )
        self.cur = self.con.cursor()

@app.route('/')
def home():
    return render_template("basic.html")

@app.route('/station')
def station():
    db_connection=Database()
    db_connection.cur.execute("select * from pstation")
    data = db_connection.cur.fetchall()
    return render_template("station.html", pstation=data)

@app.route("/case")
def case():
    query="""
    select
    c.caseid,
    c.title,
    c.description,
    c.status,
    o.pname,
    c.firid,
    c.case_date,
    c.open_date,
    c.close_date
    
    from cases c
    join officer o on c.officerid=o.officerid
    left join fir f on f.firid=c.firid
"""
    db_conn = Database()
    db_conn.cur.execute(query)
    data = db_conn.cur.fetchall()
    return render_template("caselist.html",cases=data)


@app.route("/fir")
def fir():
    query="""
    select
    f.firid,
    f.firdate,
    f.firdiscription,
    o.pname,
    p.name,
    f.complainant_name,
    f.complainant_phone

    from fir f
    join officer o on f.officerid=o.officerid
    join pstation p on f.stationid=p.stationid

"""
    db_conn = Database()
    db_conn.cur.execute(query)
    data = db_conn.cur.fetchall()
    return render_template("fir.html", fir=data)

@app.route("/vehicle")
def vehicle():
    db_conn = Database()
    db_conn.cur.execute("select * from vehicle")
    data = db_conn.cur.fetchall()
    return render_template("vehiclelist.html",vehicle=data)

@app.route("/officer")
def officer():
    query="""
    select
    o.officerid,
    o.pname,
    o.prank,
    p.name,
    o.salary,
    o.location,
    o.ph,
    o.gender,
    o.age,
    o.emergency_contact
    from officer o
    left join pstation p on o.stationid=p.stationid

"""
    db_conn = Database()
    db_conn.cur.execute(query)
    data = db_conn.cur.fetchall()
    return render_template("officer.html", officer=data)

@app.route("/criminal")
def criminal():
    db_conn = Database()
    db_conn.cur.execute("select * from criminal")
    data = db_conn.cur.fetchall()
    return render_template("criminallist.html", criminal=data)

@app.route("/cc")
def case_criminal():
    db_conn = Database()
    query="""
    select 
    cc.id,
    c.title,
    cr.cr_name
    from case_criminal cc
    join cases c on c.caseid = cc.caseid
    join criminal cr on cr.criminalid = cc.criminalid
"""
    db_conn.cur.execute(query)
    data = db_conn.cur.fetchall()
    return render_template("casecriminal.html",case_criminal=data)

if __name__ == "__main__":
    app.run(debug=True)