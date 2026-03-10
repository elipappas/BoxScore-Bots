@echo off

python "./data-collection/data_processing.py" || goto error
python "./data-collection/injuries.py" || goto error
REM python "./ml_models/train_rnn_model.py" || goto error
REM python "./ml_models/train_xgb_model.py" || goto error
python "./ml_models/generate_xgb_projections.py" || goto error
python "./ml_models/generate_daily_projections.py" || goto error
python "track_model_success.py" || goto error
DEL "./data-collection/sportsbook_data/events.csv"
DEL "./data-collection/sportsbook_data/playerprops.csv"
python "./data-collection/over_under.py" || goto error
python "./data-collection/projection_tracking_csv.py" || goto error
python "./data-collection/projection_vs_sportsbooks.py" || goto error
python "over_under_tracking.py" || goto error
python "./data-collection/database/bulk_upload.py" || goto error

echo All scripts finished successfully.
pause
exit /b 0

:error
echo Script failed. Check output above.
pause
exit /b 1
