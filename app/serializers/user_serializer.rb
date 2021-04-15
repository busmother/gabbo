class UserSerializer
  include JSONAPI::Serializer
  attributes :name, :chats 

end