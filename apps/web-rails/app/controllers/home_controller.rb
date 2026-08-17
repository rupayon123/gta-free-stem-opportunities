class HomeController < ApplicationController
  def index
    @active_count = Opportunity.publicly_visible.count
    @last_checked = SourceCheck.order(checked_at: :desc).pick(:checked_at) || Opportunity.maximum(:last_checked)
    @announcement = Announcement.active.first
  end
end
