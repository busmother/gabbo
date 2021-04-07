class User < ApplicationRecord
  has_many :chats, :foreign_key => :sender_id
  has_many :chats, :foreign_key => :recipient_id
  # has_many :received_messages, class_name: "Message", through: :chat foreign_key: "recipient_id"
  # has_many :sent_messages, class_name: "Message", through: :chat foreign_key: "sender_id"
  has_many :received_messages, class_name: "Message", through: :chats
  has_many :sent_messages, class_name: "Message", through: :chats
end
