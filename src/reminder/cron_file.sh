#!/bin/sh

07,33 07,08,09,11,15,12,10,16,13,14,17,18,21 * * * sudo  python /srv/Dashboard_eng/reminder/crontab.py >> /data/log_crontab/crontab.log
08,34 07,08,09,15,10,11,12,17,13,14,16,18,21 * * * sudo python /srv/Dashboard_eng/reminder/send_tele.py /srv/Dashboard_eng/reminder/key.txt >> /data/log_crontab/crontab.log
09,35 07,08,09,15,11,10,17,12,13,14,16,18,21 * * * sudo python /srv/Dashboard_eng/reminder/send_tele.py /srv/Dashboard_eng/reminder/value.txt >> /data/log_crontab/crontab.log
