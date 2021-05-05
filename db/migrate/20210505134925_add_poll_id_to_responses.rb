class AddPollIdToResponses < ActiveRecord::Migration[6.1]
  def change
    add_column :responses, :poll_id, :integer
  end
end
