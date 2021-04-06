class Api::V1::UsersController < ApplicationController

    def index
        users = User.all
        # render json: users
        render json: UserSerializer.new(users)
        
    end
end
