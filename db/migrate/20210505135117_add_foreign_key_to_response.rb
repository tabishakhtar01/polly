class AddForeignKeyToResponse < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :responses, :polls, column: :poll_id, on_delete: :cascade
  end
end
