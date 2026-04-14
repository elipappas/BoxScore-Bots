# How-To Guide

Welcome! The main feature of this site is the **Projection Table**, which functions like an Excel spreadsheet. You can **search, sort, and filter** data to explore our NBA player projections. Filters allow you to find players with the **most points, rebounds, assists, or highest projected PRA** (Points + Rebounds + Assists).

Beyond the Projection Table, there are additional pages for:  
- **Model Accuracy:** Track how well our projections match actual game outcomes.  
- **Projection vs. Sportsbook:** See the biggest differences between our projections and sportsbook lines.

Our aim is for the site to be extremely easy to use and very intuitive so that a guide like this is unneeded, but as more features are added, we will continue to update this guide to reflect those changes. There are no user accounts as of right now and everything is free to use and viewable for anyone.

---

## Getting Started

1. **Search for a Player:**  
   Use the search bar to quickly locate a player by name.

2. **Sort and Filter:**  
   Click column headers to sort stats. Use filters to highlight top performers in points, rebounds, assists, or PRA.

3. **Understand the Stats:**  
   Hover over column headers or refer to the **Glossary** below to see what each stat means and how it’s calculated.

---

# Glossary (source: basketball-reference.com)

- **2P** – 2-Point Field Goals  
- **2P%** – 2-Point Field Goal Percentage; the formula is  
  $$\frac{2P}{2PA}$$

- **2PA** – 2-Point Field Goal Attempts  

- **3P** – 3-Point Field Goals (available since the 1979–80 NBA season)  

- **3P%** – 3-Point Field Goal Percentage (available since the 1979–80 NBA season); the formula is  
  $$\frac{3P}{3PA}$$

- **3PA** – 3-Point Field Goal Attempts (available since the 1979–80 NBA season)  

- **Age** – Player age on January 31 of the given season  

- **AST** – Assists  

- **AST%** – Assist Percentage (available since the 1964–65 NBA season); the formula is  
  $$\frac{100 \cdot AST}{\left(\left(\frac{MP}{TmMP/5}\right)\cdot TmFG\right)-FG}$$  
  Estimates the percentage of teammate field goals assisted while on the floor.

- **Award Share** –  
  $$\frac{\text{Award Points}}{\text{Maximum Award Points}}$$  
  Example: $962 / 1190 = 0.81$

- **BLK** – Blocks (available since the 1973–74 NBA season)  

- **BLK%** – Block Percentage (available since the 1973–74 NBA season); the formula is  
  $$\frac{100 \cdot BLK \cdot (TmMP/5)}{MP \cdot (OppFGA - Opp3PA)}$$

- **BPM** – Box Plus/Minus; points per 100 possessions above league average  

- **DPOY** – Defensive Player of the Year  

- **DRB** – Defensive Rebounds (available since the 1973–74 NBA season)  

- **DRB%** – Defensive Rebound Percentage; the formula is  
  $$\frac{100 \cdot DRB \cdot (TmMP/5)}{MP \cdot (TmDRB + OppORB)}$$

- **DRtg** – Defensive Rating; points allowed per 100 possessions  

- **DWS** – Defensive Win Shares  

- **eFG%** – Effective Field Goal Percentage; the formula is  
  $$\frac{FG + 0.5 \cdot 3P}{FGA}$$

- **FG** – Field Goals  

- **FG%** – Field Goal Percentage; the formula is  
  $$\frac{FG}{FGA}$$

- **FGA** – Field Goal Attempts  

- **FT** – Free Throws  

- **FT%** – Free Throw Percentage; the formula is  
  $$\frac{FT}{FTA}$$

- **FTA** – Free Throw Attempts  

- **Four Factors** – Dean Oliver’s Four Factors of Basketball Success  

- **G** – Games  

- **GB** – Games Behind; the formula is  
  $$\frac{(W_{first} - W) + (L - L_{first})}{2}$$

- **GmSc** – Game Score; the formula is  
  $$PTS + 0.4FG - 0.7FGA - 0.4(FTA - FT) + 0.7ORB + 0.3DRB + STL + 0.7AST + 0.7BLK - 0.4PF - TOV$$

- **GS** – Games Started  

- **L** – Losses  

- **L Pyth** – Pythagorean Losses;  
  $$G - W_{Pyth}$$

- **MVP** – Most Valuable Player  

- **MP** – Minutes Played  

- **MOV** – Margin of Victory;  
  $$PTS - OppPTS$$

- **ORtg** – Offensive Rating; points produced per 100 possessions  

- **ORB** – Offensive Rebounds  

- **ORB%** – Offensive Rebound Percentage; the formula is  
  $$\frac{100 \cdot ORB \cdot (TmMP/5)}{MP \cdot (TmORB + OppDRB)}$$

- **OWS** – Offensive Win Shares  

- **Pace** – Pace Factor; the formula is  
  $$48 \cdot \frac{TmPoss + OppPoss}{2 \cdot (TmMP/5)}$$

- **PER** – Player Efficiency Rating  

- **PF** – Personal Fouls  

- **PTS** – Points  

- **STL** – Steals  

- **STL%** – Steal Percentage; the formula is  
  $$\frac{100 \cdot STL \cdot (TmMP/5)}{MP \cdot OppPoss}$$

- **TOV** – Turnovers  

- **TOV%** – Turnover Percentage; the formula is  
  $$\frac{100 \cdot TOV}{FGA + 0.44FTA + TOV}$$

- **TRB** – Total Rebounds  

- **TRB%** – Total Rebound Percentage; the formula is  
  $$\frac{100 \cdot TRB \cdot (TmMP/5)}{MP \cdot (TmTRB + OppTRB)}$$

- **TS%** – True Shooting Percentage; the formula is  
  $$\frac{PTS}{2 \cdot TSA}$$

- **TSA** – True Shooting Attempts;  
  $$FGA + 0.44FTA$$

- **Usg%** – Usage Percentage; the formula is  
  $$\frac{100 \cdot (FGA + 0.44FTA + TOV) \cdot (TmMP/5)}{MP \cdot (TmFGA + 0.44TmFTA + TmTOV)}$$

- **VORP** – Value Over Replacement Player  

- **W** – Wins  

- **W-L%** – Win–Loss Percentage;  
  $$\frac{W}{W + L}$$

- **WS** – Win Shares  

- **WS/48** – Win Shares per 48 Minutes  

- **Win Probability** – Estimated probability Team A defeats Team B  

- **Year** – Final calendar year of the season  

---

# FAQs

## What’s the accuracy of the projections?

- We currently aim for approximately **60% accuracy**.
- Models are retrained continuously as new data becomes available.
- Projections are **not guaranteed outcomes** and **not gambling advice**.

## How can I find a specific player in the Projection Table?

- Use the search bar and type the player’s name.

## What stats do you project?

- Points, rebounds, and assists.
- Additional stats will be added as models improve.

## How often are projections updated?

- Updated daily and closer to game time for injuries and lineup changes.

## Do you project single games or full seasons?

- Only **single-game projections** are currently supported.

## What machine learning techniques are used?

- Regression models  
- Tree-based methods  
- Neural networks
- XGBoost

## Expenses
We spent about $20 on purchasing the poster board for the CEAS Expo, which we split the costs for. Besides that we didn't have any other expenses on the project.

## Final Result of Hours Spent
Eli Pappas: 120 hours
I spent over 40 hours researching and finding valuable data sets, which included time sunk in working on a web scraper to get data that never ended up working as well as integrating other resources that didn't pan out before finding our Kaggle dataset. I also spend a decent amount of time, around 20 to integrate and clean the good dataset and sift through features needed to train the models. So overall I spend around 60 hours working on our data pipeline. I spent 20 hours or so to create and train the models we used whichc includes finding new models, building out the models, and tweaking how features were used. I spent another 5-10 on setting up the database to be useable for the output data and the website. Another 10 hours was spent doing tracking to see how the model performed and store the results. Finally, I spent another 20 hours doing various tweaks, around the website, behind the scenes database work, local notebooks to see how our over/underperformed, and more time spent finding valid APIs for sportsbook tracking and integrating that in with our projections.

Nikhil Gupta: 110 hours
I spent about 15 hours researching effective ML models to make the predictions and gathering information on them. I spent about 40 hours helping Eli on model implementation and training, as well as analysis of model performance. Therefore, approximately 55 hours of my time was spent contributing towards the machine learning tasks for the project. I spent 10 hours designing mockups for the front-end web pages, then 20 hours developing the pages itself and connecting backend to front end, totalling up to 30 hours of work for front end/UI development. I spent 5 hours towards integration of the entire website into the hosting via Vercel which involved some heavy debugging. Finally, I did about 20 hours of work on the non-technical aspects of the project like poster design, printing and board preparation.
