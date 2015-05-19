﻿with calendars as (select serviceid_agencyid as agencyid, min(startdate::int) as calstart, max(enddate::int) as calend from gtfs_calendars group by serviceid_agencyid), 
calendardates as (select serviceid_agencyid as agencyid, min(date::int) as calstart, max(date::int) as calend from gtfs_calendar_dates group by serviceid_agencyid),
calendar as (select cals.agencyid, least(cals.calstart, calds.calstart) as calstart, greatest(cals.calend, calds.calend) as calend from calendars cals full join calendardates calds using(agencyid))
update gtfs_feed_info set startdate= calendar.calstart::varchar , enddate=calendar.calend::varchar from calendar where defaultid = agencyid;