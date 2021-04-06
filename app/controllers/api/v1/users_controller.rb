class Api::V1::UsersController < ApplicationController

    def index
        users = User.all
        render json: UserSerializer.new(users)
        # render json: users
        
    end
end
