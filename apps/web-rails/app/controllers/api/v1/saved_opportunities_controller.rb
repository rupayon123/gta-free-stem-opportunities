module Api
  module V1
    class SavedOpportunitiesController < BaseController
      before_action :require_user!

      def index
        saved = current_user.saved_opportunities.joins(:opportunity)
          .where(opportunities: { status: %w[active expired] }).includes(:opportunity)
        render json: { data: saved.map { |save| saved_opportunity_json(save) } }
      end

      def create
        opportunity = Opportunity.publicly_visible.find(params.require(:opportunity_id))
        saved = current_user.saved_opportunities.find_or_create_by!(opportunity: opportunity)
        render json: { data: { opportunityId: saved.opportunity_id, saved: true } }, status: :created
      end

      def destroy
        current_user.saved_opportunities.where(opportunity_id: params[:opportunity_id]).destroy_all
        render json: { data: { opportunityId: params[:opportunity_id], saved: false } }
      end

      private

      def saved_opportunity_json(save)
        opportunity = save.opportunity
        now = Time.current
        requires_verification = opportunity.verification_stale?(now) ||
          [ opportunity.start_date, opportunity.end_date, opportunity.deadline ].compact.empty?
        publication_state = if opportunity.status == "expired" || opportunity.date_expired?(now)
          "expired"
        elsif requires_verification
          "verification_required"
        else
          "current"
        end

        opportunity.as_api_json.merge(
          savedAt: save.created_at.iso8601,
          currentPublicationState: publication_state,
          archived: publication_state != "current",
          requiresVerification: requires_verification
        )
      end
    end
  end
end
