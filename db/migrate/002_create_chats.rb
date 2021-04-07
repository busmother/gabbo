class CreateChats < ActiveRecord::Migration[6.1]
  def change
    create_table :chats do |t|
      t.bigint :sender_id
      t.bigint :recipient_id

      t.timestamps
    end

    add_index :chats, :sender_id
    add_index :chats, :recipient_id
  end
end
