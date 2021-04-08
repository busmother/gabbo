class UserSerializer
  include JSONAPI::Serializer
  attributes :name, :chats #:messages
  # has_many :messages, through: :chats

  # def messages
  #   Message.find(object.messages)
  # end

end

#might need to make a serializer for recipient and another for sender specifically
#google self referential relationships w/models // polymorphic relationships

