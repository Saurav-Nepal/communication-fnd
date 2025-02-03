import { BusinessReportController } from '../backend/ap/business/controllers/business.report.controller';
import { ListingPreferenceController } from '../backend/ap/business/controllers/listing.preference.controller';
import { LoggedUtilityController } from '../backend/ap/utility/controllers/logged.utility.controller';
import JournalEntryController from '../backend/common/controllers/journal.entry.controller';
import { LookupController } from '../backend/common/controllers/lookup.controller';
import { SourceMapController } from '../backend/common/controllers/source.map.controller';
import TallyGroupController from '../backend/common/controllers/tally.group.controller';
import { CommunicationTemplateController } from '../backend/communication/controller/commuinication.templates.controller';
import { ScheduleBroadcastController } from '../backend/communication/controller/schedule.broadcast.controller';
import { SlabsController } from '../backend/meta/controllers/slabs.controller';

export const LISTING_CONTROLLER_ROUTER = {
    communication_template: CommunicationTemplateController,
    schedule_broadcast: ScheduleBroadcastController,
    lookup: LookupController,
    lookup_utility: LoggedUtilityController,
    source_map: SourceMapController,
    tally_groups: TallyGroupController,
    journal_tally: JournalEntryController,
    fetch_report: BusinessReportController,
    listing_preference: ListingPreferenceController,
} as const;

export const SPOTLIGHT_QUERY_CONTROLLER_ROUTE = {
    gstin: SlabsController,
};
