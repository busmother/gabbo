class Message < ApplicationRecord
    belongs_to :chat
    belongs_to :sender, class_name: "User", foreign_key: "user_id"

    validates_presence_of :body, :chat_id, :user_id

end
