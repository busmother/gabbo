# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(name: "user1")
User.create(name: "user2")
User.create(name: "user3")

Chat.create(sender_id: 1, recipient_id: 2)
Chat.create(sender_id: 1, recipient_id: 3)
Chat.create(sender_id: 3, recipient_id: 2)

Message.create(chat_id: 1, user_id: 1, body: "hi, user2, this is user1 speaking")
Message.create(chat_id: 1, user_id: 2, body: "hi, user1, this is user2 responding")
Message.create(chat_id: 2, user_id: 3, body: "hi, anyone there? this is user3")
Message.create(chat_id: 2, user_id: 1, body: "hi user3! this is user1")
Message.create(chat_id: 2, user_id: 3, body: "hi user1, good to meet you!")