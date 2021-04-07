class ApplicationController < ActionController::API
    before_action :authenticate_user!

    protect_from_forgery with: :exception
end
