class AddForeignKeyToVotes < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :votes, :users, column: :user_id, on_delete: :cascade
    add_foreign_key :votes, :polls, column: :poll_id, on_delete: :cascade
    add_foreign_key :votes, :responses, column: :response_id, on_delete: :cascade
  end
end
