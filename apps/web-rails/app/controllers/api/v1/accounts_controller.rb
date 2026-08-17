module Api
  module V1
    class AccountsController < BaseController
      before_action :require_user!

      def destroy
        current_user.soft_delete!
        render json: { data: { deleted: true } }
      end
    end
  end
end
