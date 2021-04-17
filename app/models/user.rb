class User < ApplicationRecord
  has_many :chats, :foreign_key => :sender_id
  has_many :chats, :foreign_key => :recipient_id
 
  has_many :received_messages, class_name: "Message", through: :chats
  has_many :sent_messages, class_name: "Message", through: :chats

  validates :name, length: {minimum: 1}
  validates_uniqueness_of :name
end
