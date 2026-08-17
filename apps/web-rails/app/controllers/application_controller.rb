class ApplicationController < ActionController::Base
  before_action :set_security_headers
  helper_method :current_user

  private

  def current_user
    @current_user ||= User.active.find_by(id: session[:user_id]) if session[:user_id].present?
  end

  def require_admin!
    return if current_user&.admin?

    render plain: "Admin access required", status: :forbidden
  end

  def set_security_headers
    response.set_header("X-Frame-Options", "DENY")
    response.set_header("X-Content-Type-Options", "nosniff")
    response.set_header("Referrer-Policy", "strict-origin-when-cross-origin")
    response.set_header("Permissions-Policy", "camera=(), microphone=(), payment=()")
  end
end
