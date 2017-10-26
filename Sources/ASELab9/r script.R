for(i in 1:rep)
{
  train = sample(1:n,nt) 
  events_train = qda(Events2~Temp.F+Sea_Level_Press.in+Wind.mph, data1[train,]) 
  predict(events_train,data1[-train,])$class
  tablin=table(data1$Events2[-train],predict(events_train,data1[-train,])$class)
  errlin[i] = (neval-sum(diag(tablin)))/neval
  acc[i] = sum(diag(tablin))/neval
  precision_Snow[i] = tablin[1,1]/(tablin[1,1]+tablin[3,1]+tablin[2,1])
  recall_Snow[i] = tablin[1,1]/(tablin[1,1]+tablin[1,3]+tablin[1,2])
  precision_Thunderstorm[i]=tablin[3,3]/(tablin[3,3]+tablin[1,3]+tablin[2,3])
  recall_Thunderstorm[i] = tablin[3,3]/(tablin[3,3]+tablin[3,1]+tablin[3,2])
  precision_Rain[i] = tablin[2,2]/(tablin[2,2]+tablin[1,2]+tablin[3,2])
  recall_Rain[i] = tablin[2,2]/(tablin[2,2]+tablin[2,1]+tablin[2,3])
}

for(i in 1:rep)
{
  train = sample(1:n,nt)
  wtrain = data2[train,2:4]
  wtest = data2[-train,2:4]
  wlabels = data2[train,5]
  wknn7 = knn(wtrain,wtest,wlabels,k=7)
  tablin = table(wknn7,data2[-train,5])
  errlin[i] = (neval-sum(diag(tablin)))/neval
  acc[i] = sum(diag(tablin))/neval
  precision_Rain[i] = tablin[1,1]/(tablin[1,1]+tablin[3,1]+tablin[2,1])
  recall_Rain[i] = tablin[1,1]/(tablin[1,1]+tablin[1,3]+tablin[1,2])
  precision_Snow[i]=tablin[3,3]/(tablin[3,3]+tablin[1,3]+tablin[2,3])
  recall_Snow[i] = tablin[3,3]/(tablin[3,3]+tablin[3,1]+tablin[3,2])
  precision_Thunderstorm[i] = tablin[2,2]/(tablin[2,2]+tablin[1,2]+tablin[3,2])
  recall_Thunderstorm[i] = tablin[2,2]/(tablin[2,2]+tablin[2,1]+tablin[2,3])
}

data2 =data2[-5]


 for(i in 1:rep)
   {
       train = sample(1:n,nt) 
       events_train = glm(Events~Temp.F+Dew_Point.F+Humidity.percentage+Sea_Level_Press.in+Visibility.mi+Wind.mph+Precip.in, rts[train,],family = binomial) 
       predictvalue = predict(events_train,rts[-train,],type="response")
       
       tablin=table(rts$Events[-train],ifelse(predictvalue > 0.5 , 1 ,0))
       errlin[i] = (neval-sum(diag(tablin)))/neval
       acc[i] = sum(diag(tablin))/neval
       prec[i] = tablin[1,1]/(tablin[1,1]+tablin[3,1])
       rec[i] = tablin[1,1]/(tablin[1,1]+tablin[1,2])
     }


 for(i in 1:rep)
   {
       train = sample(1:n,nt) 
       events_train = lda(Events~Temp.F+Sea_Level_Press.in+Wind.mph, data1[train,]) 
       p=predict(events_train,data1[-train,])$class
       tablin=table(data1$Events[-train],predict(events_train,data1[-train,])$class)
       errlin[i] = (neval-sum(diag(tablin)))/neval
       acc[i] = sum(diag(tablin))/neval
       precision_Rain[i] = tablin[1,1]/(tablin[1,1]+tablin[3,1]+tablin[2,1])
       recall_Rain[i] = tablin[1,1]/(tablin[1,1]+tablin[1,3]+tablin[1,2])
       precision_Snow[i]=tablin[3,3]/(tablin[3,3]+tablin[1,3]+tablin[2,3])
       recall_Snow[i] = tablin[3,3]/(tablin[3,3]+tablin[3,1]+tablin[3,2])
       precision_Thunderstorm[i] = tablin[2,2]/(tablin[2,2]+tablin[1,2]+tablin[3,2])
       recall_Thunderstorm[i] = tablin[2,2]/(tablin[2,2]+tablin[2,1]+tablin[2,3])
 }

----------------------------------------

   for(i in 1:rep)
        {
              train = sample(1:n,nt) 
              events_train = glm(Events~Temp.F+Dew_Point.F+Humidity.percentage+Sea_Level_Press.in+Visibility.mi+Wind.mph+Precip.in, rts[train,],family = binomial) 
              predictvalue = predict(events_train,rts[-train,],type="response")
              
                tablin=table(rts$Events[-train],ifelse(predictvalue > 0.5 , 1 ,0))
                errlin[i] = (neval-(tablin[1,1]+tablin[3,2]))/neval
                acc[i] = (tablin[1,1]+tablin[3,2])/neval
                precision_Rain[i] = tablin[1,1]/(tablin[1,1]+tablin[3,1])
                recall_Rain[i] = tablin[1,1]/(tablin[1,1]+tablin[1,2])
                precision_Snow[i] = tablin[3,2]/(tablin[3,2]+tablin[1,2])
                recall_Snow[i] = tablin[3,2]/(tablin[3,2]+tablin[3,1])
        }


  
  
  
------------------------------------------  
  
  
  
  
   for(i in 1:rep)
     {
         train = sample(1:n,nt) 
         events_train = lda(Events~Temp.F+Sea_Level_Press.in+Wind.mph, rts[train,]) 
         predict(events_train,rts[-train,])$class
         tablin=table(rts$Events[-train],predict(events_train,rts[-train,])$class)
         errlin[i] = (neval-sum(diag(tablin)))/neval
         acc[i] = sum(diag(tablin))/neval
         precision_Rain[i] = tablin[1,1]/(tablin[1,1]+tablin[3,1])
         recall_Rain[i] = tablin[1,1]/(tablin[1,1]+tablin[1,3])
         precision_Snow[i]=tablin[3,3]/(tablin[3,3]+tablin[1,3])
         recall_Snow[i] = tablin[3,3]/(tablin[3,3]+tablin[3,1])
       }

  
  
  

-----------------------------------------------
  
  
   for(i in 1:rep)
     {
         train = sample(1:n,nt) 
         events_train = qda(Events2~Temp.F+Sea_Level_Press.in+Wind.mph, rts[train,]) 
         predict(events_train,rts[-train,])$class
         tablin=table(rts$Events2[-train],predict(events_train,rts[-train,])$class)
         errlin[i] = (neval-sum(diag(tablin)))/neval
         acc[i] = sum(diag(tablin))/neval
         precision_Rain[i] = tablin[2,2]/(tablin[2,2]+tablin[2,1])
         recall_Rain[i] = tablin[2,2]/(tablin[2,2]+tablin[2,1])
         precision_Snow[i] = tablin[1,1]/(tablin[1,1]+tablin[2,1])
         recall_Snow[i] = tablin[1,1]/(tablin[1,1]+tablin[1,2])
 
       }

  
  ----------------------------------------------------
  
  
   for(i in 1:rep)
     {
         train = sample(1:n,nt)
         wtrain = rts1[train,2:4]
         wtest = rts1[-train,2:4]
         wlabels = rts1[train,5]
         wknn3 = knn(wtrain,wtest,wlabels,k=3)
         tablin = table(wknn3,rts1[-train,5])
         errlin[i] = (neval-sum(diag(tablin)))/neval
         acc[i] = sum(diag(tablin))/neval
         precision_Rain[i] = tablin[1,1]/(tablin[1,1]+tablin[3,1])
         recall_Rain[i] = tablin[1,1]/(tablin[1,1]+tablin[1,3])
         precision_Snow[i]= tablin[3,3]/(tablin[3,3]+tablin[1,3])
         recall_Snow[i]= tablin[3,3]/(tablin[3,3]+tablin[3,1])
       }


  rts1 = rts1[-4]
  --------------------------------------------------
    
  for(i in 1:rep)
      {
         train = sample(1:n,nt) 
         events_train = glm(Events~Temp.F+Sea_Level_Press.in+Wind.mph, rts[train,],family = binomial) 
         predictvalue = predict(events_train,rts[-train,],type="response")
                       
         tablin=table(rts$Events[-train],ifelse(predictvalue > 0.5 , 1 ,0))
         errlin[i] = (neval-(tablin[1,1]+tablin[3,2]))/neval
         acc[i] = (tablin[1,1]+tablin[3,2])/neval
         precision_Rain[i] = tablin[1,1]/(tablin[1,1]+tablin[3,1])
         recall_Rain[i] = tablin[1,1]/(tablin[1,1]+tablin[1,2])
         precision_Snow[i] = tablin[3,2]/(tablin[3,2]+tablin[1,2])
         recall_Snow[i] = tablin[3,2]/(tablin[3,2]+tablin[3,1])
        }
  
    
    
    
    
------------------------------------------------------
    
    
for(i in 1:rep)
    {
        train = sample(1:n,nt) 
        events_train = lda(Events~Temp.F+Sea_Level_Press.in+Wind.mph, rts[train,]) 
        predict(events_train,rts[-train,])$class
        tablin=table(rts$Events[-train],predict(events_train,rts[-train,])$class)
        errlin[i] = (neval-sum(diag(tablin)))/neval
        acc[i] = sum(diag(tablin))/neval
        precision_Rain[i] = tablin[1,1]/(tablin[1,1]+tablin[3,1])
        recall_Rain[i] = tablin[1,1]/(tablin[1,1]+tablin[1,3])
        precision_Snow[i]=tablin[3,3]/(tablin[3,3]+tablin[1,3])
        recall_Snow[i] = tablin[3,3]/(tablin[3,3]+tablin[3,1])
    }
  
    
    
    ----------------------------------------------------
    
    
    
     for(i in 1:rep)
            {
                  train = sample(1:n,nt) 
                  events_train = qda(Events2~Temp.F+Sea_Level_Press.in+Wind.mph, rts[train,]) 
                  predict(events_train,rts[-train,])$class
                  tablin=table(rts$Events2[-train],predict(events_train,rts[-train,])$class)
                  errlin[i] = (neval-sum(diag(tablin)))/neval
                  acc[i] = sum(diag(tablin))/neval
                  precision_Rain[i] = tablin[2,2]/(tablin[2,2]+tablin[2,1])
                  recall_Rain[i] = tablin[2,2]/(tablin[2,2]+tablin[2,1])
                  precision_Snow[i] = tablin[1,1]/(tablin[1,1]+tablin[2,1])
                  recall_Snow[i] = tablin[1,1]/(tablin[1,1]+tablin[1,2])
                }
  
    
    
    
    ----------------------------------------------------------
    
     for(i in 1:rep)
            {
                  train = sample(1:n,nt)
                  wtrain = rts[train,2:8]
                  wtest = rts[-train,2:8]
                  wlabels = rts[train,9]
                  wknn3 = knn(wtrain,wtest,wlabels,k=3)
                  tablin = table(wknn3,rts[-train,9])
                  errlin[i] = (neval-sum(diag(tablin)))/neval
                  acc[i] = sum(diag(tablin))/neval
                  precision_Rain[i] = tablin[1,1]/(tablin[1,1]+tablin[3,1])
                  recall_Rain[i] = tablin[1,1]/(tablin[1,1]+tablin[1,3])
                  precision_Snow[i]= tablin[3,3]/(tablin[3,3]+tablin[1,3])
                  recall_Snow[i]= tablin[3,3]/(tablin[3,3]+tablin[3,1])
                }
  
    
    
    
    
    
    ---------------------------------------------------
    
     for(i in 1:rep)
            {
                  train = sample(1:n,nt)
                  wtrain = rts[train,2:8]
                  wtest = rts[-train,2:8]
                  wlabels = rts[train,9]
                  wknn7 = knn(wtrain,wtest,wlabels,k=7)
                  tablin = table(wknn7,rts[-train,9])
                  errlin[i] = (neval-sum(diag(tablin)))/neval
                  acc[i] = sum(diag(tablin))/neval
                  precision_Rain[i] = tablin[1,1]/(tablin[1,1]+tablin[3,1])
                  recall_Rain[i] = tablin[1,1]/(tablin[1,1]+tablin[1,3])
                  precision_Snow[i]= tablin[3,3]/(tablin[3,3]+tablin[1,3])
                  recall_Snow[i]= tablin[3,3]/(tablin[3,3]+tablin[3,1])
                }
  
    ---------------------------------------------------

errlin = dim(rep)
precision_Rain= dim(rep)
recall_Rain = dim(rep)
precision_Snow = dim(rep)
recall_Snow = dim(rep)
acc=dim(rep)
precision_Thunderstorm = dim(rep)
recall_Thunderstorm = dim(rep)

merrlin=mean(errlin)
merrlin

macc=mean(acc)
macc

mprecision_Rain = mean(precision_Rain)
mprecision_Rain

mrecall_Rain = mean(recall_Rain)
mrecall_Rain

mprecision_Snow = mean(precision_Snow)
mprecision_Snow

mrecall_Snow = mean(recall_Snow)
mrecall_Snow

mprecision_Thunderstorm = mean(precision_Thunderstorm)
mprecision_Thunderstorm

mrecall_Thunderstorm = mean(recall_Thunderstorm)
mrecall_Thunderstorm

tablin
View(tablin)

data = read.csv("file:///C:/Users/Waynage7/Desktop/kc_weather_srt.csv", header = T)

rts = subset(data,Events !="Rain_Thunderstorm")

rts$Events2 = ifelse(rts$Events == "Rain",1,0)
n = 366
nt= 290
neval = n-nt
summary(events_train)
events= lm(Events2~Temp.F+Sea_Level_Press.in+Visibility.mi+Wind.mph, data=rts)
events_train = lda(Events2~Temp.F+Dew_Point.F+Humidity.percentage+Sea_Level_Press.in+Visibility.mi+Wind.mph+Precip.in, rts[train,])


rts1 = rts[-3]

rts1 = rts1[-4]

data1$Events2 = ifelse(data1$Events == "Rain",1,ifelse(data1$Events =="Snow",0,2))

 data1 = read.csv("file:///C:/Users/Waynage7/Desktop/kc_weather_srt.csv", header = T)
