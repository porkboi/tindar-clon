## 'algLibTest.py' – testing functions in the algLib (algorithm library)
import libraries.algLib as algLib
import sqlite3
import random
import algorithm as algorithm
from libraries.applicantDictAssembler import getApplicantDict

from flask import Flask

app = Flask(__name__)

@app.route('/output')
def main():
    conn = sqlite3.connect('../main.db')
    cursor = conn.cursor()
    cursor.execute('DROP TABLE IF EXISTS applicant_pool;')
    cursor.execute('DROP TABLE IF EXISTS interactions_table;')
    cursor.execute('DROP TABLE IF EXISTS statistics;')
    conn.commit()
    conn.close()




    ## NOT to be confused with getNodesFromDB() which returns an applicant dictionary
    ## This function is just meant to load the mock users from CVV files into an applicant dictionary
    applicantDict = getApplicantDict()



    algLib.createApplicantTable()
    algLib.createEdgeTable()
    algLib.createStatisticsTable()

    for applicantKey in applicantDict:
        algLib.addApplicantToDB(applicantDict[applicantKey])
        GPA = random.randint(290,400) / 100
        ricePurityScore = random.randint(1,100)
        tindarIndex = algLib.calcTindarIndex(GPA, ricePurityScore)
        algLib.addTindarIndexToDB(applicantKey, tindarIndex)

    for i in range(8000):
        interaction = 0
        random_userIDs = random.sample(list(applicantDict.keys()), 2)
        random_number = random.randint(0,10)
        if 0 <= random_number <= 2:
            interaction = 0
        elif 3 <= random_number <= 8:
            interaction = 1
        else:
            interaction = 9
        ### AS ANNOYING AS IT IS, THE TEST WOULD BE A LOT MORE REALISTIC IF I MADE THE INTERACTIONS MORE REALISTIC... I KNOW ITS STILL GOOD, BUT, IF IM GONNA SHOW IT TO JOBS MAYBE ITS WORTH IT TO MAKE THE INTERACITONS MORE REALISTIC, BUT ALSO IT WOULD BE A PAIN IN THE ASS... I DONT KNOW
        algLib.addInteractionToDB(random_userIDs[0], random_userIDs[1], interaction)

    wholeGraph = algLib.buildWholeGraphFromDB()

    string_selfID_sample = random.sample(list(applicantDict.keys()), 5)
    ## convert userID's to integers
    int_selfID_sample = []
    for element in string_selfID_sample:
        int_selfID_sample.append(int(element))

    print("random_selfID_sample: ", int_selfID_sample)
    
    return str(int_selfID_sample)

if __name__ == '__main__':
    app.run()