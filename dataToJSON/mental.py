import json, pandas

data = {}


data['name'] = 'Mental Health'
data['colors'] = ['#EFF3FF', '#C6DBEF', '#9ECAE1', '#6BAED6', '#4292C6', '#2171B5', '#084594']
data['legend'] = [-3, -2, -1, 0, 1, 2, 3, 4]
data['year'] = [2011, 2012, 2013, 2014, 2015, 2016]
data['mean'] = [3.770261]
data['sdev'] = [0.5214085]
data['units'] = ['reported days of poor mental health monthly']
data['states'] = [
['Alabama', []],
['Alaska', []],
['Arizona', []],
['Arkansas',[]],
['California',[]],
['Colorado',[]],
['Connecticut',[]],
['Delaware',[]],
['District of Columbia',[]],
['Florida',[]],
['Georgia',[]],
['Hawaii',[]],
['Idaho',[]],
['Illinois',[]],
['Indiana',[]],
['Iowa',[]],
['Kansas',[]],
['Kentucky',[]],
['Louisiana',[]],
['Maine',[]],
['Maryland',[]],
['Massachusetts',[]],
['Michigan',[]],
['Minnesota',[]],
['Mississippi',[]],
['Missouri',[]],
['Montana',[]],
['Nebraska',[]],
['Nevada',[]],
['New Hampshire',[]],
['New Jersey',[]],
['New Mexico',[]],
['New York',[]],
['North Carolina',[]],
['North Dakota',[]],
['Ohio',[]],
['Oklahoma',[]],
['Oregon',[]],
['Pennsylvania',[]],
['Rhode Island',[]],
['South Carolina',[]],
['South Dakota',[]],
['Tennessee',[]],
['Texas',[]],
['Utah',[]],
['Vermont',[]],
['Virginia',[]],
['Washington', []],
['West Virginia', []],
['Wisconsin', []],
['Wyoming', []],
]


colnames = ['state', 'year', 'SuicideMean','PovertyPercentage', 'mentalHealthMean', 'SZscore', 'MZscore', 'PZscore']
dat = pandas.read_csv('C:/Users/HP/Documents/Datathon/cdc-data-challenge/experiments/dataset/mergedFair.csv', names=colnames)

names = dat.state.tolist()
sRates = dat.MZscore.tolist()

numStates = 0
suicideCtr = 0
sTotalCtr = 1
while(numStates < 51):
    while(suicideCtr < 6):
        data['states'][numStates][1].append(sRates[sTotalCtr])
        suicideCtr = suicideCtr + 1
        sTotalCtr = sTotalCtr + 1
    suicideCtr = 0
    numStates = numStates + 1



#json_data = json.dumps(data)
with open('mentalObj.json', 'w') as f:
  json.dump(data, f)