"""
'getterLib.py' – contains the functions needed to display data on the front-end
Spencer Reith – 24X
"""
import algorithm
import sqlite3
import pandas as pd
from libraries import algLib
from libraries import referralLib
from libraries import endorsementLib
import pandas as pd
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore



db = '../../main.db'
cap = 10

def getDeck(userID):
    selfID_Graph = algLib.buildSelfID_GraphFromDB(db, userID)
    ## get queue of userID's to swipe through
    userID_Queue = algorithm.getCompositeQueue(selfID_Graph, userID, cap)
    deck = []
    ## place userID & corresponding information in a double-layered dictionary
    for userID in range(len(userID_Queue)):
        di = getProfile(userID_Queue[userID])
        di["sn"] = userID
        deck.append(di)

    return deck

def getProfilePic(userID):
    cred = credentials.Certificate('../sixth-guru-430807-t5-8e2df9a6d7fc.json')
    app = firebase_admin.initialize_app(cred)
    db = firestore.client()

    person_ref = db.collection().document(userID)
    document = person_ref.get()
    return document


def getProfile(userID):
    res_df = getResumeDF(userID)
    applicant_df = getApplicantDF(userID)
    stats_df = getStatisticsDF(userID)
    pic = getProfilePic(userID)
    profile = {
            'id': userID,
            'name': applicant_df['name'][0],
            'image': pic,
            'major' : res_df['major'][0],
            'minor' : res_df['minor'][0],
            'skills' : res_df['skills'][0],
            'interests' : res_df['interests'][0],
            'tindarIndex' : stats_df['tindarIndex'][0],
    }
    return profile


def getResumeDF(userID):
    conn = sqlite3.connect(db)
    query = "SELECT * FROM resume_table WHERE userID = ?"
    df = pd.read_sql_query(query, conn, params=(userID,))
    conn.close()
    return df

def getApplicantDF(userID):
    conn = sqlite3.connect(db)
    query = "SELECT * FROM applicant_pool WHERE userID = ?"
    df = pd.read_sql_query(query, conn, params=(userID,))
    conn.close()
    return df

def getStatisticsDF(userID):
    conn = sqlite3.connect(db)
    query = "SELECT * FROM statistics WHERE userID = ?"
    df = pd.read_sql_query(query, conn, params=(userID,))
    conn.close()
    return df


def getEndRefs(userID):
    conn = sqlite3.connect(db)
    cursor = conn.cursor()
    query = '''
    SELECT endorsements_remaining, referrals_remaining
    FROM resume_table
    WHERE userID = ?
    '''
    cursor.execute(query, (userID,))
    results = cursor.fetchall()
    for row in results:
        remEndorsements, remReferrals = row
    conn.close()
    endRefs = {
        'remainingEndorsements' : remEndorsements,
        'remainingReferrals' : remReferrals
    }

    return endRefs

def getLeaderboard():
    ## create dataframe of b_userID's from endorsement_table
    conn = sqlite3.connect(db)
    cursor = conn.cursor()
    query = '''
    SELECT b_userID FROM endorsements_table
    '''
    df = pd.read_sql_query(query, conn)
    conn.close()
    ## find and return the 5 most highly endorsed applicants
    sorted_df = df['b_userID'].value_counts()
    top5_df = sorted_df.head(5)
    leaderboardDict = top5_df.to_dict()
    return leaderboardDict

def getConnections(userID):
    swipingMatches = []
    # referrals = []
    conn = sqlite3.connect(db)
    cursor = conn.cursor()
    query = '''
    SELECT * FROM interactions_table WHERE a_userID = ? OR b_userID = ?
    '''
    df = pd.read_sql_query(query, conn, params=(userID, userID))
    conn.close()
    ## filter by swiping connections, and refferals
    swiping_df = df[(df['weight'] == 1)]
    referrals_df = df[(df['weight'] == 14)]

    ## convert swiping connections and referrals to dictionaries
    raw_swiping_interactions = swiping_df.to_dict(orient='list')
    raw_referrals_dict = referrals_df.to_dict(orient='list')
    seenDict = {}

    ## iterate through swiping interactions
    for i in range(len(raw_swiping_interactions['a_userID'])):
        a_userID = raw_swiping_interactions['a_userID'][i]
        b_userID = raw_swiping_interactions['b_userID'][i]
        ## when the userID in question is not one's self
        if a_userID != userID:
            ## if they've already been seen, must be a two-way connection
            if a_userID in seenDict:
                swipingMatches.append(a_userID)
            else: ## put them in, it's at least a one way connection
                seenDict[a_userID] = 1
        ## same logic applies to b_userID
        if b_userID != userID:
            if b_userID in seenDict:
                swipingMatches.append(b_userID)
            else:
                seenDict[b_userID] = 1
    
    
    referrals = referralLib.getReferralInfo(db, userID)

    
                    # ## if a_userID is not one's self, it's the person he or she was referred to
                    # for i in range(len(raw_referrals_dict['a_userID'])):
                    #     a_userID = raw_referrals_dict['a_userID'][i]
                    #     if a_userID != userID:
                    #         referrals.append(a_userID)

    connections = {
        'userID' : userID,
        'swipingMatches' : swipingMatches,
        'referrals' : referrals
    }

    return connections

##getEndorsements

def overCharLimit(type, message):
    mLength = 0
    for word in message:
        for c in word:
            mLength += 1
    if type == 'skills':
        if mLength > 30:
            return True
    if type == 'interests':
        if mLength > 27:
            return True
    return False