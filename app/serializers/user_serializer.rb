class UserSerializer
  include JSONAPI::Serializer
  attributes :name, :chats #:messages
  # has_many :messages, through: :chats

  def current_user?
    
  end

end