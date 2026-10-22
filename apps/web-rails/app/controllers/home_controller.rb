class HomeController < ApplicationController
  def index
    @active_count = Opportunity.publicly_visible.count
    @last_checked = SourceCheck.last_successful_refresh_at || Opportunity.publicly_visible.maximum(:last_checked)
    @announcement = Announcement.active.first
  end
end
