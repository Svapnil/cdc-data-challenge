dat <- read.csv("C:/Users/HP/Documents/CDCmydata/pov19-QueryResult.csv", header=TRUE)
datMentalHealth <- read.csv("C:/Users/HP/Documents/CDCmydata/health-QueryResult.csv", header=TRUE)

BigDataset <- merge(dat, datMentalHealth, by= c("state", "year")) %>%
  select(state, year, SuicideMean, PovertyPercentage, mentalHealthMean)

write.csv(BigDataset, file="merged.csv")

BigDataset$SZscore <- zscore(BigDataset$SuicideMean)
BigDataset$PZscore <- zscore(BigDataset$PovertyPercentage)
BigDataset$MZscore <- zscore(BigDataset$mentalHealthMean)

hist(BigDataset$SZscore)
hist(BigDataset$PZscore)
hist(BigDataset$MZscore)

meanSrate <- mean(BigDataset$SZscore)
meanPrate <- mean(BigDataset$PZscore)
meanMrate <- mean(BigDataset$MZscore)

write.csv(BigDataset, file="formattedData.csv")
