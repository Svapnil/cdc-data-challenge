import json, pandas

data = {}


data['name'] = 'Suicides'
data['colors'] = ['#EDF8E9', '#C7E9C0', '#A1D99B', '#74C476', '#41AB5D', '#238B45', '#005A32']
data['legend'] = [-3, -2, -1, 0, 1, 2, 3, 4]
data['year'] = [1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
data['mean'] = [13.2658]
data['sdev'] = [3.969344]
data['units'] = ['number of suicides per 100,000 people']
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


#colnames = ['state', 'year', 'ageadj','percent', 'mentalHealthMean', 'sZscore', 'pZscore']
colnames = ['state', 'year', 'suicideRate', 'povertyPerventage', 'suicideZScore', 'povertyZScore']
dat = pandas.read_csv('C:/Users/HP/Documents/BigYearMoves.csv', names=colnames)

names = dat.state.tolist()
sRates = dat.suicideZScore.tolist()

numStates = 0
suicideCtr = 0
sTotalCtr = 1
while(numStates < 51):
    while(suicideCtr < 18):
        data['states'][numStates][1].append(sRates[sTotalCtr])
        suicideCtr = suicideCtr + 1
        sTotalCtr = sTotalCtr + 1
    suicideCtr = 0
    numStates = numStates + 1



#json_data = json.dumps(data)
with open('suicidebigMoves.json', 'w') as f:
  json.dump(data, f)