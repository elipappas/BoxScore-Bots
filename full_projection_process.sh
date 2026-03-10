#!/bin/bash

run_script () {
    python "$1"
    if [ $? -ne 0 ]; then
        echo "Script failed: $1"
        exit 1
    fi
}

run_script "./data-collection/data_processing.py"
run_script "./data-collection/injuries.py"
# run_script "./ml_models/train_rnn_model.py"
# run_script "./ml_models/train_xgb_model.py"
run_script "./ml_models/generate_xgb_projections.py"
run_script "./ml_models/generate_daily_projections.py"
run_script "track_model_success.py"
# may need to put over under tracking here

rm -f "./data-collection/sportsbook_data/events.csv"
rm -f "./data-collection/sportsbook_data/playerprops.csv"

run_script "./data-collection/over_under.py"
run_script "./data-collection/projection_tracking_csv.py"
run_script "./data-collection/projection_vs_sportsbooks.py"
run_script "over_under_tracking.py" # make sure this order works
run_script "./data-collection/database/bulk_upload.py"

echo "All scripts finished successfully."
read -p "Press enter to continue..."
exit 0