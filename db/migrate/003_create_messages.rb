class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.references :chat
      t.references :user
      t.text :body
      t.timestamps
    end
  end
end
