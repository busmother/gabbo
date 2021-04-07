class ChatSerializer
  include JSONAPI::Serializer
  attributes :messages, :sender_id, :recipient_id, :recipient, :sender
  has_many :messages, belongs_to: :sender
  has_many :messages, belongs_to: :recipient

  def recipient
    User.find(object.recipient_id)
  end

  def sender
    User.find(object.sender_id)
  end

  # has_one :recipient, :options[:user_serializer], through: :recipient_id
  # has_one :sender, :options[:user_serializer], through: :sender_id
end

#you could create something like the below 
#that could lead to more custom events:
#def recently_created?
# Date.today.prev_month < object.created_at
#here 'object' is chat