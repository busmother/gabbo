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
  
end