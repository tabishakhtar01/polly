class CreateVotes < ActiveRecord::Migration[6.1]
  def change
    create_table :votes do |t|
      t.integer :user_id, null: false
      t.integer :poll_id, null: false
      t.integer :response_id, null: false

      t.timestamps
    end
  end
end
