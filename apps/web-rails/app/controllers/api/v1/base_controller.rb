module Api
  module V1
    class BaseController < ActionController::API
      before_action :set_security_headers

      private

      def current_user
        @current_user ||= User.find_by_api_token(bearer_token)
      end

      def require_user!
        return if current_user

        render json: { error: "Account required." }, status: :unauthorized
      end

      def bearer_token
        request.authorization.to_s.delete_prefix("Bearer ").strip
      end

      def set_security_headers
        response.set_header("X-Content-Type-Options", "nosniff")
        response.set_header("Referrer-Policy", "strict-origin-when-cross-origin")
      end
    end
  end
end
