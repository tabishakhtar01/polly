class Vote < ApplicationRecord
    belongs_to :user
    belongs_to :poll
    belongs_to :response
end
