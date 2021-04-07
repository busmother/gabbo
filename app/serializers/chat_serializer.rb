class ChatSerializer
  include JSONAPI::Serializer
  attributes :messages, :sender_id, :recipient_id
  has_many :messages, belongs_to: :sender
  has_many :messages, belongs_to: :recipient

  # has_one :recipient
  # has_one :sender
end
