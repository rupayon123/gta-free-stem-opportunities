module Api
  module V1
    class SavedOpportunitiesController < BaseController
      before_action :require_user!

      def index
        render json: { data: current_user.saved_opportunities.includes(:opportunity).map { |save| save.opportunity.as_api_json.merge(savedAt: save.created_at.iso8601) } }
      end

      def create
        opportunity = Opportunity.not_hidden.find(params.require(:opportunity_id))
        saved = current_user.saved_opportunities.find_or_create_by!(opportunity: opportunity)
        render json: { data: { opportunityId: saved.opportunity_id, saved: true } }, status: :created
      end

      def destroy
        current_user.saved_opportunities.where(opportunity_id: params[:opportunity_id]).destroy_all
        render json: { data: { opportunityId: params[:opportunity_id], saved: false } }
      end
    end
  end
end
