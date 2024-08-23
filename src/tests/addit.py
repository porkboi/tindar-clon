"""
Test file for additionaly getter, setter, and extraneous functions that have not been tested in other files
"""
import os
import sys

dirname = os.path.dirname(__file__)
parent_dir = os.path.abspath(os.path.join(dirname, os.pardir))
sys.path.append(parent_dir)


import sqlite3
import libraries.setterLib as setterLib
import libraries.getterLib as getterLib
import libraries.algLib as algLib
import libraries.analyticsLib as analyticsLib
import libraries.referralLib as referralLib
import libraries.endorsementLib as endorsementLib
import libraries.cencorshipLib as cencorshipLib
import libraries.resumeLib as resumeLib
from random import randint
from werkzeug.utils import secure_filename

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
frontend_host = "http://localhost:5173"
CORS(app, origins=[frontend_host])

@app.route('/output', methods=["GET"])
def main():
    ## empty existing tables
    myDB = '../../main.db'

    conn = sqlite3.connect(myDB)
    cursor = conn.cursor()
    cursor.execute('DROP TABLE IF EXISTS applicant_pool;')
    cursor.execute('DROP TABLE IF EXISTS interactions_table;')
    cursor.execute('DROP TABLE IF EXISTS statistics;')
    cursor.execute('DROP TABLE IF EXISTS referrals_table;')
    cursor.execute('DROP TABLE IF EXISTS endorsements_table;')
    cursor.execute('DROP TABLE IF EXISTS resume_table;')
    conn.commit()
    conn.close()

    algLib.createApplicantTable(myDB)
    algLib.createEdgeTable(myDB)
    analyticsLib.createStatisticsTable(myDB)
    referralLib.createReferralsTable(myDB)
    endorsementLib.createEndorsementsTable(myDB)
    resumeLib.createResumeTable(myDB)

    ####################################################
    #### Load Database #################################
    ####################################################


    for i in range(30):
        email = f"fakeperson{i}.{i}.26@dartmouth.edu"
        if randint(0, 1) == 0:
            sex = 'm'
            prefSex = 'f'
        else:
            sex = 'f'
            prefSex = 'm'
        major = f"Finance{i}"
        minor = f"Econ{i}"
        skills = ["skill1", "skill2", "skill3"]
        interests = ["interest1", "interest2", "interest3"]
        blurbList = ["N", "N", "N", "V", "V", "V", "A", "A", "A"]
        userID = setterLib.createUser(email, 2026, sex, prefSex)
        setterLib.createProfile(userID, major, minor, skills, interests, blurbList)
        tindarIndex = analyticsLib.calcTindarIndex(randint(2, 4), randint(0, 100))
        analyticsLib.addTindarIndexToDB(userID, tindarIndex)
        ############
        ### Assuming they are not the first or second user, make endorsement of previous 2 people
        ############
        if i >= 2:
            endorsementLib.attemptEndorsement(userID, f"fakeperson{i-1}.{i-1}.26@dartmouth.edu", f"{i} here endorsing {i-1}")
            endorsementLib.attemptEndorsement(userID, f"fakeperson{i-2}.{i-2}.26@dartmouth.edu", f"{i} here endorsing {i-2}")

        



    ## create user with proper parameters
    email = "john.b.hancock.iii.26@dartmouth.edu"
    sex = 'm'
    prefSex = 'f'
    major = "Economics"
    minor = "Finance"
    skills = ["fishing", "hunting", "coding"]
    interests = ["this", "that", "the other"]
    blurbList = ["N", "N", "N", "V", "V", "V", "A", "A", "A"]

    ## test if user is banned
    if cencorshipLib.is_banned(email):
        print("user is banned.")
    bannedEmail = "mr.doback.26@dartmouth.edu"
    if cencorshipLib.is_banned(bannedEmail):
        print("user is banned: ", bannedEmail)
    ## test for profanity in parameters
    for thisVar in [major, minor, skills, interests, blurbList]:
        if cencorshipLib.contains_prof(thisVar):
            print("profanity error. Please try again")

    ## since user passed checks create new user and profile
    newUserID = setterLib.createUser("john.b.hancock.iii.26@dartmouth.edu", 2026, 'm', 'f')
    setterLib.createProfile(newUserID, major, minor, skills, interests, blurbList)
    tindarIndex = analyticsLib.calcTindarIndex(randint(2, 4), randint(0, 100))
    analyticsLib.addTindarIndexToDB(newUserID, tindarIndex)

    ## get deck
    deck = getterLib.getDeck(newUserID)
    return deck

@app.route('/logging', methods = ['POST'])
def main2():
    username = request.data
    print(str(username))
    return username

@app.route('/upload', methods=['GET', 'POST'])
def fileUpload():
    target=os.path.join('..\img','test_docs')
    if not os.path.isdir(target):
        os.mkdir(target)
    file = request.files['file'] 
    filename = secure_filename(file.filename)
    destination="/".join([target, filename])
    file.save(destination)
    response="Whatever you wish too return"
    return response

if __name__ == '__main__':
    app.run()