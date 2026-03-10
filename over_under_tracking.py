import pandas as pd

# ======================
# File paths
# ======================
tracking_file = './data-collection/output_data/over_under_tracking.csv'
projections_file = './data-collection/output_data/projection_vs_sportsbook.csv'
actual_file = './data-collection/clean_data/PlayerStatistics.csv'

# ======================
# Load tracking safely
# ======================
try:
    tracking = pd.read_csv(tracking_file)
except FileNotFoundError:
    tracking = pd.DataFrame()

# Initialize structure if missing
if 'Date' not in tracking.columns:
    tracking = pd.DataFrame(columns=[
        'Date',
        'Player',
        'Projection',
        'Sportsbook Line',
        'Difference',
        'Recommendation',
        'Actual_PTS',
        'Difference_Actual_vs_Line',
        'Over_Under_Result',
        'Projection_Correct'
    ])

# ======================
# Load projections
# ======================
projections = pd.read_csv(projections_file)

# Add today's date if projections don't have one
if 'Date' not in projections.columns:
    projections['Date'] = pd.Timestamp.today().date()

# ======================
# Load actual results
# ======================
actual_results = pd.read_csv(actual_file, low_memory=False)

actual_results['Player'] = (
    actual_results['firstName'] + ' ' + actual_results['lastName']
).str.lower()

actual_results['Date'] = pd.to_datetime(
    actual_results['gameDateTimeEst']
).dt.date

actual_results = actual_results.rename(columns={
    'points': 'Actual_PTS'
})

actual_results = actual_results[['Player', 'Date', 'Actual_PTS']]

# ======================
# Standardize names
# ======================
tracking['Player'] = tracking['Player'].str.lower()
projections['Player'] = projections['Player'].str.lower()

tracking['Date'] = pd.to_datetime(tracking['Date']).dt.date
projections['Date'] = pd.to_datetime(projections['Date']).dt.date

# ======================
# 1. UPDATE EXISTING ROWS
# ======================
tracking = tracking.merge(
    actual_results,
    on=['Player', 'Date'],
    how='left',
    suffixes=('', '_new')
)

tracking['Actual_PTS'] = tracking['Actual_PTS'].combine_first(
    tracking['Actual_PTS_new']
)

tracking.drop(columns=[c for c in tracking.columns if c.endswith('_new')], inplace=True)

# ======================
# 2. CALCULATE RESULTS
# ======================
played = tracking['Actual_PTS'].notna()

tracking.loc[played, 'Difference_Actual_vs_Line'] = (
    tracking.loc[played, 'Actual_PTS'] -
    tracking.loc[played, 'Sportsbook Line']
)

tracking.loc[played, 'Over_Under_Result'] = (
    tracking.loc[played, 'Actual_PTS'] >
    tracking.loc[played, 'Sportsbook Line']
).astype(int)

tracking.loc[played, 'Projection_Correct'] = (
    ((tracking.loc[played, 'Recommendation'] == 1) &
     (tracking.loc[played, 'Actual_PTS'] > tracking.loc[played, 'Sportsbook Line'])) |
    ((tracking.loc[played, 'Recommendation'] == 0) &
     (tracking.loc[played, 'Actual_PTS'] < tracking.loc[played, 'Sportsbook Line']))
).astype(int)

# ======================
# 3. ADD NEW PROJECTIONS
# ======================
new_rows = projections.merge(
    tracking[['Date', 'Player']],
    on=['Date', 'Player'],
    how='left',
    indicator=True
)

new_rows = new_rows[new_rows['_merge'] == 'left_only'].drop(columns='_merge')

new_rows['Actual_PTS'] = pd.NA
new_rows['Difference_Actual_vs_Line'] = pd.NA
new_rows['Over_Under_Result'] = pd.NA
new_rows['Projection_Correct'] = pd.NA

# ======================
# 4. COMBINE
# ======================
final_table = pd.concat([tracking, new_rows], ignore_index=True)

final_table = final_table[
[
'Date',
'Player',
'Projection',
'Sportsbook Line',
'Difference',
'Recommendation',
'Actual_PTS',
'Difference_Actual_vs_Line',
'Over_Under_Result',
'Projection_Correct'
]
]

# ======================
# Save
# ======================
final_table.to_csv(tracking_file, index=False)

print("Over/Under tracking updated successfully.")