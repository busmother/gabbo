class Api::V1::MessagesController < ApplicationController
    def index
        messages = Message.all
        render json: MessageSerializer.new(@messages)
    end

    def create
        message = Message.new(message_params)
        if message.save
            render json: message, status: :accepted
        else
            render json: {errors: message.errors.full_messages}, status: :unprocessible_entity
        end
    end
end
